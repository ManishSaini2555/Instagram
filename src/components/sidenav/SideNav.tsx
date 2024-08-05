import React from 'react'
import './SideNav.scss'
import { logOut } from '@src/functions/Auth'
import {
  ChatIcon,
  CreateIcon,
  FriendIcon,
  HomeIcon,
  LogOutIcon,
  MainLogo,
  ProfileLogo,
  SearchIcon
} from '@images'
import { useNavigate } from 'react-router-dom'
import { LoggedInRoutesEnum } from '@src/common/constants/constants'
import { UserAuth } from '@src/context/AuthContext'

interface SideNavType {
  setShowAddPost: React.Dispatch<React.SetStateAction<boolean>>
}
const SideNav: React.FC<SideNavType> = ({ setShowAddPost }) => {
  const navigate = useNavigate()
  const { user } = UserAuth()

  return (
    <div className="side-navigation">
      <div>
        <div
          className="logo"
          onClick={() =>
            navigate({
              pathname: LoggedInRoutesEnum.HOME
            })
          }
        >
          <img src={MainLogo} width="100%" className="insta-word" />
        </div>
        <div
          className="nav-item"
          onClick={() =>
            navigate({
              pathname: LoggedInRoutesEnum.HOME
            })
          }
        >
          <img src={HomeIcon} height={26} className="icon-nav" />
          <span className="nav-text">Home</span>
        </div>
        <div
          className="nav-item"
          onClick={() =>
            navigate({
              pathname: LoggedInRoutesEnum.SEARCH
            })
          }
        >
          <img src={SearchIcon} height={26} className="icon-nav" />
          <span className="nav-text">Search</span>
        </div>
        <div
          className="nav-item"
          onClick={() =>
            navigate({
              pathname: LoggedInRoutesEnum.FRIENDS
            })
          }
        >
          <img src={FriendIcon} height={26} className="icon-nav" />
          <span className="nav-text">Friends</span>
        </div>
        <div
          className="nav-item"
          onClick={() =>
            navigate({
              pathname: LoggedInRoutesEnum.CHAT
            })
          }
        >
          <img src={ChatIcon} height={26} className="icon-nav" />
          <span className="nav-text">Chat</span>
        </div>
        <div className="nav-item" onClick={() => setShowAddPost(true)}>
          <img src={CreateIcon} height={24} className="icon-nav" />
          <span className="nav-text">Create</span>
        </div>
        <div
          className="nav-item"
          onClick={() =>
            navigate({
              pathname: LoggedInRoutesEnum.PROFILE
            })
          }
        >
          {user?.profilePic ? (
            <div className="profile icon-nav">
              <img src={user?.profilePic} alt="profile-pic" />
            </div>
          ) : (
            <img src={ProfileLogo} height={20} className="icon-nav" />
          )}
          <span className="nav-text">Profile</span>
        </div>
      </div>
      <div className="nav-item" onClick={logOut}>
        <img src={LogOutIcon} height={26} className="icon-nav" />
        <span className="nav-text">Log out</span>
      </div>
    </div>
  )
}

export default SideNav
