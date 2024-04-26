import React, { useEffect, useState } from 'react'
import './FindReservation.scss'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../../redux/reducers'
import DialogModal from '../../../common/components/modal/DialogModal'
import { type DialogModalProps } from '../../../common/components/modal/DialogModalProps'
import MyReservation from '@src/components/Reservation/my-reservation/MyReservation'
import {
  setReservationSearch,
  setFlightSearchStatus,
  setFlightAddStatus
} from '@src/redux/actions'
import {
  FindReservationSkeleton,
  FindReservationSkeletonMob,
  FindReservationSkeletonTab
} from '@src/assets/images'
import {
  createGaObjectForClick,
  createGaObjectForFormSubmissionAttempt,
  pushToDataLayer
} from '@src/common/utils/ga-objects'

const FindReservtion = () => {
  const dispatch = useDispatch()

  const device = useSelector(({ UI }: RootState) => UI.device)
  const modalStatus = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.modalStatus
  )
  const apiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.paymentHistoryApi
  )

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [blockImage, setBlockImage] = useState<any>(FindReservationSkeleton)

  const DialogProps: DialogModalProps = {
    width: '54%',
    children: ''
  }

  function openDialog (event: any) {
    pushToDataLayer(
      createGaObjectForClick('my_account', 'Find my reservation', 'My Profile')
    )
    pushToDataLayer(
      createGaObjectForFormSubmissionAttempt('Find My Reservation')
    )
    dispatch(setReservationSearch(null))
    dispatch(setFlightSearchStatus(''))
    dispatch(setFlightAddStatus(''))
    setIsOpen(!isOpen)
    event.target.blur()
  }

  useEffect(() => {
    if (!modalStatus) {
      setIsOpen(false)
    }
  }, [modalStatus])

  useEffect(() => {
    if (device === 'tablet') {
      setBlockImage(FindReservationSkeletonTab)
    } else if (device === 'mobile') {
      setBlockImage(FindReservationSkeletonMob)
    } else {
      setBlockImage(FindReservationSkeleton)
    }
  }, [device])

  return (
    <>
      {apiStatus == true ? (
        <div
          className={`reservationWrapper ${
            device === 'desktop'
              ? 'flex-row align-items-center'
              : 'flex-column align-items-start'
          }`}
          data-cypress="find-reservation-section"
        >
          <div className="reservationText" role="complementary">
            <p className="reservationTextHeading" role="heading" aria-level="1">
              Find my reservation
            </p>
            <p className="reservationTextSubheading" role="definition">
              If your future reservation is not displayed above, find it here.
            </p>
          </div>
          <div
            className={`reservationButton ${
              device === 'mobile' || device === 'tablet'
                ? 'reservationButtonPortrait'
                : 'reservationButtonLandscape'
            }`}
          >
            <button
              tabIndex={0}
              className="yellowButton searchButton"
              data-cypress="search-btn"
              style={{ width: `${device === 'tablet' ? '80%' : ''}` }}
              onClick={openDialog}
            >
              Search
            </button>{' '}
            {isOpen && (
              <DialogModal width={DialogProps.width}>
                <MyReservation />
              </DialogModal>
            )}
          </div>
        </div>
      ) : (
        <div className="reservationWrapper p-0">
          <div className="skeletonBlock">
            <img className="skeletonBlockImage" src={blockImage} />
          </div>
        </div>
      )}
    </>
  )
}

export default FindReservtion
