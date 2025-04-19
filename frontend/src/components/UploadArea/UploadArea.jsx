import React, { useState } from 'react';
import './UploadArea.css';
import UploadMode from './UploadMode/UploadMode';
import UploadFile from './UploadFile/UploadFile'; // Certifique-se que o caminho está correto
import GitHubArea from './GitHubArea/GitHubArea'; // Certifique-se que o caminho está correto

const UploadArea = () => {
  const [uploadType, setUploadType] = useState('file');
  const [selectedLocalFile, setSelectedLocalFile] = useState(null); // Estado para guardar o arquivo vindo do UploadFile

  // Função que será passada para UploadFile
  // Esta função será chamada pelo UploadFile quando um arquivo for selecionado ou removido
  const handleFileSelected = (file) => {
    console.log("Arquivo recebido/atualizado no UploadArea:", file);
    setSelectedLocalFile(file);
    // Aqui você pode adicionar lógica futura, como:
    // - Habilitar/desabilitar um botão de envio geral
    // - Preparar dados para um formulário, etc.
  };

  // Função para lidar com o envio (exemplo)
  const handleFinalUpload = () => {
    if (uploadType === 'file' && selectedLocalFile) {
      console.log("Enviando arquivo:", selectedLocalFile);
      // Lógica para fazer o upload do selectedLocalFile para o servidor
      alert(`Iniciando upload de ${selectedLocalFile.name}`);
    } else if (uploadType === 'github') {
      // Lógica para lidar com o envio do link do GitHub (que viria de GitHubArea)
      console.log("Enviando dados do GitHub...");
      alert("Lógica de envio do GitHub a ser implementada.");
    } else {
      alert("Nenhum arquivo ou método válido selecionado para upload.");
    }
  };


  return (
    <div className='upload-area-container'> {/* Usei um nome diferente para evitar conflito com a classe interna se houver */}
      <div className='upload-area'>
        {/* Componente para escolher o modo de upload */}
        <UploadMode onSelect={setUploadType} selected={uploadType} />

        {/* Renderiza condicionalmente a área de upload de arquivo */}
        {uploadType === 'file' && (
          <UploadFile
            // Passa a função handleFileSelected como prop para UploadFile
            // O nome da prop deve ser o mesmo que UploadFile espera (onFileSelect)
            onFileSelect={handleFileSelected}
          />
        )}

        {/* Renderiza condicionalmente a área de upload do GitHub */}
        {uploadType === 'github' && (
          <GitHubArea
            // Se GitHubArea precisar enviar dados para cá, use um padrão similar
            // onGitHubDataChange={handleGitHubData}
          />
        )}

         {/* Botão de Upload Geral (Exemplo) */}
         {/* Você pode habilitá-lo apenas quando um arquivo/link for válido */}
         {uploadType === "file" && 
          <div className='upload-actions'>
            <button
              onClick={handleFinalUpload}
              disabled={uploadType === 'file' && !selectedLocalFile /* Adicione outras condições de desabilitação se necessário */}
              className='final-upload-button'
            >
              Gerar documentação
            </button>
          </div>
         }

      </div>
    </div>
  );
}

export default UploadArea;