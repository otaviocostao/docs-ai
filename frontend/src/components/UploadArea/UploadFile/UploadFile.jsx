import React from 'react'
import './UploadFile.css'
import { BsUpload } from "react-icons/bs";
import BtnUpload from '../../ui/btnUpload/btnUpload';


const UploadFile = () => {
  return (
    <div className='upload-file-area'>
      <div className='upload-zone'>
        <div className='upload-icon-circle'>
            <BsUpload />
        </div>
        <h3 className='h3-upload'>Faça upload do arquivo</h3>
        <p className='paragraph-upload-zone'>Arraste e solte o arquivo .zip do projeto aqui</p>
        <BtnUpload />
      </div>
    </div>
  )
}

export default UploadFile
