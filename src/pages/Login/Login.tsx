import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '@src/redux/reducers'
import { getLoginWPContent } from '@src/redux/actions'
import Loader from '@src/common/components/loader/Loader'
import './Login.scss'
import { userInfo } from '@src/common/utils/user'
import { environmentUrl } from '@src/common/utils/environment'
import { setLocalStorageItem } from '@src/common/utils'
import Footer from '@src/components/footer/Footer'

function LogIn () {
  const loginData = useSelector(
    ({ APPSTATE }: RootState) => APPSTATE.loginBanner
  )
  const loader = useSelector(({ APPSTATE }: RootState) => APPSTATE.loader)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = () => {
    window.location.href = `${environmentUrl()}/my-account/deeplink/signin?ReturnUrl=${environmentUrl()}/my-account`
  }

  useEffect(() => {
    setLocalStorageItem('Route', location.pathname)
    const user = userInfo()
    if (!user.isLoggedIn) dispatch(getLoginWPContent())
    else {
      navigate({
        pathname: '/summary'
      })
    }
  }, [])

  return (
    <>
      <div className="login">
        {loader && <Loader />}
        <div
          className="background-container"
          dangerouslySetInnerHTML={{ __html: loginData }}
        ></div>
        <div className="base">
          <div className="base-background"></div>
          <div className="login-base">
            <button className="yellowButton" onClick={login}>
              Sign Up for FREE
            </button>
            <p>
              Already have an account? <span onClick={login}>Log in</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LogIn
