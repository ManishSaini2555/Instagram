import React, { useEffect, useState } from 'react'
import './ChatSection.scss'
import { UserAuth } from '@src/context/AuthContext'
import {
  getRelationships,
  sendFriendRequest
} from '@src/functions/Relationships'
import { relationshipsType } from '@src/common/types'

const ChatSection: React.FC<{}> = () => {
  const { user, setLoading } = UserAuth()
  const [userRelation, setUserRelation] = useState<relationshipsType | null>(
    null
  )
  const [friends, setFriends] = useState([])
  const [pendingRequestFriends, setpendingRequestFriends] = useState([])
  const [friendRequests, setfriendRequests] = useState([])

  const requestSendClick = async (recieverId: string) => {
    try {
      setLoading(true)
      await sendFriendRequest(user.uid, recieverId)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const friendStatus = (id: string) => {
    if (userRelation?.uid === id) return 'User Itself'
    if (userRelation?.friends?.includes(id)) return 'Friend'
    if (userRelation?.requestSent?.includes(id)) return 'Request Sent'
    return 'Add'
  }

  useEffect(() => {
    if (user)
      getRelationships(user?.uid).then((relation) => {
        if (relation != undefined) {
          setUserRelation(relation)
          console.log('User relation: ', relation)
        }
      })
  }, [user])

  useEffect(() => {
    if (userRelation) {
    }
  }, [userRelation])

  return (
    <>
      <div className="chat-section">
        <div className="search-result">
          {friends.map((friend: any) => (
            <div key={friend.uid} className="user-item">
              {/* <img src={user.profilePic} alt="profile-pic" /> */}
              <span className="user-image">
                {friend?.profilePic ? (
                  <img src={friend?.profilePic} alt="profile-pic" />
                ) : (
                  friend?.firstName[0] + ' ' + friend?.lastName[0]
                )}
              </span>
              <div className="details">
                <div className="content">
                  <span className="user-email">{friend?.email}</span>
                  <span className="user-name">
                    {friend?.firstName + ' ' + friend?.lastName}
                  </span>
                </div>
                <div className="actions">
                  {friendStatus(friend?.uid) === 'Add' ? (
                    <button onClick={() => requestSendClick(friend?.uid)}>
                      Send Request
                    </button>
                  ) : friendStatus(friend?.uid) === 'Request Sent' ? (
                    <button disabled>Sent</button>
                  ) : friendStatus(friend?.uid) === 'Friend' ? (
                    <button>Unfriend</button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ChatSection
