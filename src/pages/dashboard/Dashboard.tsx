import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WelcomeMessage from '@src/components/dashboard/welcome-message/WelcomeMessage'
import './Dashboard.scss'
import FlightListing from '@src/components/dashboard/flight-listings/FlightListings'
import WalletSummary from '@src/components/dashboard/wallet-summary/WalletSummary'
import FindReservtion from '@src/components/dashboard/find-reservation/FindReservation'
import ProfileCard from '@src/components/dashboard/profile-card/ProfileCard'
import PaymentCard from '@src/components/dashboard/payment-card/PaymentCard'
import PromotionCard from '@src/components/dashboard/promotion-card/PromotionCard'
import { type RootState } from '@redux/reducers'
import {
  getAllWPContent,
  getPaymentByEmail,
  getProfileByCustomerId,
  getPaymentHistory,
  setModalWidth,
  getSelligentContent,
  getAirportList,
  getPrefData,
  getSavedCardByEmail,
  getFlightList,
  setManageFlightData,
  getCustomerByEmail
} from '@src/redux/actions'
import { type profileCardType } from '@src/common/types'
import {
  formatMoney,
  getExpiringVoucherData,
  getWalletValue,
  removeLocalStorageItem,
  removeSessionStorageItem,
  setLocalStorageItem
} from '@src/common/utils'
import { userInfo } from '@src/common/utils/user'
import DashboardBanner from '@src/components/dashboard/dashboard-banner/DashboardBanner'
import { useNavigate } from 'react-router-dom'
import PastFlight from '@src/components/dashboard/past-flight/PastFlight'
import Footer from '@src/components/footer/Footer'
import { customer } from '@src/common/enums/string'

