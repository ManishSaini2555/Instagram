import React, { useEffect, useState } from 'react'
import './WalletSummary.scss'
import {
  WalletSummarySkeleton,
  WalletSummarySkeletonMob,
  WalletSummarySkeletonTab,
  WarningYellow
} from '@images'
import DialogModal from '@src/common/components/modal/DialogModal'
import { type DialogModalProps } from '@src/common/components/modal/DialogModalProps'

import WalletFlow from '@src/pages/wallet-flow/WalletFlow'
import { useSelector } from 'react-redux'
import { type RootState } from '@src/redux/reducers'
import {
  createGaObjectForClick,
  pushToDataLayer
} from '@src/common/utils/ga-objects'
import { atfString, paymentTypes } from '@src/common/enums/string'

interface WalletSummaryPropType {
  availableAmount: number | string
  expiringAmount: number | string
  expiringDate: string
}

const WalletSummary = ({
  expiringDate,
  availableAmount,
  expiringAmount
}: WalletSummaryPropType) => {
  const modalStatus = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.modalStatus
  )
  const apiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.paymentHistoryApi
  )
  const device = useSelector(({ UI }: RootState) => UI.device)
  const DialogProps: DialogModalProps = {
    width: '54%',
    children: ''
  }

  const [isWalletModalShown, setIsWalletModalShown] = useState<boolean>(false)
  const [heading, setHeading] = useState<string>(
    atfString.WALLET_SUMMARY_HEADING
  )
  const [blockImage, setBlockImage] = useState<any>(WalletSummarySkeleton)

  const handleShowModal = (event: any) => {
    pushToDataLayer(
      createGaObjectForClick('my_account', 'My ATF Wallet', 'My Profile')
    )
    setIsWalletModalShown(!isWalletModalShown)
    event.target.blur()
  }

  useEffect(() => {
    if (!modalStatus) {
      setIsWalletModalShown(false)
    }
  }, [modalStatus])

  useEffect(() => {
    if (availableAmount === '0.00') setHeading(paymentTypes.ATF)
    else setHeading(atfString.WALLET_SUMMARY_HEADING)
  }, [availableAmount])

  useEffect(() => {
    if (device === 'tablet') {
      setBlockImage(WalletSummarySkeletonTab)
    } else if (device === 'mobile') {
      setBlockImage(WalletSummarySkeletonMob)
    } else {
      setBlockImage(WalletSummarySkeleton)
    }
  }, [device])

  return (
    <>
      {apiStatus == true ? (
        <>
          <div className="walletWrapper" data-cypress="wallet-summary-section">
            <p className="walletHeading" role="heading" aria-level="1">
              {heading}
            </p>
            <div className="walletSummary">
              <div
                className="walletSummaryAmount"
                role="complementary"
                aria-label="available-amount"
              >
                <p className="walletSummaryAmountQuantity">{`$${availableAmount}`}</p>
                <p className="walletSummaryAmountText">Available</p>
              </div>
              {availableAmount !== '0.00' ||
              (expiringAmount !== undefined &&
                expiringAmount != atfString.INVALID &&
                expiringAmount !== 0) ? (
                <div
                  className="walletSummaryMessage"
                  role="complementary"
                  aria-label="expiring-amount"
                >
                  <img src={WarningYellow} alt="avelo-logo" />
                  <p>{`$${expiringAmount} expires on ${expiringDate}`}</p>
                </div>
                  ) : (
                    ''
                  )}

              <div className="walletSummaryButton">
                <button onClick={handleShowModal} data-cypress="add-fund">
                  My ATF Wallet
                </button>
              </div>
            </div>
          </div>
          {isWalletModalShown && (
            <DialogModal width={DialogProps.width}>
              <WalletFlow />
            </DialogModal>
          )}
        </>
      ) : (
        <div
          className="walletWrapper p-0 "
          data-cypress="wallet-summary-section"
        >
          <div className="skeletonBlock">
            <img className="skeletonBlockImage" src={blockImage} />
          </div>
        </div>
      )}
    </>
  )
}

export default WalletSummary
