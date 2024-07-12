import React from 'react'
import './SideNav.scss'
import { logOut } from '@src/functions/Auth'
import {
  CreateIcon,
  HomeIcon,
  LogOutIcon,
  MainLogo,
  ReelsIcon,
  SearchIcon
} from '@images'

interface SideNavType {
  setShowAddPost: React.Dispatch<React.SetStateAction<boolean>>
}
const SideNav: React.FC<SideNavType> = ({ setShowAddPost }) => {
  return (
    <div className="side-navigation">
      <div>
        <div className="logo">
          <img src={MainLogo} width="100%" className="insta-word" />
        </div>
        <div className="nav-item">
          <img src={HomeIcon} height={26} className="icon-nav" />
          <span className="nav-text">Home</span>
        </div>
        <div className="nav-item">
          <img src={SearchIcon} height={26} className="icon-nav" />
          <span className="nav-text">Search</span>
        </div>
        <div className="nav-item">
          <img src={ReelsIcon} height={26} className="icon-nav" />
          <span className="nav-text">Reels</span>
        </div>
        <div className="nav-item" onClick={() => setShowAddPost(true)}>
          <img src={CreateIcon} height={26} className="icon-nav" />
          <span className="nav-text">Create</span>
        </div>
        <div className="nav-item">
          <img src={HomeIcon} height={26} className="icon-nav" />
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
