import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '@src/redux/reducers'
import './WelcomeMessage.scss'
import { WelcomeSkeleton, WelcomeSkeletonTab } from '@src/assets/images'

interface WelcomeMessagePropType {
  name: string | undefined
}
const WelcomeMessage = ({ name }: WelcomeMessagePropType) => {
  const device = useSelector(({ UI }: RootState) => UI.device)
  const status = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.profileDetailsApi
  )

  const [blockImage, setBlockImage] = useState<any>(WelcomeSkeleton)

  useEffect(() => {
    if (device === 'tablet') {
      setBlockImage(WelcomeSkeletonTab)
    }
  }, [device])

  return (
    <>
      {status == true ? (
        <div
          className={`d-flex align-items-center justify-content-between ${
            device == 'desktop'
              ? 'col-8 componentWrapper welcome'
              : device == 'mobile'
              ? 'flex-column w-100'
              : ''
          }`}
          role="heading"
          aria-level="1"
          data-cypress="welcome-message-section"
        >
          {device === 'desktop' && <p>Welcome back, {name}</p>}
        </div>
      ) : (
        <div
          className={`d-flex align-items-center justify-content-between ${
            device == 'desktop'
              ? 'col-8 componentWrapper welcome'
              : device == 'mobile'
              ? 'flex-column w-100'
              : ''
          }`}
          role="heading"
          aria-level="1"
          data-cypress="welcome-message-section"
        >
          {device !== 'mobile' && (
            <div className="skeletonBlock">
              <img src={blockImage} className="skeletonBlockImage" />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default WelcomeMessage
