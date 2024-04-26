import React, { useEffect, useState } from 'react'
import './DashboardBanner.scss'
import { useSelector } from 'react-redux'
import { type RootState } from '@src/redux/reducers'
import {
  BannerSkeleton,
  BannerSkeletonMob,
  BannerSkeletonTab
} from '@src/assets/images'
import {
  createGaObjectForClick,
  pushToDataLayer
} from '@src/common/utils/ga-objects'

const DashboardBanner = () => {
  const bannerData = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.dashboardBanner
  )
  const wpApiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.wpBannerApi
  )
  const device = useSelector(({ UI }: RootState) => UI.device)

  const [blockImage, setBlockImage] = useState<any>(BannerSkeleton)

  const handleClick = () => {
    pushToDataLayer(
      createGaObjectForClick('my_account', 'Book a trip', 'My Profile')
    )
  }
  useEffect(() => {
    if (device === 'tablet') {
      setBlockImage(BannerSkeletonTab)
    } else if (device === 'mobile') {
      setBlockImage(BannerSkeletonMob)
    } else {
      setBlockImage(BannerSkeleton)
    }
  }, [device])

  useEffect(() => {
    const myLink = document.getElementsByClassName(
      'wpe-content-block_media_descr_cta'
    )[0]
    myLink?.addEventListener('click', handleClick)
    return () => {
      myLink?.removeEventListener('click', handleClick)
    }
  }, [])
  return (
    <>
      <div className="boxShadow dashBanner">
        {wpApiStatus == true && bannerData && bannerData.length > 0 ? (
          <div dangerouslySetInnerHTML={{ __html: bannerData }}></div>
        ) : (
          <div className="skeletonBlock">
            <img src={blockImage} className="skeletonBlockImage" />
          </div>
        )}
      </div>
    </>
  )
}

export default DashboardBanner
