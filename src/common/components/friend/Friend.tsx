import React from 'react'
import './Friend.scss'
import { userType } from '@src/common/types'

interface friendType {
  friend: userType
  acceptFriendRequest: (id: string) => void
  rejectFriendRequest?: (id: string) => void
  revokeFriendRequest?: (id: string) => void
  friendStatus: (id: string) => string
}
const Friend: React.FC<friendType> = ({
  friend,
  acceptFriendRequest,
  rejectFriendRequest,
  revokeFriendRequest,
  friendStatus
}) => {
  return (
    <div key={friend.uid} className="friend">
      <span className="user-image">
        {friend?.profilePic ? (
          <img src={friend?.profilePic} alt="profile-pic" />
        ) : (
          friend?.firstName[0] + ' ' + friend?.lastName[0]
        )}
      </span>
      <div className="details">
        <div className="content">
          <span className="user-name">
            {friend?.firstName + ' ' + friend?.lastName}
          </span>
        </div>
        <div className="actions">
          {friendStatus(friend?.uid) === 'Request Recieved' ? (
            <>
              <button onClick={() => acceptFriendRequest(friend?.uid)}>
                Accept Request
              </button>
              <button onClick={() => acceptFriendRequest(friend?.uid)}>
                Reject Request
              </button>
            </>
          ) : friendStatus(friend?.uid) === 'Request Sent' ? (
            <button>Revoke Request</button>
          ) : friendStatus(friend?.uid) === 'Friend' ? (
            <button>Unfriend</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Friend
