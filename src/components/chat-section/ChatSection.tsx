import React, { useEffect, useState } from 'react'
import './ChatSection.scss'
import { UserAuth } from '@src/context/AuthContext'
import {
  getRelationships,
  getUserByUid,
  sendFriendRequest
} from '@src/functions/Relationships'
import { relationshipsType, userType } from '@src/common/types'
import Friend from '@src/common/components/friend/Friend'
import Accordion from '@src/common/components/accordion/Accordion'

const ChatSection: React.FC<{}> = () => {
  const { user, setLoading } = UserAuth()
  const [userRelation, setUserRelation] = useState<relationshipsType | null>(
    null
  )
  const [friends, setFriends] = useState<userType[]>([])
  const [pendingRequestFriends, setpendingRequestFriends] = useState<
    userType[]
  >([])
  const [friendRequests, setfriendRequests] = useState<userType[]>([])

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
    if (userRelation?.id === id) return 'User Itself'
    if (userRelation?.friends?.includes(id)) return 'Friend'
    if (userRelation?.requestSent?.includes(id)) return 'Request Sent'
    if (userRelation?.requestRecieved?.includes(id)) return 'Request Recieved'
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
      userRelation.friends?.forEach((friendId) => {
        console.log('friendId: ', friendId)
        getUserByUid(friendId).then((user) => {
          if (user) setFriends([...friends, user])
        })
      })
      userRelation.requestRecieved?.forEach((friendId) => {
        console.log('requestRecieved: ', friendId)
        getUserByUid(friendId).then((user) => {
          if (user) setfriendRequests([...friendRequests, user])
        })
      })
      userRelation.requestSent?.forEach((friendId) => {
        console.log('requestSent: ', friendId)
        getUserByUid(friendId).then((user) => {
          if (user) setpendingRequestFriends([...pendingRequestFriends, user])
        })
      })
    }
  }, [userRelation])

  return (
    <>
      <div className="chat-section">
        <div className="friend-result">
          {friendRequests.length > 0 && (
            <Accordion
              title="Friend Request"
              isDefaultOpen={friends.length == 0}
            >
              {friendRequests.map((friend: any) => (
                <Friend
                  friend={friend}
                  acceptFriendRequest={requestSendClick}
                  friendStatus={friendStatus}
                />
              ))}
            </Accordion>
          )}
          {pendingRequestFriends.length > 0 && (
            <Accordion
              title="Requests Sent"
              isDefaultOpen={friends.length == 0 && friendRequests.length == 0}
            >
              {pendingRequestFriends.map((friend: any) => (
                <Friend
                  friend={friend}
                  acceptFriendRequest={requestSendClick}
                  friendStatus={friendStatus}
                />
              ))}
            </Accordion>
          )}
          {friends.length > 0 && (
            <Accordion
              title="Active Friends"
              isDefaultOpen={friends.length > 0}
            >
              {friends.map((friend: any) => (
                <Friend
                  friend={friend}
                  acceptFriendRequest={requestSendClick}
                  friendStatus={friendStatus}
                />
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatSection
