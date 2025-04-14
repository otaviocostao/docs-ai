import React from 'react'
import './UploadMode.css'
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { Github } from "lucide-react";

const UploadMode = () => {
  return (
    <div className='upload-mode-area'> 
      <button className='upload-arquivo'>
        <BsFileEarmarkArrowUp />
        <span>Upload do arquivo</span>
      </button>
      <button className='link-github'>
        <Github />
        <span>Repositório no GitHub</span>
      </button>
    </div>
  )
}

export default UploadMode
