import React from 'react'
import './Profile.scss'
import UserLayout from '@src/layout/UserLayout'
import UserSection from '@src/components/user-section/UserSection'

const Profile: React.FC<{}> = () => {
  return <UserLayout children={<UserSection />} />
}

export default Profile
