import React from 'react'
import './NavBar.css'
import Icon from '../../assets/icon.svg'
import BtnLogin from '../ui/BtnLogin/BtnLogin'

const NavBar = () => {
  return (
    <header className='header-area'>
        <div className='navbar-content'>
            <div className='docsai-logo'>
              <img src={Icon} />
              <h2 className='docsai-name'>DocsAI</h2>
            </div>
            <BtnLogin />
        </div>
    </header>
  )
}

export default NavBar