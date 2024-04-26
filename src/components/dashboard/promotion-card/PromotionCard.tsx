import React, { useEffect, useState } from 'react'
import './PromotionCard.scss'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../redux/reducers'

import {
  CapitalOneSkeleton,
  CapitalOneSkeletonMob,
  CapitalOneSkeletonTab
} from '@src/assets/images'
import {
  createGaObjectForClick,
  pushToDataLayer
} from '@src/common/utils/ga-objects'

const PromotionCard = () => {
  // const device = useSelector(({ UI }: RootState) => UI.device);
  const promotionContent = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.promotionContent
  )
  const device = useSelector(({ UI }: RootState) => UI.device)
  const [blockImage, setBlockImage] = useState<any>(CapitalOneSkeleton)
  const apiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.capitalOneApi
  )

  useEffect(() => {
    if (promotionContent) {
      const elementsToModify = document.querySelectorAll('.rw1, .rw2, .rw3')

      elementsToModify.forEach((element) => {
        const roleValue = 'listitem'
        element.setAttribute('role', roleValue)
      })
      // const button = document.getElementsByClassName("butn")[0] as HTMLElement;
      // button.setAttribute("target", "_blank");
    }
  }, [promotionContent])

  useEffect(() => {
    if (device === 'tablet') {
      setBlockImage(CapitalOneSkeletonTab)
    } else if (device === 'mobile') {
      setBlockImage(CapitalOneSkeletonMob)
    } else {
      setBlockImage(CapitalOneSkeleton)
    }
  }, [device])

  useEffect(() => {
    const handleClick = () => {
      pushToDataLayer(
        createGaObjectForClick(
          'my_account',
          'Learn More',
          'Capital One Section'
        )
      )
    }

    const myLink = document.querySelector('.butn')
    myLink?.addEventListener('click', handleClick)
    return () => {
      myLink?.removeEventListener('click', handleClick)
    }
  })

  return (
    <>
      {/* {promotionContent} */}

      <div
        className="promotionWrapper boxShadow"
        data-cypress="promotion-card-section"
        role="list"
      >
        {apiStatus == true ? (
          <div dangerouslySetInnerHTML={{ __html: promotionContent }}></div>
        ) : (
          <div className="skeletonBlock">
            <img src={blockImage} className="skeletonBlockImage" />
          </div>
        )}
      </div>
    </>
  )
}

export default PromotionCard
