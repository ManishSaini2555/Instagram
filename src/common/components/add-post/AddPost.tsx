import React, { useState } from 'react'
import './AddPost.scss'
import { BackIcon, CrossIcon } from '@src/assets/images'
import { createNewPost } from '@src/functions/Posts'
import { postType } from '@src/common/types'
import { toast } from 'react-toastify'
import { UserAuth } from '@src/context/AuthContext'

const AddPost: React.FC<{ closeAddPost: any }> = ({ closeAddPost }) => {
  const { user, setLoading } = UserAuth()
  const [preview, setPreview] = useState(null)
  const [img, setImg] = useState<File>()
  const selectFile = () => {
    document.getElementById('input')?.click()
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event?.target?.files?.length
      ? event?.target?.files[0]
      : ''
    if (selectedFile) setImg(selectedFile)
    if (selectedFile?.size > 5000000) {
      toast.warning('Cannot select file more than 5mb')
      return
    }

    // For previewing the image (if it's an image file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader?.result)
    }
    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }
  }

  const sharePost = async () => {
    try {
      setLoading(true)
      const postData: postType = {
        id: '',
        uid: user?.uid,
        post: '',
        like: [],
        comment: [],
        timeStamp: new Date().toISOString()
      }
      if (img) {
        await createNewPost(postData, img)
        closeAddPost(false)
      } else toast.error('Something went wrong, try again later')
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <div className="add-post">
      <div className="cross-icon" onClick={() => closeAddPost(false)}>
        <img src={CrossIcon} height={30} />
      </div>
      <div className="main-add-post">
        {preview ? (
          <div className="add-header second">
            <img
              src={BackIcon}
              onClick={() => setPreview(null)}
              width={25}
              className="back-icon"
            />
            <div>Create new post</div>
            <div className="share" onClick={() => sharePost()}>
              Share
            </div>
          </div>
        ) : (
          <div className="add-header">
            <div>Create new post</div>
          </div>
        )}
        <div className="add-container">
          <input
            id="input"
            type="file"
            accept="image/*"
            multiple={false}
            onChange={handleFileChange}
          />
          {preview && (
            <div className="preview-container">
              <img src={preview} alt="File preview" />
            </div>
          )}
          {!preview && (
            <button className="add-file-btn" onClick={selectFile}>
              Select form computer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddPost
