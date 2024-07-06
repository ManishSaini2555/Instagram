import React, { useState } from 'react'
import './ContentPost.scss'
import { LikeIcon, SaveIcon, ThreeDotsIcon } from '@src/assets/images'
import { commentType } from '@src/common/types'
import { displayDifferenceInterval } from '@src/common/utils'

interface ContentPostType {
  firstName: string
  lastName: string
  likes: number
  comments: commentType[]
  post: string
  timeStamp: string
}
const ContentPost: React.FC<ContentPostType> = ({
  firstName,
  lastName,
  likes,
  comments,
  post,
  timeStamp
}) => {
  const [comment, setComment] = useState<string>('')
  return (
    <div className="post">
      <div className="user-section">
        <div className="left-section">
          <div className="profile-icon">{firstName[0] + lastName[0]}</div>
          <div className="user-name">{firstName + ' ' + lastName}</div>
          <div className="number-day">
            • {displayDifferenceInterval(timeStamp)}
          </div>
        </div>
        <div className="right-section">
          {/* <img src={ThreeDotsIcon} height={15} className="insta-word" /> */}
        </div>
      </div>
      <div className="content">
        <img src={post} alt="post image" />
      </div>
      <div className="bottom-section">
        <div className="like-save">
          <img src={LikeIcon} height={30} className="insta-word" />
          <img src={SaveIcon} height={30} className="insta-word" />
        </div>
        <div className="like-count"> {likes} likes</div>
        <div className="view-comment"> View all {comments.length} comments</div>
        <div className="add-comment">
          <textarea
            name="comment"
            id=""
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {comment && <div className="post-button">Post</div>}
        </div>
      </div>
    </div>
  )
}

export default ContentPost
