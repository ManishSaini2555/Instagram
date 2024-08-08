import React, { useEffect, useState } from 'react'
import './ChatWithFriend.scss'
import { UserAuth } from '@src/context/AuthContext'
import { messageType, userType } from '@src/common/types'
import { SendIcon } from '@src/assets/images'
import { v4 } from 'uuid'
import { getMessages, sendMessageData } from '@src/functions/Chat'
import { detectChanges } from '@src/functions/helper'
import { TableNameEnum } from '@src/common/constants/constants'

interface ChatWithFriendType {
  conversationId: string
  friend: userType
}
const ChatWithFriendSection: React.FC<ChatWithFriendType> = ({
  conversationId,
  friend
}) => {
  const { user } = UserAuth()
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<messageType[]>([])
  const [scrollHeight, setScrollHeight] = useState<number>(0)

  const sendMessage = async () => {
    const messagePayload: messageType = {
      id: v4(),
      conversation_id: conversationId,
      sender_id: user?.uid,
      receiver_id: friend?.uid,
      message,
      created_at: new Date().toISOString()
    }
    await sendMessageData(messagePayload)
    setMessage('')
  }

  const setMessagesData = async () => {
    const data = await getMessages(conversationId)
    if (data) {
      setMessages(data)
      const elements = document.querySelectorAll(
        '.chat-window .message-content'
      )
      const lastElement = elements[elements.length - 1]
      lastElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const resizeEventListener = () => {
    const height =
      document.getElementsByClassName('chat-window')[0]?.clientHeight
    if (height) setScrollHeight(height)
  }

  useEffect(() => {
    detectChanges(TableNameEnum.MESSAGES, setMessagesData)
    resizeEventListener()
    window.addEventListener('resize', resizeEventListener)
    return () => {
      window.removeEventListener('resize', resizeEventListener)
    }
  }, [])

  return (
    <>
      <div className="chat-with-friend-section">
        <div className="heading">
          <span className="user-image">
            <img src={friend?.profilePic} alt="" />
          </span>
          <span>{`${friend?.firstName} ${friend?.lastName}`}</span>
        </div>
        <div className="chat-window">
          <div
            className="message-section"
            style={{ maxHeight: scrollHeight && `${scrollHeight}px` }}
          >
            {messages.map((message: messageType) => (
              <div
                key={message.id}
                className={
                  message.sender_id === user?.uid
                    ? 'sender-message'
                    : 'receiver-message'
                }
              >
                <span className="message-content">{message.message}</span>
              </div>
            ))}
          </div>
          <div className="text-field">
            <input
              type="text"
              placeholder="Search"
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={(e) => e.key === 'Enter' && message && sendMessage()}
            />
            <img
              src={SendIcon}
              alt="send icon"
              height={50}
              width={50}
              onClick={message ? sendMessage : () => {}}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatWithFriendSection
