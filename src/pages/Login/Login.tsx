import React from 'react'
import './Login.scss'
import { InstagramPhone } from '@images'
import SignupLogin from '@src/components/signin-login/SignupLogin'
import { SignupLoginEnum } from '@src/common/constants/constants'

const LogIn: React.FC<{}> = ({}) => {
  return (
    <div className="login">
      <div className="base">
        <div className="login-base image-section">
          <img src={InstagramPhone} alt="phone image" />
        </div>
        <div className="login-base">
          <SignupLogin type={SignupLoginEnum.LOGIN} />
        </div>
      </div>
    </div>
  )
}

export default LogIn
