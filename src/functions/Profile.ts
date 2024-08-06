import { toast } from 'react-toastify'
import { storage } from '@src/firebase/fire'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { updateData } from './helper'
import { TableNameEnum } from '@src/common/constants/constants'

export const updateProfilePhoto = async (
  updateMessage: string,
  image: File,
  user: any
) => {
  try {
    const imageRef = ref(storage, `profile/${v4()}`)
    const snapshot = await uploadBytes(imageRef, image)
    const url = await getDownloadURL(snapshot.ref)
    await updateData(
      TableNameEnum.USERS,
      { ...user, profilePic: url },
      user.uid
    )
    toast.success(updateMessage)
  } catch (err: any) {
    toast.error(err?.message)
  }
}
