import React from 'react'
import './MarkdownPreviewContent.css'
import { BsCopy, BsDownload  } from "react-icons/bs";

const MarkdownPreviewContent = () => {
  return (
    <div className='markdownpreview-area'>
      <div className='markdown-content'>
        <div className='markdownarea-header'>
          <span>
            README.md
          </span>
          <div className='copy-download-area'>
            <button className='button-copy'><BsCopy /></button>
            <button className='button-download'><BsDownload /></button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default MarkdownPreviewContent
