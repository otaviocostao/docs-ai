import React from 'react';
import './GitHubArea.css';
import BtnGithub from '../../ui/btnGithub/BtnGithub';
import BtnGenDoc from '../../ui/BtnGenDoc/BtnGenDoc';

const GitHubArea = () => {
  return (
    <div className='github-area'>
        <form className='github-area-content'>
              <div className='label-button-area'>
                <label>URL do repositório no GitHub:</label>
                <BtnGithub />
              </div>
              <input type="text" id='repository-url' />
            <BtnGenDoc />
        </form>
    </div>
  )
}

export default GitHubArea
