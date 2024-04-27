import React, { useState } from 'react'
import './Login.scss'
import { GoogleIcon, InstagramPhone, InstagramWord, Loading } from '@images'

const LogIn: React.FC<{}> = ({}) => {
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
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
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
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
              <span> Sign up</span>
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
