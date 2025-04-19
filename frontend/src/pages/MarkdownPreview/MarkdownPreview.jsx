import React from 'react';
import FooterArea from '../../components/FooterArea/FooterArea'
import NavBar from '../../components/navbar/NavBar'
import './MarkdownPreview.css';
import MarkdownPreviewContent from '../../components/MarkdownPreviewContent/MarkdownPreviewContent';

const MarkdownPreview = () => {

  return (
    <div className="preview-container">
        <NavBar />
        <MarkdownPreviewContent />
    </div>
  );
};

export default MarkdownPreview;