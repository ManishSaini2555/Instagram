import React, { useEffect, useState } from 'react'
import './ProfileCard.scss'
import DialogModal from '../../../common/components/modal/DialogModal'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '@src/redux/reducers'
import ManageProfile from '@src/pages/manage-profile/ManageProfile'
import { setPrefResponse } from '@src/redux/actions'
import {
  ProfilecardSkeleton,
  ProfilecardSkeletonMob,
  ProfilecardSkeletonTab
} from '@src/assets/images'
import {
  createGaObjectForClick,
  createGaObjectForFormSubmissionAttempt,
  pushToDataLayer
} from '@src/common/utils/ga-objects'

interface ProfileCardPropType {
  username: string | undefined
  travellerId: string
  homeAirport: string
}

const ProfileCard = ({
  username,
  travellerId,
  homeAirport
}: ProfileCardPropType) => {
  const dispatch = useDispatch()
  const modalStatus = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.modalStatus
  )
  const device = useSelector(({ UI }: RootState) => UI.device)
  const status = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.profileDetailsApi
  )
  const apiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.paymentHistoryApi
  )

  const [isProfileModalShown, setisProfileModalShown] = useState<boolean>(false)
  const [blockImage, setBlockImage] = useState<any>(ProfilecardSkeleton)

  const handleModalChange = (event: any) => {
    pushToDataLayer(
      createGaObjectForClick('my_account', 'Manage Profile', 'My Profile')
    )
    pushToDataLayer(createGaObjectForFormSubmissionAttempt('Personal Info'))

    dispatch(setPrefResponse(''))
    setisProfileModalShown(!isProfileModalShown)
    event.target.blur()
  }

  useEffect(() => {
    if (device === 'tablet') {
      setBlockImage(ProfilecardSkeletonTab)
    } else if (device === 'mobile') {
      setBlockImage(ProfilecardSkeletonMob)
    } else {
      setBlockImage(ProfilecardSkeleton)
    }
  }, [device])
  useEffect(() => {
    if (!modalStatus) {
      setisProfileModalShown(false)
    }
  }, [modalStatus])
  return (
    <>
      {status == true && apiStatus == true ? (
        <div className="profileWrapper" data-cypress="profile-card-section">
          <p className="profileTitle" role="heading" aria-level={1}>
            Profile
          </p>
          <p className="profileUserName" role="note" aria-label="user-info">
            {username}
          </p>
          {travellerId && travellerId?.length > 0 && (
            <div
              className="profileCardData"
              role="note"
              aria-label="user-description-info"
            >
              <p className="profileCardDataLabel">Known traveler:</p>
              <div className="profileCardDataText">
                <p>{travellerId}</p>
              </div>
            </div>
          )}
          {homeAirport && homeAirport?.length > 0 && (
            <div
              className="profileCardData"
              role="note"
              aria-label="flight-info"
            >
              <p className="profileCardDataLabel">Home airport:</p>
              <div className="profileCardDataText">
                <p>{homeAirport}</p>
              </div>
            </div>
          )}
          <div className="profileButton">
            <button
              className="yellowButton profile-button"
              data-cypress="manage-profile-button"
              style={{ width: `${device === 'tablet' ? '80%' : ''}` }}
              tabIndex={0}
              onClick={handleModalChange}
            >
              Manage Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="profileWrapper p-0" data-cypress="profile-card-section">
          <div className="skeletonBlock">
            <img src={blockImage} className="skeletonBlockImage" />
          </div>
        </div>
      )}
      {isProfileModalShown && (
        <DialogModal>
          <ManageProfile />
        </DialogModal>
      )}
    </>
  )
}

export default ProfileCard
