import './PaymentCard.scss'
import SavedCardComponent from '@src/components/Payment-Method/saved-card/SavedCard'
import React, { useEffect, useState } from 'react'
import DialogModal from '../../../common/components/modal/DialogModal'
import { type DialogModalProps } from '../../../common/components/modal/DialogModalProps'
import PaymentFlow from '@src/pages/payment-flow/PaymentFlow'
import { useSelector } from 'react-redux'
import { type RootState } from '@src/redux/reducers'
import { transformPaymentData } from '@src/common/utils'
import SavedBank from '@src/components/Payment-Method/saved-bank/SavedBank'
import {
  PaymentCardSkeleton,
  PaymentCardSkeletonMob,
  PaymentCardSkeletonTab
} from '@src/assets/images'
import {
  createGaObjectForClick,
  pushToDataLayer
} from '@src/common/utils/ga-objects'

const PaymentCard = () => {
  const modalStatus = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.modalStatus
  )
  const paymentApiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.paymentMethodsApi
  )
  const banksData = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.paymentDetails?.PaymentBanks?.Items
  )
  const cardsData = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.cardsDetail?.PaymentCards?.Items
  )
  const device = useSelector(({ UI }: RootState) => UI.device)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [paymentMethods, setPaymentMethods] = useState<any>([])
  const [blockImage, setBlockImage] = useState<any>(PaymentCardSkeleton)

  const DialogProps: DialogModalProps = {
    width: '54%',
    children: ''
  }

  function openDialog (event: any) {
    pushToDataLayer(
      createGaObjectForClick('my_account', 'Manage Payment', 'My Profile')
    )
    setIsOpen(!isOpen)
    event.target.blur()
  }
  useEffect(() => {
    if (
      (banksData && banksData.length > 0) ||
      (cardsData && cardsData.length > 0)
    ) {
      const transformedData = transformPaymentData(cardsData, banksData)
      setPaymentMethods(transformedData)
    } else {
      setPaymentMethods([])
    }
  }, [banksData, cardsData])

  useEffect(() => {
    if (device === 'tablet') {
      setBlockImage(PaymentCardSkeletonTab)
    } else if (device === 'mobile') {
      setBlockImage(PaymentCardSkeletonMob)
    } else {
      setBlockImage(PaymentCardSkeleton)
    }
  }, [device])

  useEffect(() => {
    if (!modalStatus) {
      setIsOpen(false)
    }
  }, [modalStatus])

  return (
    <>
      {paymentApiStatus == true ? (
        <div
          className="paymentWrapper"
          role="article"
          data-cypress="payment-card-section"
        >
          <p className="paymentTitle">Payment methods</p>
          <div className="paymentDetails">
            {paymentMethods.map((item: any, index: number) => {
              if (item.type === 'card') {
                return (
                  <div className="paymentCardInfo" key={index}>
                    <SavedCardComponent
                      cardNumber={item.cardNumberLastFour}
                      expiryDate={item.expiryDate}
                      isPrimary={item.isPrimary}
                      isExpired={item.isExpired}
                      description={item.description}
                    />
                  </div>
                )
              } else if (item.type === 'bank') {
                return (
                  <div className="paymentCardInfo " key={index}>
                    <SavedBank
                      index={index}
                      accountNumber={item.accountNumberLastFour}
                      bankName={item.bankName}
                    />
                  </div>
                )
              }
            })}
            {!paymentMethods.length && (
              <div>
                {"You don't have any payment methods, click below to add one."}
              </div>
            )}
          </div>
          <div className="paymentButton">
            <button
              className="yellowButton manage-payment"
              data-cypress="manage-payment-button"
              style={{ width: `${device === 'tablet' ? '80%' : ''}` }}
              onClick={openDialog}
            >
              Manage Payment Methods
            </button>
            {isOpen && (
              <DialogModal width={DialogProps.width}>
                <PaymentFlow paymentMethods={paymentMethods} />
              </DialogModal>
            )}
          </div>
        </div>
      ) : (
        <div className="paymentWrapper p-0">
          <div className="skeletonBlock">
            <img src={blockImage} className="skeletonBlockImage" />
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentCard
