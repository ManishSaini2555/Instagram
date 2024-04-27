import React, { useEffect, useState } from 'react'
import './Login.scss'
import {
  GoogleIcon,
  HideIcon,
  InstagramPhone,
  InstagramWord,
  Loading,
  ShowIcon
} from '@images'
import { useNavigate } from 'react-router-dom'

const LogIn: React.FC<{}> = ({}) => {
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const emailCheck = !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
      email
    )
    if (!emailCheck && password.length > 8) {
      setIsLoginDisabled(false)
    } else {
      setIsLoginDisabled(true)
    }
  }, [email, password])
  return (
    <div className="login">
      <div className="base">
        <div className="login-base image-section">
          <img src={InstagramPhone} alt="phone image" />
        </div>
        <div className="login-base">
          <div className="main-login">
            <img
              src={InstagramWord}
              width={175}
              height={51}
              className="insta-word"
            />
            <div className="form">
              <div className="email">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  src={showPassword ? ShowIcon : HideIcon}
                  className="show-hide"
                  alt="show"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <button disabled={isLoginDisabled}>
                {isLoading ? (
                  <img src={Loading} alt="loading" className="loading" />
                ) : (
                  'Log in'
                )}
              </button>
              <div className="or-container">
                <div className="divider"></div>
                <div>OR</div>
                <div className="divider"></div>
              </div>
              <div className="social">
                <div className="google">
                  <img src={GoogleIcon} alt="goole" height={16} width={16} />
                  Log in with Google
                </div>
              </div>
              <div className="forget">Forget password?</div>
            </div>
          </div>
          <div className="main-login">
            <div className="sign-up">
              Don't have an account?
              <span onClick={() => navigate('/create-user')}> Sign up</span>
            </div>
          </div>
          <div className="get-app">
            <span className="text">Get the app.</span>
            <span>
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png"
                alt="App store"
              />
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                alt="App store"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
