import React from 'react'
import './Friend.scss'
import { userType } from '@src/common/types'

interface friendType {
  friend: userType
  isChat?: boolean
  acceptFriendRequest?: (id: string) => void
  rejectFriendRequest?: (id: string) => void
  revokeFriendRequest?: (id: string) => void
  openChatWithFriend?: (friend: userType) => void
  unfriend?: (id: string) => void
  friendStatus?: (id: string) => string
}
const Friend: React.FC<friendType> = ({
  friend,
  isChat = false,
  acceptFriendRequest,
  rejectFriendRequest,
  revokeFriendRequest,
  openChatWithFriend,
  unfriend,
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
        {!isChat ? (
          <div className="actions">
            {friendStatus &&
            friendStatus(friend?.uid) === 'Request Recieved' ? (
              <>
                <button
                  onClick={() =>
                    acceptFriendRequest && acceptFriendRequest(friend?.uid)
                  }
                >
                  Accept Request
                </button>
                <button
                  onClick={() =>
                    rejectFriendRequest && rejectFriendRequest(friend?.uid)
                  }
                >
                  Reject Request
                </button>
              </>
            ) : friendStatus && friendStatus(friend?.uid) === 'Request Sent' ? (
              <button
                onClick={() =>
                  revokeFriendRequest && revokeFriendRequest(friend?.uid)
                }
              >
                Revoke Request
              </button>
            ) : friendStatus && friendStatus(friend?.uid) === 'Friend' ? (
              <button onClick={() => unfriend && unfriend(friend?.uid)}>
                Unfriend
              </button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="actions">
            <button
              onClick={() => openChatWithFriend && openChatWithFriend(friend)}
            >
              Open Chat
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Friend
