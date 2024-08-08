import React, { useEffect, useState } from 'react'
import './ChatSection.scss'
import { UserAuth } from '@src/context/AuthContext'
import { getRelationships, getUserByUid } from '@src/functions/Relationships'
import { relationshipsType, userType } from '@src/common/types'
import Friend from '@src/common/components/friend/Friend'
import ChatWithFriendSection from '@src/common/components/chat-with-friend/ChatWithFriend'
import { getConversationId } from '@src/functions/Chat'

const ChatSection: React.FC<{}> = () => {
  const { user } = UserAuth()
  const [userRelation, setUserRelation] = useState<relationshipsType | null>(
    null
  )
  const [friends, setFriends] = useState<userType[]>([])
  const [conversationId, setConversationId] = useState<string>('')
  const [chatFriend, setChatFriend] = useState<userType>({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    uid: '',
    profilePic: ''
  })

  const openChatWithFriend = async (friend: userType) => {
    try {
      setChatFriend(friend)
      const data = await getConversationId(user?.uid, friend?.uid)
      if (data) setConversationId(data[0]?.id)
      else setConversationId('')
    } catch (error) {
      console.error('Error: ', error)
    }
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
    console.log('friends : ', friends)
  }, [friends])

  useEffect(() => {
    if (userRelation) {
      const tempFriends = friends
      userRelation.friends?.forEach(async (friendId, index) => {
        console.log('friendId: ', friendId)
        const user = await getUserByUid(friendId)
        if (user) {
          tempFriends.push(user)
        }
        if (index === userRelation.friends?.length - 1)
          setFriends([...tempFriends])
      })
    }
  }, [userRelation])

  return (
    <>
      <div className="chat-section">
        {!conversationId ? (
          <>
            <div className="chat-heading">Chat with friends</div>
            <div className="friend-result">
              {friends.length > 0 &&
                friends.map((friend: userType) => (
                  <Friend
                    friend={friend}
                    openChatWithFriend={openChatWithFriend}
                    isChat={true}
                  />
                ))}
            </div>
          </>
        ) : (
          <ChatWithFriendSection
            friend={chatFriend}
            conversationId={conversationId}
          />
        )}
      </div>
    </>
  )
}

export default ChatSection
