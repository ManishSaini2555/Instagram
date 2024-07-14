import React, { useEffect, useState } from 'react'
import './Home.scss'
import { UserAuth } from '@src/context/AuthContext'
import ContentPost from '@src/common/components/content-post/ContentPost'
import AddPost from '@src/common/components/add-post/AddPost'
import { getAllPosts } from '@src/functions/Posts'
import { newPostType } from '@src/common/types'
import SideNav from '@src/components/sidenav/SideNav'
import Loader from '@src/common/components/loader/Loader'

const Home: React.FC<{}> = () => {
  const { user, loading } = UserAuth()
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
      {showAddPost && <AddPost closeAddPost={setShowAddPost} />}
      {loading && <Loader />}
      <SideNav setShowAddPost={setShowAddPost} />
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
