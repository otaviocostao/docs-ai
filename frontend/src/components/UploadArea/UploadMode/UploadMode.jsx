import React from 'react'
import './UploadMode.css'
import { BsFileEarmarkArrowUp, BsGithub } from "react-icons/bs";

const UploadMode = ({onSelect, selected}) => {
  return (
    <div className='upload-mode-area'> 
      <button className={`upload-arquivo ${selected === 'file' ? 'ativo' : ''}`} onClick={() => onSelect('file')}>
        <BsFileEarmarkArrowUp />
        <span>Upload do arquivo</span>
      </button>
      <button className={`link-github ${selected === 'github' ? 'ativo' : ''}`} onClick={() => onSelect('github')}>
        <BsGithub />
        <span>Repositório no GitHub</span>
      </button>
    </div>
  )
}

export default UploadMode
