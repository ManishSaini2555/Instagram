import React, { useEffect, useState } from 'react'
import './FlightCard.scss'
import { Clock, PlaneIcon, WarningBrown, WhiteRoundCross } from '@images'
import { useNavigate } from 'react-router-dom'
import {
  createGaObjectForClick,
  pushToDataLayer
} from '@src/common/utils/ga-objects'
import { flightStatuses } from '@src/common/enums/string'

interface FlightCardPropType {
  destination: string
  date: string
  confirmationNumber: string
  traveLastName: string
  disruptStatus: any
}
const FlightCard = ({
  destination,
  date,
  confirmationNumber,
  traveLastName,
  disruptStatus
}: FlightCardPropType) => {
  const navigate = useNavigate()

  const [color, setColor] = useState<string>('')
  const [background, setBackground] = useState<string>('')
  const [msg, setMsg] = useState<string>('')
  const [icon, setIcon] = useState<string>('')

  const handleKeyUp = (event: any) => {
    if (event.key == 'Enter') {
      handleManageFlight()
    }
  }

  const handleManageFlight = () => {
    pushToDataLayer(
      createGaObjectForClick('my_account', 'Upcoming Trips', 'My Profile')
    )
    navigate({
      pathname: '/manage-trip',
      search: `?lastName=${traveLastName}&confirmationNumber=${confirmationNumber}`
    })
  }

  useEffect(() => {
    if (disruptStatus?.Items?.length) {
      const statusData = disruptStatus.Items[0]?.Status
      if (statusData?.Code === 'OT' || statusData?.Code === 'OT') {
        setIcon(Clock)
        setColor('#FFFFFF')
        setBackground('#059669')
      } else if (
        statusData?.Code === flightStatuses.CANCEL ||
        statusData?.Code === flightStatuses.CANCEL
      ) {
        setIcon(WhiteRoundCross)
        setColor('#FFFFFF')
        setBackground('#B91C1C')
      } else {
        setIcon(WarningBrown)
        setColor('#92400E')
        setBackground('#FEF3C7')
      }
      setMsg(statusData?.Description)
    }
  }, [disruptStatus])

  return (
    <>
      <div
        tabIndex={0}
        role="listitem"
        className={'cardComponentWrapperCard'}
        onClick={handleManageFlight}
        onKeyUp={handleKeyUp}
      >
        {disruptStatus && msg && (
          <div style={{ background }} className="disruptBlock">
            <img src={icon} alt="icon" />
            <p style={{ color }}>{msg}</p>
          </div>
        )}
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="flightInfo">
            <p
              className="flightInfoDestination"
              style={{ textTransform: 'capitalize' }}
            >
              {destination}
            </p>
            <p className="flightInfoDate">{date}</p>
            <p className="flightInfoConfirmation">
              <span>Confirmation # </span>
              {confirmationNumber}
            </p>
          </div>
          {/* {status == "CXL" ? (
            <span className="canceledFlight">Canceled</span>
          ) : ( */}
          <img src={PlaneIcon} alt="avelo-logo" />
          {/* )} */}
        </div>
      </div>
    </>
  )
}

export default FlightCard
