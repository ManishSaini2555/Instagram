import React, { useEffect, useState } from 'react'
import './Home.scss'
import { UserAuth } from '@src/context/AuthContext'
import { logOut } from '@src/functions/Auth'
import {
  CreateIcon,
  HomeIcon,
  InstagramWordWhite,
  MoreIcon,
  ReelsIcon,
  SearchIcon
} from '@images'
import ContentPost from '@src/common/components/content-post/ContentPost'
import AddPost from '@src/common/components/add-post/AddPost'
import { getAllPosts } from '@src/functions/Posts'
import { newPostType } from '@src/common/types'

const Home: React.FC<{}> = () => {
  const { user } = UserAuth()
  const [showAddPost, setShowAddPost] = useState<boolean>(false)
  const [posts, setPosts] = useState<newPostType[]>([])

  useEffect(() => {
    getAllPosts().then((data: newPostType[]) => {
      if (data?.length) setPosts(data)
    })
  }, [])
  return (
    <div className="home">
      {/* Welcome {user?.firstName ? user?.firstName : user?.email}
      <div className="logout">
        <button onClick={() => logOut()}>Log out</button>
      </div> */}
      {showAddPost && <AddPost user={user} closeAddPost={setShowAddPost} />}
      <div className="side-navigation">
        <div>
          <div className="logo">
            <img
              src={InstagramWordWhite}
              width={100}
              height={30}
              className="insta-word"
            />
          </div>
          <div className="nav-item">
            <img src={HomeIcon} height={26} className="icon-nav" />
            Home
          </div>
          <div className="nav-item">
            <img src={SearchIcon} height={26} className="icon-nav" />
            Search
          </div>
          <div className="nav-item">
            <img src={ReelsIcon} height={26} className="icon-nav" />
            Reels
          </div>
          <div
            className="nav-item"
            onClick={() => setShowAddPost(!showAddPost)}
          >
            <img src={CreateIcon} height={26} className="icon-nav" />
            Create
          </div>
          <div className="nav-item">
            <img src={HomeIcon} height={26} className="icon-nav" />
            Profile
          </div>
        </div>
        <div className="nav-item" onClick={logOut}>
          <img src={MoreIcon} height={26} className="icon-nav" />
          {/* More */}
          Log out
        </div>
      </div>
      <div className="main-container">
        <div className="main-content">
          {posts.map((post: newPostType) => {
            return <ContentPost key={post.id} post={post} user={user} />
          })}
        </div>
        {/* <div className="main-right">right</div> */}
      </div>
    </div>
  )
}

export default Home
