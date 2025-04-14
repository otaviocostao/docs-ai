import React, { useState } from 'react'
import './UploadArea.css'
import UploadMode from './UploadMode/UploadMode'
import UploadFile from './UploadFile/UploadFile'
import GitHubArea from './GitHubArea/GitHubArea'

const UploadArea = () => {
  const [uploadType, setUploadType] = useState('file');

  return (
    
    <div className='upload-area'>
      <UploadMode onSelect={setUploadType} selected={uploadType} />
      {uploadType === 'file' && <UploadFile />}
      {uploadType === 'github' && <GitHubArea />}
    </div>
  )
}

export default UploadArea
