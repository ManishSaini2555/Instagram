import React, { ReactNode, useState } from 'react'
import './UserLayout.scss'
import { UserAuth } from '@src/context/AuthContext'
import AddPost from '@src/common/components/add-post/AddPost'
import SideNav from '@src/components/sidenav/SideNav'
import Loader from '@src/common/components/loader/Loader'

const UserLayout: React.FC<ReactNode> = ({ children }) => {
  const { loading } = UserAuth()
  const [showAddPost, setShowAddPost] = useState<boolean>(false)

  return (
    <div className="layout">
      {showAddPost && <AddPost closeAddPost={setShowAddPost} />}
      {loading && <Loader />}
      <SideNav setShowAddPost={setShowAddPost} />
      <div className="main-container">
        <div className="main-content">{children}</div>
      </div>
    </div>
  )
}

export default UserLayout
