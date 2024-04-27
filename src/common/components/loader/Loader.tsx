import React from 'react'
import './Loader.scss'
import { SpinnerGif } from '@images'
const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <img src={SpinnerGif} className="loader" />
      </div>
    </>
  )
}

export default Loader
