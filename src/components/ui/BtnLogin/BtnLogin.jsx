import React, { useState } from 'react'
import './BtnLogin.css'
import LoginModal from '../../LoginModal/LoginModal';

const BtnLogin = () => {
  
  return (
    <a className='area-btnlogin' href='/login'>
            <button className='btn-login'>
                <span>Login</span>
            </button>
    </a>
  )
}

export default BtnLogin
