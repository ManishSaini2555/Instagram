import React from 'react'
import { toast } from 'react-toastify'
import { UserAuth } from '@src/context/AuthContext'
import AddImage from '../add-image/AddImage'
import { updateProfilePhoto } from '@src/functions/Profile'

interface ChangeProfileType {
  closeChangeProfile: React.Dispatch<React.SetStateAction<boolean>>
}
const ChangeProfile: React.FC<ChangeProfileType> = ({ closeChangeProfile }) => {
  const { user, setLoading } = UserAuth()

  const sharePost = async (img: File) => {
    try {
      setLoading(true)
      if (img) {
        await updateProfilePhoto('Profile Updated Successfully', img, user)
        closeChangeProfile(false)
      } else toast.error('Something went wrong, try again later')
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <AddImage
      closeAddImage={closeChangeProfile}
      onSubmit={sharePost}
      submitButtonText="Update"
      popUpHeading="Update Profile Photo"
    />
  )
}

export default ChangeProfile
