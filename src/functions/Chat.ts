import { toast } from 'react-toastify'
import {
  createData,
  readDataWithAndQuery,
  readDataWithSimpleQuery
} from './helper'
import { TableNameEnum } from '@src/common/constants/constants'
import { messageType } from '@src/common/types'

export const getConversationId = async (userId: string, friendId: string) => {
  try {
    const data = await readDataWithAndQuery(
      TableNameEnum.CONVERSATIONS,
      'user1_id',
      'in',
      [userId, friendId],
      'user2_id',
      'in',
      [userId, friendId]
    )
    if (data && data.length) {
      return data
    } else {
      console.log('No document exists for conversation !!')
    }
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const sendMessageData = async (data: messageType) => {
  try {
    await createData(TableNameEnum.MESSAGES, data)
  } catch (err: any) {
    toast.error(err?.message)
  }
}

export const getMessages = async (conversationId: string) => {
  try {
    const messages = await readDataWithSimpleQuery(
      TableNameEnum.MESSAGES,
      'conversation_id',
      '==',
      conversationId
    )
    if (messages && messages.length) {
      return messages.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      })
    } else {
      console.log('No chat history !!')
    }
  } catch (err: any) {
    toast.error(err?.message)
  }
}
