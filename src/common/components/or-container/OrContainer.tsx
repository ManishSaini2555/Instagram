import React from 'react'
import './OrContainer.scss'

const OrContainer: React.FC<{ noSpace?: boolean }> = ({ noSpace }) => {
  return (
    <div className={noSpace ? 'or-container noSpace' : 'or-container'}>
      <div className="divider"></div>
      <div>OR</div>
      <div className="divider"></div>
    </div>
  )
}

export default OrContainer
