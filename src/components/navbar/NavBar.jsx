import React from 'react'
import './NavBar.css'
import BtnGithub from '../ui/btnGithub/BtnGithub'


const NavBar = () => {
  return (
    <header className='header-area'>
        <div className='navbar-content'>
            <h2 className='docsai-name'>DocsAI</h2>
            <BtnGithub />
        </div>
    </header>
  )
}

export default NavBar