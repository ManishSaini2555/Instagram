import React, { useEffect, useState } from 'react'
import './Home.scss'
import ContentPost from '@src/common/components/content-post/ContentPost'
import { getAllPosts } from '@src/functions/Posts'
import { newPostType } from '@src/common/types'
import UserLayout from '@src/layout/UserLayout'

const Home: React.FC<{}> = () => {
  const [posts, setPosts] = useState<newPostType[]>([])

  useEffect(() => {
    getAllPosts().then((data: newPostType[]) => {
      if (data?.length) setPosts(data)
    })
  }, [])
  return (
    <UserLayout
      children={posts.map((post: newPostType) => {
        return <ContentPost key={post.id} post={post} />
      })}
    />
  )
}

export default Home
