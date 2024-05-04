import React, { ReactNode } from 'react'
import './BorderContainer.scss'

const BorderContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="border-container">{children}</div>
}

export default BorderContainer
