import React from 'react'
import './BtnGithub.css'
import { Github } from "lucide-react";

const BtnGithub = () => {
  return (
    <div className='area-btngit'>
        <a className='a-btn' href='https://github.com/'>
          <div className='btnGithub'>
                <Github />
                <span>GitHub</span>
          </div>
            </a>
    </div>
  )
}

export default BtnGithub