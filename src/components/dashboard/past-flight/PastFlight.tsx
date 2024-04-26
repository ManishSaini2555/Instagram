import React, { useEffect, useState } from 'react'
import './PastFlight.scss'
import { useSelector } from 'react-redux'
import { type RootState } from '@src/redux/reducers'
import { formatDateInIntervals } from '@src/common/utils'
import { NextArrow, PastTripSkeleton, PrevArrow } from '@src/assets/images'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PastCard from '../past-card/PastCard'
import { returnType } from '@src/common/enums/string'

interface PastFlightPropType {
  isCancelFlight: boolean
}
const PastFlight = ({ isCancelFlight }: PastFlightPropType) => {
  const flightListPast = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.flightListDataPast
  )
  const flightListCancel = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.flightListDataCancel
  )
  const apiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.flightListApi
  )
  const apiStatusPast = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.flightListPastApi
  )
  const apiStatusCancel = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.flightListCancelApi
  )

  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [flightList, setFlightList] = useState(flightListPast)
  const [flightDetails, setFlightDetails] = useState(flightList)
  const [flightDetailsArray, setFlightDetailsArray] = useState({})
  const [pgNo, setPgNo] = useState(1)
  const [totalPg, setTotalPg] = useState(2)
  const [isAccordianOpen, setisAccordianOpen] = useState(false)

  const groupArrayElements = (arr: any, size: number) => {
    const result: any = {}
    for (let i = 0; i < arr.length; i += size) {
      const group = arr.slice(i, i + size)
      result[i / size + 1] = group
    }
    return result
  }

  const handleAccordianClick = () => {
    setisAccordianOpen((prev) => !prev)
  }

  useEffect(() => {
    if (isCancelFlight) {
      setFlightList(flightListCancel)
    } else {
      setFlightList(flightListPast)
    }
  }, [flightListPast, flightListCancel])

  useEffect(() => {
    let tempState
    if (!apiStatus) {
      tempState = false
    } else {
      if ((isCancelFlight && !apiStatusCancel) || !apiStatusPast) {
        tempState = false
      } else {
        tempState = true
      }
    }
    setIsLoaded(tempState)
  }, [apiStatus, apiStatusPast, apiStatusCancel])

  useEffect(() => {
    if (pgNo) setFlightDetails(flightDetailsArray[pgNo])
  }, [pgNo])

  useEffect(() => {
    setTotalPg(Math.ceil(flightList.length / 3))
    const tempArray = groupArrayElements(flightList?.reverse(), 3)
    setFlightDetailsArray(tempArray)
    setFlightDetails(tempArray[1])
  }, [flightList])

  useEffect(() => {
    if (flightListPast?.length === 0 && !isCancelFlight) {
      setisAccordianOpen(true)
    } else {
      setisAccordianOpen(false)
    }
  }, [flightListPast, isCancelFlight])

  return (
    <>
      {isLoaded ? (
        <div
          className="listFlightWrapper boxShadow pastFlight"
          // role="list"
          role="complementary"
          aria-label="pastflights"
          data-cypress="past-flights-section"
        >
          <Accordion expanded={isAccordianOpen} onChange={handleAccordianClick}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="history-accordian"
            >
              <p className="pastFlightHeader" data-cypress="past-flight-header">
                {isCancelFlight ? 'Canceled trips' : 'Past trips'}
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flightListContainer" tabIndex={0} role="list">
                {flightDetails?.length > 0 ? (
                  flightDetails.map((item, key) => (
                    <PastCard
                      key={key}
                      destination={`${item.source} to ${item.destination}`}
                      date={formatDateInIntervals(
                        item.startDate,
                        item.endDate,
                        true
                      )}
                      departAirport={item.srcCode}
                      returnAirport={item.desCode}
                      type={
                        item.isReturnFlight
                          ? returnType.ROUND
                          : returnType.ONE_WAY
                      }
                      traveler={item.traveler}
                      confirmationNumber={item.confirmationNo}
                      traveLastName={item.lastName}
                      isCancelFlight={isCancelFlight}
                    />
                  ))
                ) : (
                  <div className="noTrip d-flex align-items-center justify-content-center">
                    <p className="noTripText mb-0 py-1">{`No ${
                      isCancelFlight ? 'canceled' : 'past'
                    } trips`}</p>
                  </div>
                )}
              </div>
              {flightDetails?.length > 0 ? (
                <div className="d-flex justify-content-between date-panel">
                  <div
                    className="arrowButton"
                    tabIndex={0}
                    onKeyUp={(event: any) => {
                      if (event.key == 'Enter') {
                        pgNo != 1 && setPgNo(pgNo - 1)
                      }
                    }}
                  >
                    <img
                      src={PrevArrow}
                      alt="left_arrow"
                      width={18}
                      height={18}
                      style={
                        pgNo == 1 ? { opacity: '0.25' } : { cursor: 'pointer' }
                      }
                      onClick={() => {
                        pgNo != 1 && setPgNo(pgNo - 1)
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    {pgNo} of {totalPg}
                  </div>
                  <div
                    className="arrowButton"
                    tabIndex={0}
                    onKeyUp={(event: any) => {
                      if (event.key == 'Enter') {
                        pgNo != totalPg && setPgNo(pgNo + 1)
                      }
                    }}
                  >
                    <img
                      src={NextArrow}
                      alt="right_arrow"
                      width={18}
                      height={18}
                      style={
                        pgNo == totalPg
                          ? { opacity: '0.25' }
                          : { cursor: 'pointer' }
                      }
                      onClick={() => {
                        pgNo != totalPg && setPgNo(pgNo + 1)
                      }}
                    />
                  </div>
                </div>
              ) : (
                ''
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <div
          className="listFlightWrapper boxShadow p-0"
          // role="list"
          role="complementary"
          aria-label="pastflights"
          data-cypress="past-flights-section"
        >
          <div className="skeletonBlock">
            <img className="skeletonBlockImage" src={PastTripSkeleton} />
          </div>
        </div>
      )}
    </>
  )
}

export default PastFlight
