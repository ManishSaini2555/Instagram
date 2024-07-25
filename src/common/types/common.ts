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
}

export interface newPostType extends postTypeWithNewComment, userType {}
