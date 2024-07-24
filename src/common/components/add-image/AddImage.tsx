import React, { useState } from 'react'
import './AddImage.scss'
import { BackIcon, CrossIcon } from '@src/assets/images'
import { toast } from 'react-toastify'

interface AddImageType {
  closeAddImage: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (img: File) => void
  submitButtonText: string
  popUpHeading: string
}
const AddImage: React.FC<AddImageType> = ({
  closeAddImage,
  onSubmit,
  submitButtonText,
  popUpHeading
}) => {
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

  return (
    <div className="add-image">
      <div className="cross-icon" onClick={() => closeAddImage(false)}>
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
            <div>{popUpHeading}</div>
            <div className="share" onClick={() => onSubmit(img)}>
              {submitButtonText}
            </div>
          </div>
        ) : (
          <div className="add-header">
            <div>{popUpHeading}</div>
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

export default AddImage
