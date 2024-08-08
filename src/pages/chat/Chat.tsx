import React from 'react'
import UserLayout from '@src/layout/UserLayout'
import ChatSection from '@src/components/chat-section/ChatSection'

const Chat: React.FC<{}> = () => {
  return <UserLayout children={<ChatSection />} />
}

export default Chat
