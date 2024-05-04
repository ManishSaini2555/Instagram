import BorderContainer from '@src/common/components/border-container/BorderContainer'
import React, { useEffect, useState } from 'react'
import './ForgetPassword.scss'
import { Loading, Lock } from '@src/assets/images'
import {
  ForgetPasswordEnum,
  FormLabel,
  LoggedOutRoutesEnum,
  SignupLoginVariable
} from '@src/common/constants/constants'
import OrContainer from '@src/common/components/or-container/OrContainer'
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '@src/functions/Auth'
import { toast } from 'react-toastify'

const ForgetPassword: React.FC<{}> = ({}) => {
  const [email, setEmail] = useState<string>('')
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true)
  const navigate = useNavigate()

  const sendLoginLink = () => {}

  const sendResetPasswordLink = async () => {
    try {
      await resetPassword(email)
      toast.success('Reset password link sent successfully, Check your mail.')
    } catch (error) {
      toast.error(
        error?.code?.toString()?.split('/')[1]
          ? error?.code?.toString()?.split('/')[1]
          : 'Something went wrong!'
      )
    }
  }

  useEffect(() => {
    const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
      email
    )
    if (emailCheck) setIsButtonDisable(false)
    else setIsButtonDisable(true)
  }, [email])

  return (
    <div className="forget-password">
      <div className="main-container">
        <BorderContainer>
          <>
            <div className="content">
              <div className="form">
                <div className="lock-container">
                  <img src={Lock} alt="lock" />
                </div>
                <p className="heading">{ForgetPasswordEnum.TROUBLE}</p>
                <p className="detail">{ForgetPasswordEnum.ENTER_DETAILS}</p>
                <div className="email">
                  <input
                    type="text"
                    placeholder={FormLabel.EMAIL}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* <button
                  disabled={isButtonDisable}
                  onClick={() => sendLoginLink()}
                >
                  {ForgetPasswordEnum.LOGIN_LINK}
                </button>
                <OrContainer noSpace={true} /> */}
                <button
                  disabled={isButtonDisable}
                  onClick={() => sendResetPasswordLink()}
                >
                  {ForgetPasswordEnum.RESET_PASSWORD}
                </button>
              </div>
              <OrContainer />
              <div
                className="create-user-button"
                onClick={() => navigate(LoggedOutRoutesEnum.CREATE_USER)}
              >
                {ForgetPasswordEnum.CREATE}
              </div>
            </div>
            <div
              className="back-login"
              onClick={() => navigate(LoggedOutRoutesEnum.HOME)}
            >
              <BorderContainer>
                <div className="back-button">{ForgetPasswordEnum.BACK}</div>
              </BorderContainer>
            </div>
          </>
        </BorderContainer>
      </div>
    </div>
  )
}

export default ForgetPassword
