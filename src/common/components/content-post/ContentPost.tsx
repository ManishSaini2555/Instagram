import React, { useEffect, useState } from 'react'
import './ContentPost.scss'
import { LikeIcon, LikedIcon, SaveIcon } from '@src/assets/images'
import { newPostType, postType } from '@src/common/types'
import { displayDifferenceInterval } from '@src/common/utils'
import { updatePost } from '@src/functions/Posts'
import { UserAuth } from '@src/context/AuthContext'

interface ContentPostType {
  post: newPostType
}
const ContentPost: React.FC<ContentPostType> = ({ post }) => {
  const { user, setLoading } = UserAuth()
  const [comment, setComment] = useState<string>('')
  const [showComment, setShowComment] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)

  const likePost = async () => {
    try {
      setLoading(true)
      const tempPayoad: postType = {
        id: post.id,
        timeStamp: post.timeStamp,
        uid: post.uid,
        post: post.post,
        like: [...post.like, user.uid],
        comment: post.comment
      }
      setIsLiked(!isLiked)
      setLikeCount(likeCount + 1)
      await updatePost(tempPayoad, 'Post liked successfully')
    } finally {
      setLoading(false)
    }
  }

  const unLikePost = async () => {
    try {
      setLoading(true)
      const tempPayoad: postType = {
        id: post.id,
        timeStamp: post.timeStamp,
        uid: post.uid,
        post: post.post,
        like: post.like.filter((id) => id != user.uid),
        comment: post.comment
      }
      setIsLiked(!isLiked)
      setLikeCount(likeCount - 1)
      await updatePost(tempPayoad, 'Post unliked successfully')
    } finally {
      setLoading(false)
    }
  }

  const shareComment = async () => {
    try {
      setLoading(true)
      const tempPayoad: postType = {
        id: post.id,
        timeStamp: post.timeStamp,
        uid: post.uid,
        post: post.post,
        like: post.like,
        comment: [
          ...post.comment,
          { uid: user.uid, value: comment, timeStamp: new Date().toISOString() }
        ]
      }
      await updatePost(tempPayoad, 'Comment added successfully')
      setComment('')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setIsLiked(post.like.some((item) => item === user.uid))
    setLikeCount(post.like.length)
  }, [])
  return (
    <div className="post">
      <div className="user-section">
        <div className="left-section">
          <div
            className="profile-icon"
            style={{ backgroundColor: post?.profilePic && 'unset' }}
          >
            {post?.profilePic ? (
              <img src={post?.profilePic} alt="profile-pic" />
            ) : (
              post.firstName[0] + post.lastName[0]
            )}
          </div>
          <div className="user-name">
            {post.firstName + ' ' + post.lastName}
          </div>
          <div className="number-day">
            • {displayDifferenceInterval(post.timeStamp)}
          </div>
        </div>
        <div className="right-section">
          {/* <img src={ThreeDotsIcon} height={15} className="insta-word" /> */}
        </div>
      </div>
      <div className="content">
        <img src={post.post} alt="post image" />
      </div>
      <div className="bottom-section">
        <div className="like-save">
          {isLiked ? (
            <img
              src={LikedIcon}
              height={25}
              className="liked"
              onClick={unLikePost}
            />
          ) : (
            <img
              src={LikeIcon}
              height={30}
              className="like"
              onClick={likePost}
            />
          )}
          <img src={SaveIcon} height={30} className="save" />
        </div>
        <div className="like-count"> {likeCount} likes</div>
        {showComment ? (
          <>
            <div
              className="hide-comment"
              onClick={() => setShowComment(!showComment)}
            >
              Hide comments
            </div>
            <div className="comments">
              {post.comment.map((comment, index) => (
                <div key={index} className="comment-item">
                  <span className="comment-name">{comment.user}</span>
                  <span className="comment-text">{comment.value}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            className="view-comment"
            onClick={() => setShowComment(!showComment)}
          >
            {' '}
            View all {post.comment.length} comments
          </div>
        )}
        <div className="add-comment">
          <textarea
            name="comment"
            id=""
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {comment && (
            <div className="post-button" onClick={shareComment}>
              Post
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentPost
