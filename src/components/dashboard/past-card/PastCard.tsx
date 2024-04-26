import React from 'react'
import './PastCard.scss'
import { useNavigate } from 'react-router-dom'
import { environmentUrl } from '@src/common/utils/environment'
import moment from 'moment'
import {
  createGaObjectForClick,
  pushToDataLayer
} from '@src/common/utils/ga-objects'
import { returnType } from '@src/common/enums/string'

interface FlightCardPropType {
  destination: string
  date: string
  confirmationNumber: string
  traveLastName: string
  departAirport: string
  returnAirport: string
  type: string
  traveler: string
  isCancelFlight?: boolean
}
const PastCard = ({
  destination,
  date,
  confirmationNumber,
  traveLastName,
  departAirport,
  returnAirport,
  type,
  traveler,
  isCancelFlight
}: FlightCardPropType) => {
  const navigate = useNavigate()
  const currentDate = moment()

  const handleManageFlight = () => {
    pushToDataLayer(
      createGaObjectForClick(
        'my_account',
        'Details',
        isCancelFlight ? 'Cancel Trips' : 'Past Trips'
      )
    )
    navigate({
      pathname: '/manage-trip',
      search: `?lastName=${traveLastName}&confirmationNumber=${confirmationNumber}`
    })
  }

  const redirectDeepLink = () => {
    pushToDataLayer(
      createGaObjectForClick(
        'my_account',
        'Rebook this flight',
        isCancelFlight ? 'Cancel Trips' : 'Past Trips'
      )
    )
    const url = `${environmentUrl()}/flight-search/deeplink/SEARCHFLIGHTS/${type}/${departAirport}/${returnAirport}/${currentDate
      .add(3, 'days')
      .format('YYYY-MM-DD')}/${
      type == returnType.ROUND
        ? currentDate.add(10, 'days').format('YYYY-MM-DD')
        : ''
    }/${traveler}?Calendar=true`
    window.location.href = url
  }

  const editText = (str: string) => {
    const words = str.split(' ')

    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })

    const res = capitalizedWords.join(' ')
    return res.replace(' To ', ' to ')
  }

  return (
    <>
      <div
        tabIndex={0}
        className={'pastCardComponentWrapperCard pointerToArrow '}
        role="listitem"
      >
        <div className="d-flex flex-row justify-content-between align-items-center p-0">
          <div className="flightInfo">
            <p
              className="flightInfoDestination"
              style={{ textTransform: 'capitalize' }}
            >
              {editText(destination)}
            </p>
            <p className="flightInfoDate">{date}</p>
            <p className="flightInfoConfirmation">
              <span>Confirmation # </span>
              {confirmationNumber}
            </p>
            <div className="buttonContainer p-0">
              <button
                className="outlineButton"
                tabIndex={0}
                onClick={handleManageFlight}
              >
                Details
              </button>
              <button
                className="rebookButton"
                tabIndex={0}
                onClick={redirectDeepLink}
              >
                Rebook this flight
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PastCard
