import React, { useState } from 'react';
import './UploadArea.css';
import UploadMode from './UploadMode/UploadMode';
import UploadFile from './UploadFile/UploadFile'; // Certifique-se que o caminho está correto
import GitHubArea from './GitHubArea/GitHubArea'; // Certifique-se que o caminho está correto

const UploadArea = () => {
  const [uploadType, setUploadType] = useState('file');
  const [selectedLocalFile, setSelectedLocalFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [markdownResult, setMarkdownResult] = useState('');

  // Função que será passada para UploadFile
  // Esta função será chamada pelo UploadFile quando um arquivo for selecionado ou removido
  const handleFileSelected = (file) => {
    setSelectedLocalFile(file);
    setUploadMessage(''); // Limpa mensagens anteriores
    setMarkdownResult(''); // Limpa resultado anterior ao selecionar novo arquivo
  };

  // Função para lidar com o envio (exemplo)
  const handleFinalUpload = async () => {
    if (uploadType !== 'file' || !selectedLocalFile) {
      alert("Nenhum arquivo .zip válido selecionado para upload.");
      return;
    }

    setIsUploading(true);
    setUploadMessage('Enviando arquivos...');
    setMarkdownResult('');

    const formData = new FormData(); 

    // Backend ira esperar 'zipfile' como nome do parametro
    formData.append('zipfile', selectedLocalFile, selectedLocalFile.name);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok){
        const markdownContent = result.markdownContent || result.content || result.text || '';
        console.log('Análise bem-sucedida:', markdownContent);
        setMarkdownResult(markdownContent); // Guarda o resultado Markdown
        setUploadMessage('Análise concluída com sucesso!');
      
      } else {
        const errorMessage = result.markdownContent || result.message || `Erro ${response.status}`;
        console.error('Falha na análise:', response.status, errorMessage);
        setUploadMessage(errorMessage);
      }
    } catch (error) {
      console.error('Erro de rede ou na requisição:', error);
      setUploadMessage(`Erro na comunicação: ${error.message}. Verifique a rede ou o servidor.`);
      setMarkdownResult('');
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className='upload-area-container'> {/* Usei um nome diferente para evitar conflito com a classe interna se houver */}
      <div className='upload-area'>
        {/* Componente para escolher o modo de upload */}
        <UploadMode
           onSelect={(type) => {
               setUploadType(type);
               setUploadMessage('');
               setSelectedLocalFile(null);
               setMarkdownResult(''); // Limpa resultado ao trocar de modo
           }}
           selected={uploadType}
        />

        {/* Renderiza condicionalmente a área de upload de arquivo */}
        {uploadType === 'file' && (
          // Passa o estado `isUploading` para desabilitar interação se necessário
          <UploadFile onFileSelect={handleFileSelected} />
        )}

        {uploadType === 'github' && (
          <GitHubArea />
        )},


        {/* Mensagem de Status/Erro/Sucesso */}
        {uploadMessage && (
            <div className={`upload-status-message ${uploadMessage.startsWith('Erro') ? 'error' : (markdownResult ? 'success' : 'info')}`}>
                {uploadMessage}
            </div>
         )}

        {uploadType === 'file' && (
           <div className='upload-actions'>
             <button
               onClick={handleFinalUpload}
               disabled={!selectedLocalFile || isUploading} // Desabilita se não houver arquivo ou se estiver enviando
               className='final-upload-button'
             >
               {isUploading ? 'Enviando...' : 'Gerar documentação'} {/* Texto dinâmico no botão */}
             </button>
           </div>
         )}

      </div>
    </div>
  );
}

export default UploadArea;