export interface userType {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  uid: string
  profilePic: string
}

export interface postType {
  id: string
  timeStamp: string
  uid: string
  post: string
  like: string[]
  save: string[]
  comment: commentType[]
}

export interface postTypeWithNewComment {
  id: string
  timeStamp: string
  uid: string
  post: string
  like: string[]
  save: string[]
  comment: newCommentType[]
}

export interface commentType {
  uid: string
  value: string
  timeStamp: string
}

export interface newCommentType extends commentType {
  user: string
  profile: string
}

export interface newPostType extends postTypeWithNewComment, userType {}

export interface relationshipsType {
  id: string
  friends: string[]
  requestRecieved: string[]
  requestSent: string[]
}

export interface conversationType {
  id: string
  user1_id: string
  user2_id: string
  created_at: string
}

export interface messageType {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  message: string
  created_at: string
}
