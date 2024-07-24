import React, { useState } from 'react'
import './UserSection.scss'
import { UserAuth } from '@src/context/AuthContext'
import ChangeProfile from '@src/common/components/change-profile/ChangeProfile'

const UserSection: React.FC<{}> = () => {
  const { user } = UserAuth()
  const [changeProfile, setChangeProfile] = useState<boolean>(false)

  return (
    <>
      {changeProfile && <ChangeProfile closeChangeProfile={setChangeProfile} />}
      <div className="user-section">
        <div className="user-details">
          <div className="profile-pic">
            <div className="image-container">
              {user?.profilePic ? (
                <img src={user?.profilePic} />
              ) : (
                <div className="profile-fallback">{`${user?.firstName[0]} ${user?.lastName[0]}`}</div>
              )}
            </div>
          </div>
          <div className="account-info">
            <div className="row-one">
              <span className="mail">{user?.email}</span>
              <span className="edit-profile">
                <span
                  className="edit-button"
                  onClick={() => setChangeProfile(true)}
                >
                  Change Photo
                </span>
              </span>
            </div>
            <div className="row-two">
              <span className="post-count">5 Posts</span>
              <span className="friends-count">6 Friends</span>
            </div>
            <div className="row-three">{`${user?.firstName} ${user?.lastName}`}</div>
          </div>
        </div>
        <div className="user-posts"></div>
      </div>
    </>
  )
}

export default UserSection
