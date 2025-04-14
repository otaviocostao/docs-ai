import React from 'react'
import './btnUpload.css'
import { BsUpload } from "react-icons/bs";

const BtnUpload = () => {
  return (
    <div className='btn-upload-content'>
      <BsUpload />
      <span>Selecionar arquivo</span>
    </div>
  )
}

export default BtnUpload
