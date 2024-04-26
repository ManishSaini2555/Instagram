import React, { useEffect, useState } from 'react'
import {
  AveloLogoNew,
  HamburgerNew,
  CaretDown,
  FasTimes,
  RightArrowBlueIcons
} from '@images'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Stack from '@mui/material/Stack'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '@src/redux/reducers'
import { useLocation, useNavigate } from 'react-router-dom'
import { userInfo } from '@src/common/utils/user'
import { environmentUrl } from '@src/common/utils/environment'
import { removeLocalStorageItem } from '@src/common/utils'
import BookTravel from '../mega-menu/book-travel/BookTravel'
import CheckInMenu from '../mega-menu/check-in/CheckIn'
import DealSignUp from '../mega-menu/deals-signup/DealSignUp'
import ManageTravel from '../mega-menu/manage-travel/ManageTravel'
import DialogModal from '@src/common/components/modal/DialogModal'
import SearchFlight from '../Manage/Search-Flight/SearchFlight'
import { setLoader, showSearchFlight } from '@src/redux/actions'
import { redirectURLs } from '@src/common/enums/string'

function Header () {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const device = useSelector(({ UI }: RootState) => UI.device)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [lastName, setLastName] = useState<string>('')
  const [confNo, setConfNo] = useState<string>('')
  const [routeCheck, setrouteCheck] = useState('')

  const [bookTravelMenu, setBookTravelMenu] = useState<boolean>(false)
  const [manageTravelMenu, setManageTravelMenu] = useState<boolean>(false)
  const [checkInMenu, setCheckInMenu] = useState<boolean>(false)
  const [dealSignupMenu, setDealSignup] = useState<boolean>(false)
  const [bookTravelMenuMob, setBookTravelMenuMob] = useState<boolean>(false)
  const [manageTravelMenuMob, setManageTravelMenuMob] = useState<boolean>(false)
  const [checkInMenuMob, setCheckInMenuMob] = useState<boolean>(false)
  const [dealSignupMenuMob, setDealSignupMob] = useState<boolean>(false)

  const [managePnr, setManagePnr] = useState('')
  const [manageLastName, setManageLastName] = useState('')
  const [checkinPnr, setCheckinPnr] = useState('')
  const [checkinLastName, setCheckinLastName] = useState('')
  const [dealEmail, setDealEmail] = useState('')
  const [dealZip, setDealZip] = useState('')

  let time: number
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const apiStatus = useSelector(
    ({ APISTATUS }: RootState) => APISTATUS.apiStatuses.wpBannerApi
  )
  const [isMobile, setIsMobile] = useState(false)
  const [showManageTrip, setShowManageTrip] = useState(false)
  const customerData = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.customerByEmail
  )
  const showSearch = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.ShowSearchFlight
  )

  const handleToggle = () => {
    clearTimeout(time)
    setOpen(true)
  }
  const [leftOffset, setLeftOffset] = useState<number>(0)
  useEffect(() => {
    setIsLogin(
      userInfo().isLoggedIn ||
        location.host === 'localhost:8080' ||
        location.host === '192.168.1.202:8080'
    )
    calcOffset()
  }, [])

  const calcOffset = () => {
    const header = document.getElementById('centerContainer') as HTMLElement
    const body = document.getElementsByTagName('body')[0] as HTMLElement
    if (header && body) {
      let tempLeftOffset = (body.offsetWidth - header.offsetWidth) / 2
      if (tempLeftOffset <= 8) tempLeftOffset = 0
      setLeftOffset(tempLeftOffset)
    }
  }
  useEffect(() => {
    calcOffset()
  }, [apiStatus])

  const handleClose = (event?: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event?.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown (event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }
  const prevOpen = React.useRef(open)

  const isShowCross = () => {
    if (
      bookTravelMenuMob ||
      manageTravelMenuMob ||
      checkInMenuMob ||
      dealSignupMenuMob
    ) {
      return false
    } else {
      return true
    }
  }

  const navigateHome = () => {
    removeLocalStorageItem('cartDetails')
    setBookTravelMenuMob(!bookTravelMenuMob)

    setManageTravelMenuMob(false)
    setCheckInMenuMob(false)
    setDealSignupMob(false)
    // window.location.href = environmentUrl();
    // navigate({
    //   pathname: "",
    // });
  }

  const navigateViewAccount = () => {
    navigate({
      pathname: '/summary'
    })
    handleClose()
    setIsMobile(false)
  }

  const navigateFlightStatus = () => {
    removeLocalStorageItem('cartDetails')
    window.location.href = `${environmentUrl()}/flight-status`
  }
  const navigateDealSignUp = () => {
    removeLocalStorageItem('cartDetails')
    setDealSignupMob(!dealSignupMenuMob)
    setBookTravelMenuMob(false)
    setManageTravelMenuMob(false)
    setCheckInMenuMob(false)
  }

  const navigateCheckIn = () => {
    setCheckInMenuMob(!checkInMenuMob)
    setBookTravelMenuMob(false)
    setManageTravelMenuMob(false)

    setDealSignupMob(false)
    removeLocalStorageItem('cartDetails')
    // window.location.href = `https://checkin-aveloair-test.airline-choice.com/process/index`;
  }

  const navigateCharters = () => {
    removeLocalStorageItem('cartDetails')
    window.location.href = redirectURLs.CHARTERS
  }

  const navigateManageTrips = () => {
    removeLocalStorageItem('cartDetails')
    setManageTravelMenuMob(!manageTravelMenuMob)
    setBookTravelMenuMob(false)

    setCheckInMenuMob(false)
    setDealSignupMob(false)
    // navigate({
    //   pathname: "/manage-trip",
    // });
    // setShowManageTrip(true);
    // setIsMobile(false);
    dispatch(setLoader(false))
  }

  const handleLogOut = () => {
    removeLocalStorageItem('cartDetails')
    window.location.href = `${environmentUrl()}/my-account/deeplink/signout`
    handleClose()
  }

  const navigateLogin = () => {
    removeLocalStorageItem('cartDetails')
    window.location.href = `${environmentUrl()}/my-account/deeplink/signin?ReturnUrl=${environmentUrl()}/my-account`
  }

  useEffect(() => {
    window.addEventListener('resize', calcOffset)
    return () => {
      window.removeEventListener('resize', calcOffset)
    }
  }, [])

  useEffect(() => {
    const ele = document.getElementById('megaMenuOffset') as HTMLElement
    if (ele) {
      ele.style.left = `${leftOffset + 16}px`
    }
  }, [
    leftOffset,
    bookTravelMenu,
    manageTravelMenu,
    checkInMenu,
    dealSignupMenu
  ])

  useEffect(() => {
    if (location.pathname?.includes('manage-trip')) setrouteCheck('manage')
    else if (location.pathname?.includes('summary')) setrouteCheck('account')
    else if (location.pathname?.includes('login')) setrouteCheck('account')
  }, [location.pathname])

  useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef?.current?.focus()
    }

    prevOpen.current = open
  }, [open])

  useEffect(() => {
    setIsMobile(false)
  }, [device])

  useEffect(() => {
    if (isMobile) document.body.classList.add('scroll')
    else document.body.classList.remove('scroll')
  }, [isMobile])

  useEffect(() => {
    if (showSearch.show) {
      setConfNo(showSearch.confNo)
      setLastName(showSearch.lastName)
      setShowManageTrip(true)
    }
  }, [showSearch])

  useEffect(() => {
    if (!showManageTrip) {
      const temp = {
        show: false,
        confNo: '',
        lastName: ''
      }
      setConfNo('')
      setLastName('')
      dispatch(showSearchFlight(temp))
    }
  }, [showManageTrip])
  const closeMegaMenu = () => {
    setCheckInMenu(false)
    setBookTravelMenu(false)
    setDealSignup(false)
    setManageTravelMenu(false)
  }

  return (
    <>
      {showManageTrip && (
        <DialogModal>
          <SearchFlight
            lastNameProp={lastName}
            confNoProp={confNo}
            closeTab={setShowManageTrip}
          />
        </DialogModal>
      )}
      <div
        className="header boxShadow"
        aria-label="heading"
        role="complementary"
        id="web-header"
        onMouseLeave={() => {
          setTimeout(closeMegaMenu, 1500)
        }}
      >
        {isShowCross() && (
          <div
            className="mobileMenuIcon"
            data-cypress="mobile-menu"
            id="cancel-btn"
            onClick={() => {
              setIsMobile(!isMobile)
            }}
          >
            {isMobile ? (
              <img className="crossPos" src={FasTimes} alt="cross-icon" />
            ) : (
              <img src={HamburgerNew} alt="hamburger" height={18} width={24} />
            )}
          </div>
        )}

        <div
          className="centerContainer"
          id="centerContainer"
          // style={{
          //   width: device === "tablet" ? "95%" : "",
          // }}
        >
          <div className="logo">
            <a href={environmentUrl()} className="aveloLink">
              <img
                src={AveloLogoNew}
                alt="avelo-logo"
                data-cypress="avelo-logo"
                className="aveloLogo"
                // onClick={() => (window.location.href = environmentUrl())}
              />
            </a>
          </div>
          <div className="navigation">
            <div className="random">
              <a
                className="cursorPoint headerMenuItem"
                data-cypress="home-button"
                onClick={navigateHome}
                href={environmentUrl()}
                onMouseOver={() => {
                  setBookTravelMenu(true)
                  setCheckInMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                }}
                onFocus={() => {
                  setBookTravelMenu(true)
                  setCheckInMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                }}
              >
                Book Travel
              </a>
              {bookTravelMenu && (
                <BookTravel handleShowState={setBookTravelMenu} />
              )}
            </div>

            <div>
              {' '}
              {/* manage trips */}
              <a
                className={`headerMenuItem cursorPoint ${
                  routeCheck === 'manage' ? 'selectedNavigation' : ''
                }`}
                data-cypress="home-button"
                href={redirectURLs.HOME}
                onClick={navigateManageTrips}
                onMouseEnter={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(true)
                }}
                onFocus={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(true)
                }}
              >
                Manage Trips
              </a>
              {manageTravelMenu && (
                <ManageTravel
                  confNo={managePnr}
                  lastName={manageLastName}
                  handleShowState={setManageTravelMenu}
                  setConfNo={setManagePnr}
                  setLastName={setManageLastName}
                />
              )}
            </div>

            <div>
              {' '}
              {/* checkin menu */}
              <a
                href={redirectURLs.HOME}
                className=" headerMenuItem cursorPoint"
                data-cypress="flight-status"
                onClick={navigateCheckIn}
                onMouseEnter={() => {
                  setCheckInMenu(true)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                }}
                onFocus={() => {
                  setCheckInMenu(true)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                }}
              >
                Check-in
              </a>
              {checkInMenu && (
                <CheckInMenu
                  confNo={checkinPnr}
                  lastName={checkinLastName}
                  handleShowState={setCheckInMenu}
                  setConfNo={setCheckinPnr}
                  setLastName={setCheckinLastName}
                />
              )}
            </div>

            <div>
              {' '}
              {/* flight status */}
              <a
                className=" headerMenuItem cursorPoint"
                data-cypress="home-button"
                href={redirectURLs.FLIGHT_STATUS}
                onClick={navigateFlightStatus}
                onMouseEnter={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                }}
                onFocus={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                }}
              >
                Flight Status
              </a>
              {/* no popup for flight status */}
            </div>

            <div>
              {' '}
              {/* charters menu */}
              <a
                className="headerMenuItem cursorPoint"
                data-cypress="home-button"
                href={redirectURLs.CHARTERS}
                onClick={navigateCharters}
                onMouseEnter={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                }}
                onFocus={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                }}
              >
                Charters
              </a>
              {/* no popup for charters menu */}
            </div>

            <div>
              {' '}
              {/* deal signup menu */}
              <a
                className=" headerMenuItem cursorPoint"
                data-cypress="home-button"
                href={redirectURLs.FLIGHT_STATUS}
                onMouseEnter={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(true)
                  setManageTravelMenu(false)
                }}
                onFocus={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(true)
                  setManageTravelMenu(false)
                }}
              >
                Deals Sign Up
              </a>
              {dealSignupMenu && (
                <DealSignUp
                  zip={dealZip}
                  mail={dealEmail}
                  handleShowState={setDealSignup}
                  setMail={setDealEmail}
                  setZip={setDealZip}
                />
              )}
            </div>

            {!isLogin && (
              <a
                className="headerMenuItem cursorPoint"
                onClick={navigateLogin}
                data-cypress="log-in"
              >
                Log In
              </a>
            )}

            {isLogin && (
              <Stack
                tabIndex={0}
                className="navigation viewAccountButton"
                direction="row"
                spacing={2}
                onMouseEnter={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                  setOpen(true)
                }}
                onMouseLeave={() => {
                  time = setTimeout(() => {
                    if (open) setOpen(false)
                  }, 500)
                }}
                onFocus={() => {
                  setCheckInMenu(false)
                  setBookTravelMenu(false)
                  setDealSignup(false)
                  setManageTravelMenu(false)
                  // setOpen(true)
                }}
              >
                <div tabIndex={1} className="buttonPos">
                  <Button
                    tabIndex={1}
                    disableRipple
                    className={`cursorPoint accountButton ${
                      routeCheck === 'account' ? 'selectedNavigation' : ''
                    }`}
                    sx={{
                      backgroundColor: 'transparent',
                      '&:focus-visible': {
                        outline: 'none',
                        boxShadow: 'none'
                      }
                    }}
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onMouseOver={handleToggle}
                    data-cypress="my-account"
                  >
                    My Account
                    {/* <img className="arrow" src={Arrow} alt="arrow_icon" /> */}
                  </Button>
                  <Popper
                    role="complementary"
                    aria-label="hanmberger-nav"
                    placement="bottom-start"
                    open={open}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                    onMouseOver={handleToggle}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start'
                              ? 'left top'
                              : 'left bottom'
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              className="menuPadding"
                              // autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem
                                tabIndex={0}
                                className="borderDrop "
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  color: '#4c12a1',
                                  fontSize: '0.8125rem',
                                  padding: '1.5rem 1rem',
                                  backgroundColor: 'transparent',
                                  '&:focus-visible': {
                                    outline: '1px solid #2cc4ff'
                                  }
                                }}
                                onClick={navigateViewAccount}
                              >
                                <img
                                  src={RightArrowBlueIcons}
                                  alt="icon"
                                  className="headerIcon"
                                />

                                <p className="m-0 pl-2 headerInfoText">
                                  View Account
                                </p>
                              </MenuItem>
                              <MenuItem
                                tabIndex={0}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  color: '#4c12a1',
                                  fontSize: '0.8125rem',
                                  padding: '1.5rem 1rem',
                                  '&:focus-visible': {
                                    outline: '1px solid #2cc4ff'
                                  }
                                }}
                                onClick={handleLogOut}
                              >
                                <img
                                  src={RightArrowBlueIcons}
                                  alt="icon"
                                  className="headerIcon"
                                />

                                <p className="m-0 pl-2 headerInfoText">
                                  Log out
                                </p>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </Stack>
            )}
          </div>
          {isLogin ? (
            <div
              className={
                device === 'mobile' ? 'accountName acctMobile' : 'accountName'
              }
            >
              Hi,&nbsp;
              {customerData
                ? Object?.keys(customerData)?.length !== 0
                  ? customerData?.Items[0]?.FirstName
                  : window?.user?.name
                : window?.user?.name}
            </div>
          ) : (
            <div className="accountName" onClick={navigateLogin}>
              Log In
            </div>
          )}

          {isMobile && (
            <div className="mobileNavigation">
              <div className="upper customScroll">
                <ul className="upperListPadding">
                  <li className="d-flex flex-column  justify-content-between ">
                    <div
                      className="d-flex flex-row align-items-center justify-content-between px-3"
                      onClick={navigateHome}
                    >
                      <span data-cypress="home-button-refer">Book Travel</span>
                      <img
                        className="menuCloseIcon"
                        src={bookTravelMenuMob ? FasTimes : CaretDown}
                        alt="caret"
                      />
                    </div>
                    {bookTravelMenuMob && (
                      <BookTravel handleShowState={setBookTravelMenu} />
                    )}
                  </li>
                  <li className="d-flex flex-column justify-content-between gap--one-rem">
                    <div
                      className="d-flex flex-row align-items-center justify-content-between px-3 "
                      onClick={navigateManageTrips}
                    >
                      <span>Manage Trips</span>
                      <img
                        className="menuCloseIcon"
                        src={manageTravelMenuMob ? FasTimes : CaretDown}
                        alt="caret"
                      />
                    </div>
                    {manageTravelMenuMob && (
                      <ManageTravel
                        confNo={managePnr}
                        lastName={manageLastName}
                        setConfNo={setManagePnr}
                        setLastName={setManageLastName}
                        hideDrawer={setIsMobile}
                      />
                    )}
                  </li>

                  <li className="d-flex flex-column  justify-content-between gap--one-rem">
                    <div
                      className="d-flex flex-row align-items-center justify-content-between px-3"
                      onClick={navigateCheckIn}
                    >
                      <span>Check-In</span>
                      <img
                        className="menuCloseIcon"
                        src={checkInMenuMob ? FasTimes : CaretDown}
                        alt="caret"
                      />
                    </div>
                    {checkInMenuMob && (
                      <CheckInMenu
                        confNo={checkinPnr}
                        lastName={checkinLastName}
                        handleShowState={setCheckInMenu}
                        setConfNo={setCheckinPnr}
                        setLastName={setCheckinLastName}
                      />
                    )}
                  </li>
                  <li
                    onClick={navigateFlightStatus}
                    className="d-flex flex-row align-items-center justify-content-between"
                  >
                    <span data-cypress="flight-status-refer" className="px-3">
                      Flight Status
                    </span>
                  </li>
                  <li
                    onClick={navigateFlightStatus}
                    className="d-flex flex-row align-items-center justify-content-between"
                  >
                    <span data-cypress="flight-status-refer" className="px-3">
                      Charters
                    </span>
                  </li>
                  <li className="d-flex flex-column  justify-content-between gap--one-rem">
                    <div
                      className="d-flex flex-row align-items-center justify-content-between px-3"
                      onClick={navigateDealSignUp}
                    >
                      <span data-cypress="flight-status-refer">
                        Deals Sign Up
                      </span>
                      <img
                        className="menuCloseIcon"
                        src={dealSignupMenuMob ? FasTimes : CaretDown}
                        alt="caret"
                      />
                    </div>
                    {dealSignupMenuMob && (
                      <DealSignUp
                        zip={dealZip}
                        mail={dealEmail}
                        handleShowState={setDealSignup}
                        setMail={setDealEmail}
                        setZip={setDealZip}
                      />
                    )}
                  </li>

                  {isLogin && (
                    <li className="d-flex flex-row align-items-center justify-content-between">
                      <span
                        data-cypress="view-account-refer"
                        className="px-3"
                        onClick={navigateViewAccount}
                      >
                        My Account
                      </span>
                    </li>
                  )}
                  {isLogin && (
                    <li className="d-flex flex-row align-items-center justify-content-between">
                      <span
                        data-cypress="logout-button"
                        className="px-3"
                        onClick={handleLogOut}
                      >
                        Log Out
                      </span>
                    </li>
                  )}
                  {!isLogin && (
                    <li className="d-flex flex-row align-items-center justify-content-between">
                      <span
                        data-cypress="side-log-in"
                        className="px-3"
                        onClick={navigateLogin}
                      >
                        Log In
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* {bookTravelMenu && <BookTravel handleShowState={setBookTravelMenu} />} */}
        {/* {checkInMenu && (
          <CheckInMenu
            handleShowState={setCheckInMenu}
            confNo={checkinPnr}
            lastName={checkinLastName}
            setConfNo={setCheckinPnr}
            setLastName={setCheckinLastName}
          />
        )} */}
        {/* {dealSignupMenu && (
          <DealSignUp
            handleShowState={setDealSignup}
            zip={dealZip}
            mail={dealEmail}
            setMail={setDealEmail}
            setZip={setDealZip}
          />
        )} */}
        {/* {manageTravelMenu && (
          <ManageTravel
            handleShowState={setManageTravelMenu}
            confNo={managePnr}
            lastName={manageLastName}
            setConfNo={setManagePnr}
            setLastName={setManageLastName}
          />
        )} */}
      </div>
    </>
  )
}

export default Header
