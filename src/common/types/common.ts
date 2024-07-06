export interface userType {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  uid: string
}

export interface postType {
  id: string
  timeStamp: string
  uid: string
  post: string
  like: string[]
  comment: commentType[]
}

export interface commentType {
  uid: string
  value: string
}

export interface newPostType extends postType, userType {}
