import React from 'react'
import './CreateUser.scss'
import SignupLogin from '@src/components/signin-login/SignupLogin'
import { SignupLoginEnum } from '@src/common/constants/constants'

const CreateUser: React.FC<{}> = ({}) => {
  return (
    <div className="create-user">
      <SignupLogin type={SignupLoginEnum.SIGNUP} />
    </div>
  )
}

export default CreateUser
