import React from 'react'
import UserLayout from '@src/layout/UserLayout'
import FriendsSection from '@src/components/friends/FriendsSection'

const Chat: React.FC<{}> = () => {
  return <UserLayout children={<FriendsSection />} />
}

export default Chat
