import React from 'react'
import './StepsSection.css'
import { BsFileEarmarkArrowUp, BsFiletypeMd, BsLightningCharge  } from "react-icons/bs";

const StepsSection = () => {
  return (
    <div className='steps-section-area'>
        <div className='step-upload'>
            <div className='upload-step-icon'>
                <BsFileEarmarkArrowUp />
            </div>
            <h3 className='h3-steps'>Faça upload do projeto</h3>
            <p className='paragraph-steps'>Arraste e solte o arquivo .zip do projeto para iniciar</p>
        </div>
        <div className='step-ai-analysis'>
            <div className='ai-step-icon'>
                <BsLightningCharge  />
            </div>
            <h3 className='h3-steps'>Analise da IA</h3>
            <p className='paragraph-steps'>Nossa IA irá analisar a estrutura do seu código, dependências e modelos</p>
        </div>
        <div className='step-get-documentation'>
            <div className='documentation-step-icon'>
                <BsFiletypeMd  />
            </div>
            <h3 className='h3-steps'>Baixe sua documentação</h3>
            <p className='paragraph-steps'>Receba um arquivo MarkDown pronto para usar no seu repositório</p>
        </div>
    </div>
  )
}

export default StepsSection
