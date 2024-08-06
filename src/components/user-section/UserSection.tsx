import React, { useEffect, useState } from 'react'
import './UserSection.scss'
import { UserAuth } from '@src/context/AuthContext'
import ChangeProfile from '@src/common/components/change-profile/ChangeProfile'
import { getUserPosts, getUserSavedPosts } from '@src/functions/Posts'
import { postType } from '@src/common/types'
import { PostLogo, SaveIcon } from '@src/assets/images'

const UserSection: React.FC<{}> = () => {
  const { user } = UserAuth()
  const [changeProfile, setChangeProfile] = useState<boolean>(false)
  const [posts, setPosts] = useState<postType[]>([])
  const [saved, setSaved] = useState<postType[]>([])
  const [showPosts, setShowPosts] = useState<boolean>(true)

  useEffect(() => {
    if (user) {
      getUserPosts(user?.uid).then((data: postType[]) => {
        if (data?.length) setPosts(data)
      })
      getUserSavedPosts(user?.uid).then((data: postType[]) => {
        if (data?.length) setSaved(data)
      })
    }
  }, [])

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
                <div className="profile-fallback">
                  {user?.firstName
                    ? `${user?.firstName[0]} ${user?.lastName[0]}`
                    : 'G U'}
                </div>
              )}
            </div>
          </div>
          <div className="account-info">
            <div className="row-one">
              <span className="mail">{`${user?.firstName} ${user?.lastName}`}</span>
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
              <span className="post-count">{posts?.length} Posts</span>
              <span className="friends-count">6 Friends</span>
            </div>
            <div className="row-three">{user?.email}</div>
          </div>
        </div>
        <div className="user-posts">
          <div className="catagory-section mobile">
            <div className="mobile-content-item">
              <div className="count">{posts?.length}</div>
              <div className="text">Posts</div>
            </div>
            <div className="mobile-content-item">
              <div className="count">6</div>
              <div className="text">Friends</div>
            </div>
          </div>
          <div className="catagory-section">
            <div
              className={`${showPosts && 'active'} item`}
              onClick={() => setShowPosts(true)}
            >
              <img src={PostLogo} alt="Post" height={16} /> Posts
            </div>
            <div
              className={`${!showPosts && 'active'} item`}
              onClick={() => setShowPosts(false)}
            >
              <img src={SaveIcon} alt="Post" height={20} /> Saved
            </div>
          </div>
          <div className="grid-container">
            {showPosts
              ? posts.map((post: postType) => {
                  return (
                    <>
                      <div className="grid-item">
                        <img src={post.post} alt="post" />
                      </div>
                      <div className="grid-item">
                        <img src={post.post} alt="post" />
                      </div>
                      <div className="grid-item">
                        <img src={post.post} alt="post" />
                      </div>
                      <div className="grid-item">
                        <img src={post.post} alt="post" />
                      </div>
                    </>
                  )
                })
              : saved.map((post: postType) => {
                  return (
                    <div className="grid-item">
                      <img src={post.post} alt="post" />
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSection
