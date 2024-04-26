import React, { useEffect, useState } from 'react'
import FlightCardComponent from '@src/components/dashboard/flight-card/FlightCard'
import './FlightListings.scss'
import { useSelector } from 'react-redux'
import { type RootState } from '@src/redux/reducers'
import { formatDateInIntervals } from '@src/common/utils'
import {
  NextArrow,
  PrevArrow,
  UpcomingFlightsSkeleton,
  UpcomingFlightsSkeletonMob,
  UpcomingFlightsSkeletonTab
} from '@src/assets/images'

const FlightListing = () => {
  const flightList = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.flightListData
  )
  const apiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.flightListApi
  )
  const device = useSelector(({ UI }: RootState) => UI.device)
  const wpApiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.wpBannerApi
  )

  const [flightDetails, setFlightDetails] = useState(flightList)
  const [flightDetailsArray, setFlightDetailsArray] = useState([])
  const [pgNo, setPgNo] = useState(1)
  const [totalPg, setTotalPg] = useState(2)
  const [checkInUrl, setCheckInUrl] = useState('')
  const [blockImage, setBlockImage] = useState<any>(UpcomingFlightsSkeleton)

  const groupArrayElements = (arr: any, size: number) => {
    const result: any = []
    for (let i = 0; i < arr.length; i += size) {
      const group = arr.slice(i, i + size)
      result[i / size + 1] = group
    }
    return result
  }

  useEffect(() => {
    setTotalPg(Math.ceil(flightList.length / 3))
    const tempArray = groupArrayElements(flightList, 3)
    setFlightDetailsArray(tempArray)
    setFlightDetails(tempArray[1])
    setCheckInUrl(window?.checkInUrl?.checkInUrl)
    // console.log('url', window?.checkInUrl?.checkInUrl)
  }, [flightList])

  useEffect(() => {
    if (device === 'tablet') {
      setBlockImage(UpcomingFlightsSkeletonTab)
    } else if (device === 'mobile') {
      setBlockImage(UpcomingFlightsSkeletonMob)
    } else {
      setBlockImage(UpcomingFlightsSkeleton)
    }
  }, [device])

  useEffect(() => {
    if (pgNo) setFlightDetails(flightDetailsArray[pgNo])
  }, [pgNo, flightDetailsArray])

  return (
    <>
      {apiStatus == true && wpApiStatus == true ? (
        <div
          className="listFlightWrapper boxShadow"
          role="complementary"
          aria-label="upcomingflights"
          data-cypress="upcoming-flights-section"
        >
          <p id="checkInUrlTag" style={{ display: 'none' }}>
            {checkInUrl}
          </p>
          <p className="upcomingFlightSubheading">Upcoming trips</p>
          <div className="flightListContainer" tabIndex={0} role="list">
            {flightDetails?.length > 0 ? (
              flightDetails.map((item, key) => (
                <div key={key}>
                  <FlightCardComponent
                    destination={item.destination}
                    date={formatDateInIntervals(
                      item.startDate,
                      item.endDate,
                      false,
                      item.isReturnFlight
                    )}
                    confirmationNumber={item.confirmationNo}
                    traveLastName={item.lastName}
                    disruptStatus={item.disruptResponse}
                  />
                </div>
              ))
            ) : (
              <div className="noTrip d-flex align-items-center justify-content-center">
                <p className="noTripText mb-0 py-1">No upcoming trips</p>
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
        </div>
      ) : (
        <div
          className="listFlightWrapper boxShadow p-0"
          role="complementary"
          aria-label="upcomingflights"
          data-cypress="upcoming-flights-section"
        >
          <div className="skeletonBlock upcoming">
            <img className="skeletonBlockImage" src={blockImage} />
          </div>
        </div>
      )}
    </>
  )
}

export default FlightListing
