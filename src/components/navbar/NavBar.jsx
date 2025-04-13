import React from 'react'
import './NavBar.css'
import BtnGithub from '../ui/btnGithub/BtnGithub'
import Icon from '../../assets/icon.svg'

const NavBar = () => {
  return (
    <header className='header-area'>
        <div className='navbar-content'>
            <div className='docsai-logo'>
              <img src={Icon} />
              <h2 className='docsai-name'>DocsAI</h2>
            </div>
            <BtnGithub />
        </div>
    </header>
  )
}

export default NavBar