const Dashboard = () => {
  const navigate = useNavigate()
  const deviceType = useSelector(({ UI }: RootState) => UI)
  const profileData: profileCardType | null = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.profileDetails
  )
  const data = useSelector(({ APPSTATE }: RootState) => APPSTATE.paymentHistory)
  const homeAirportCode = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.selligentData?.homeAirport
  )

  // console.log("profileData", profileData)

  const [walletValue, setwalletValue] = useState<number>(0)
  const [expiringAmount, setExpiringAmount] = useState<number>(0)
  const [expiringDate, setExpiringDate] = useState<string>('')
  const [kntNumber, setKntNumber] = useState<string>('')

  useEffect(() => {
    if (profileData) {
      const number = profileData?.Items[0]?.IDDocuments?.Items.findIndex(
        (item) => item.TypeCode === 'KNT'
      )
      if (number != -1 && number != undefined) {
        setKntNumber(profileData?.Items[0]?.IDDocuments?.Items[number].IDNumber)
      } else setKntNumber('')
    }
  }, [profileData])

  const dispatch = useDispatch()
  const customerData = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.customerByEmail
  )

  const flightListApiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.flightListApi
  )

  const [userEmail, setUserEmail] = useState<string>('')
  // useEffect(() => {
  //   if (wpApiStatus && userEmail && userEmail.length > 0) {
  //     dispatch(getFlightList(userEmail));
  //   }
  // }, [wpApiStatus]);

  const showMobileView = () => (
    <div className="portraitWrapper" data-cypress="dashboard-component">
      <WelcomeMessage name={profileData?.Items[0].FirstName} />
      <DashboardBanner />
      <FlightListing />
      <PastFlight isCancelFlight={false} />
      <PastFlight isCancelFlight={true} />
      <WalletSummary
        expiringDate={expiringDate}
        availableAmount={formatMoney(walletValue)}
        expiringAmount={formatMoney(expiringAmount)}
      />
      <FindReservtion />
      <ProfileCard
        username={`${profileData?.Items[0].FirstName} ${profileData?.Items[0].Surname}`}
        travellerId={kntNumber}
        homeAirport={homeAirportCode}
      />
      <PaymentCard />
      <PromotionCard />
    </div>
  )
  // rofileData.Items[0].FirstName ||
  const showDesktopView = () => (
    <div
      className="landscapeWrapper py-3 landscapeWidth"
      role="main"
      data-cypress="dashboard-component"
    >
      {/* <BrainTreeForm /> */}
      <WelcomeMessage name={profileData?.Items[0].FirstName} />
      <div className="d-flex flex-row landscapeRow align-items-start">
        <div className="d-flex flex-column landscapeColumn col-8 pr-3">
          <DashboardBanner />
          <FlightListing />
          <PastFlight isCancelFlight={false} />
          <PastFlight isCancelFlight={true} />

          <FindReservtion />
          <PromotionCard />
        </div>
        <div className="d-flex flex-column landscapeColumn col-4">
          <WalletSummary
            expiringDate={expiringDate}
            availableAmount={formatMoney(walletValue)}
            expiringAmount={formatMoney(expiringAmount)}
          />
          <ProfileCard
            username={`${profileData?.Items[0].FirstName} ${profileData?.Items[0].Surname}`}
            travellerId={kntNumber}
            homeAirport={homeAirportCode}
          />
          <PaymentCard />
        </div>
      </div>
    </div>
  )

  const showTabletView = () => (
    <div
      className="d-flex flex-column tabletViewContainer p-3"
      data-cypress="dashboard-component"
    >
      <WelcomeMessage name={profileData?.Items[0].FirstName} />
      <DashboardBanner />
      <FlightListing />
      <PastFlight isCancelFlight={false} />
      <PastFlight isCancelFlight={true} />

      <div className="d-flex flex-row tabFlexWidth">
        <div className="resCont d-flex">
          <FindReservtion />
        </div>
        <div className="walletCont">
          <WalletSummary
            expiringDate={expiringDate}
            availableAmount={formatMoney(walletValue)}
            expiringAmount={formatMoney(expiringAmount)}
          />
        </div>
      </div>
      <div className="d-flex flex-row tabFlexWidth">
        <ProfileCard
          username={`${profileData?.Items[0].FirstName} ${profileData?.Items[0].Surname}`}
          travellerId={`${
            profileData?.Items[0]?.IDDocuments?.Items[0].TypeCode === 'KNT'
              ? profileData?.Items[0]?.IDDocuments?.Items[0].IDNumber
              : ''
          }`}
          homeAirport={homeAirportCode}
        />
        <PaymentCard />
      </div>
      <PromotionCard />
    </div>
  )

  useEffect(() => {
    if (profileData) {
      const number = profileData?.Items[0]?.IDDocuments?.Items.findIndex(
        (item) => item.TypeCode === customer.KTN
      )
      if (number != -1 && number != undefined) {
        setKntNumber(profileData?.Items[0]?.IDDocuments?.Items[number].IDNumber)
      } else setKntNumber('')
    }
  }, [profileData])

  useEffect(() => {
    if (flightListApiStatus && userEmail && userEmail.length > 0) {
      dispatch(getSavedCardByEmail(userEmail))
      dispatch(getPaymentByEmail(userEmail))
      dispatch(getPaymentHistory(userEmail))
      dispatch(getPrefData())

      dispatch(
        getAirportList({
          apiName: 'avelo_airport'
        })
      )
      dispatch(
        getSelligentContent({
          apiName: 'avelo_audience',
          email: userEmail
        })
      )
    }
  }, [flightListApiStatus])

  useEffect(() => {
    if (customerData && Object.keys(customerData).length !== 0) {
      if (customerData?.Items[0].CustomerId) {
        dispatch(getProfileByCustomerId(customerData.Items[0].CustomerId))
      }
      if (customerData?.Items[0].Emails?.Items[0].EmailAddress) {
        const email = customerData.Items[0].Emails.Items[0].EmailAddress
        setUserEmail(email)
        dispatch(getAllWPContent())
        dispatch(getFlightList({ email, flightType: 'upcoming' }))
        dispatch(getFlightList({ email, flightType: 'past' }))
        dispatch(getFlightList({ email, flightType: 'canceled' }))
      }
    }
  }, [customerData])

  useEffect(() => {
    if (deviceType.device === 'desktop') {
      dispatch(setModalWidth('54%'))
    } else {
      dispatch(setModalWidth('95%'))
    }
  }, [deviceType.device])

  useEffect(() => {
    if (data) {
      const tempData = getExpiringVoucherData(data)
      setwalletValue(getWalletValue(data))
      setExpiringAmount(tempData.amount)
      setExpiringDate(tempData.expDate)
    }
  }, [data])

  useEffect(() => {
    const user = userInfo()
    if (
      !user.isLoggedIn &&
      location.host !== 'localhost:8080' &&
      location.host !== '192.168.1.202:8080'
    ) {
      navigate({
        pathname: '/login'
      })
    } else {
      removeLocalStorageItem('departFlightSegmentKey')
      removeLocalStorageItem('returnFlightSegmentKey')
      setLocalStorageItem('Route', location.pathname)
      removeSessionStorageItem('manageTripToken')
      dispatch(setManageFlightData({}))
      removeLocalStorageItem('cartDetails')

      if (user.isLoggedIn) dispatch(getCustomerByEmail(user.mail))
      else if (
        location.host == 'localhost:8080' ||
        location.host == '192.168.1.202:8080'
      ) {
        dispatch(getCustomerByEmail(`${process.env.CUSTOMER_MAIL}`))
      }
    }
  }, [])

  return (
    <>
      {deviceType.device === 'desktop' && showDesktopView()}
      {deviceType.device === 'mobile' && showMobileView()}
      {deviceType.device === 'tablet' && showTabletView()}
      <div style={{ height: '60px' }}></div>
      <Footer />
    </>
  )
}

export default Dashboard
