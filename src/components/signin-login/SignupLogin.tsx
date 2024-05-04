import React, { useEffect, useState } from 'react'
import './SignupLogin.scss'
import { GoogleIcon, HideIcon, InstagramWord, Loading, ShowIcon } from '@images'
import { useNavigate } from 'react-router-dom'
import {
  FormLabel,
  ImageUrl,
  LoggedOutRoutesEnum,
  RedirectUrls,
  SignupLoginEnum,
  SignupLoginVariable
} from '@src/common/constants/constants'
import { signInWithEmail, signInWithGoogle, signUp } from '@src/functions/Auth'
import { toast } from 'react-toastify'
import OrContainer from '@src/common/components/or-container/OrContainer'

interface SignupLoginType {
  type: SignupLoginEnum.SIGNUP | SignupLoginEnum.LOGIN
}
const SignupLogin: React.FC<SignupLoginType> = ({ type }) => {
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(true)
  const [isSignupDisabled, setIsSignupDisabled] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const navigate = useNavigate()

  const redirectTo = (url: string) => {
    if (url) {
      window.location.href = url
    }
  }

  const onSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithEmail(email, password)
      toast.success('User Logged in successfully')
    } catch (err) {
      console.error('Error while creating User', err)
      toast.error('Log in failed')
      toast.error(err?.code?.toString()?.split('/')[1])
    } finally {
      setIsLoading(false)
    }
  }

  const onSignUp = async () => {
    setIsLoading(true)
    const user = {
      firstName,
      lastName,
      phoneNumber,
      email
    }
    try {
      await signUp(email, password, user)
      toast.success('User signed up successfully')
    } catch (err) {
      console.error('Error while creating User', err)
      toast.error('Sign up failed')
      toast.error(err?.code?.toString()?.split('/')[1])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (type === SignupLoginEnum.LOGIN) {
      const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        email
      )
      if (emailCheck && password.length > 8) setIsLoginDisabled(false)
      else setIsLoginDisabled(true)
    }
  }, [email, password])

  useEffect(() => {
    if (type === SignupLoginEnum.SIGNUP) {
      const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        email
      )
      const phoneCheck = /^[7-9]\d{9}$/.test(phoneNumber)
      if (
        emailCheck &&
        password.length > 8 &&
        password == confirmPassword &&
        firstName &&
        lastName &&
        phoneCheck
      )
        setIsSignupDisabled(false)
      else setIsSignupDisabled(true)
    }
  }, [firstName, lastName, phoneNumber, email, password, confirmPassword])
  return (
    <div className="signin-login">
      <div className="main-login">
        <img
          src={InstagramWord}
          width={200}
          height={70}
          className="insta-word"
        />
        <div className="form">
          {type == SignupLoginEnum.SIGNUP && (
            <>
              <div className="signup-message">
                {SignupLoginVariable.SIGNIN_MESSAGE}
              </div>
              <div className="social">
                <div className="google" onClick={() => signInWithGoogle()}>
                  <img src={GoogleIcon} alt="goole" height={16} width={16} />
                  {SignupLoginVariable.GOOGLE_LOGIN}
                </div>
              </div>
              <OrContainer />
              <div className="first-name">
                <input
                  type="text"
                  placeholder={FormLabel.FIRST_NAME}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="last-name">
                <input
                  type="text"
                  placeholder={FormLabel.LAST_NAME}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="phone">
                <input
                  type="text"
                  placeholder={FormLabel.PHONE_NUMBER}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="email">
            <input
              type="text"
              placeholder={FormLabel.EMAIL}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={FormLabel.PASSWORD}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? ShowIcon : HideIcon}
              className="show-hide"
              alt="show"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {type == SignupLoginEnum.SIGNUP && (
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={FormLabel.CONFIRM_PASSWORD}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img
                src={showPassword ? ShowIcon : HideIcon}
                className="show-hide"
                alt="show"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          )}
          {type == SignupLoginEnum.SIGNUP && (
            <div className="details">
              <div>
                {SignupLoginVariable.DETAIL_MESSAGE}
                <span onClick={() => redirectTo(RedirectUrls.LEARN_MORE)}>
                  {SignupLoginVariable.LEARN_MORE}
                </span>
              </div>
              <div>
                {SignupLoginVariable.BY_SIGNUP}
                <span onClick={() => redirectTo(RedirectUrls.TERMS)}>
                  {SignupLoginVariable.TERMS}
                </span>
                <span onClick={() => redirectTo(RedirectUrls.PRIVACY_POLICY)}>
                  {SignupLoginVariable.PRIVACY_POLICY}
                </span>
                {SignupLoginVariable.AND}
                <span onClick={() => redirectTo(RedirectUrls.COOKIES_POLICY)}>
                  {SignupLoginVariable.COOKIES_POLICY}
                </span>
              </div>
            </div>
          )}
          {type == SignupLoginEnum.LOGIN ? (
            <button disabled={isLoginDisabled} onClick={() => onSignIn()}>
              {isLoading ? (
                <img src={Loading} alt="loading" className="loading" />
              ) : (
                SignupLoginVariable.LOGIN
              )}
            </button>
          ) : (
            <button disabled={isSignupDisabled} onClick={() => onSignUp()}>
              {isLoading ? (
                <img src={Loading} alt="loading" className="loading" />
              ) : (
                SignupLoginVariable.SIGNUP
              )}
            </button>
          )}

          {type == SignupLoginEnum.LOGIN && (
            <>
              <OrContainer />
              <div className="social">
                <div className="google" onClick={() => signInWithGoogle()}>
                  <img src={GoogleIcon} alt="goole" height={16} width={16} />
                  {SignupLoginVariable.GOOGLE_LOGIN}
                </div>
              </div>
              <div
                className="forget"
                onClick={() => navigate(LoggedOutRoutesEnum.FORGET_PASSWORD)}
              >
                {SignupLoginVariable.FORGET_PASSWORD}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="main-login">
        {type == SignupLoginEnum.LOGIN ? (
          <div className="sign-up">
            {SignupLoginVariable.NO_ACCOUNT}
            <span onClick={() => navigate(LoggedOutRoutesEnum.CREATE_USER)}>
              {' '}
              {SignupLoginVariable.SIGNUP}
            </span>
          </div>
        ) : (
          <div className="log-in">
            {SignupLoginVariable.ACCOUNT}
            <span onClick={() => navigate(LoggedOutRoutesEnum.HOME)}>
              {' '}
              {SignupLoginVariable.LOGIN}
            </span>
          </div>
        )}
      </div>
      <div className="get-app">
        <span className="text">{SignupLoginVariable.GET_APP}</span>
        <span>
          <img src={ImageUrl.APPLE_STORE} alt="App store" />
          <img src={ImageUrl.GOOGLE_PLAY} alt="Play store" />
        </span>
      </div>
    </div>
  )
}

export default SignupLogin
