import React from 'react'
import './UploadArea.css'
import UploadMode from './UploadMode/UploadMode'
import UploadFile from './UploadFile/UploadFile'

const UploadArea = () => {
  return (
    <div className='upload-area'>
      <UploadMode />
      <UploadFile />
    </div>
  )
}

export default UploadArea
