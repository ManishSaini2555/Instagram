import React from 'react'
import './Footer.scss'
import { Copy } from '../../assets/images'

function Footer () {
  return (
    <footer className="footer">
      <div className="centerContainer">
        Copyright <img src={Copy} width={15} height={16} alt="avelo-logo" />{' '}
        Avelo Airlines 2023
      </div>
    </footer>
  )
}

export default Footer
