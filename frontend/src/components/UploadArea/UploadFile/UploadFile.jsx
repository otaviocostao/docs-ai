import React, { useCallback, useRef, useState } from 'react'
import './UploadFile.css'
import { BsUpload, BsFileEarmarkZip } from "react-icons/bs";
import BtnUpload from '../../ui/btnUpload/btnUpload';


const UploadFile = ({ onFileSelect }) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle para a seleção do arquivo
  const handleFile = useCallback((file) => {
    // -- Adicione esta linha para depuração --
    console.log("Arquivo recebido:", file?.name, "Tipo:", `"${file?.type}"`); // Veja o que o navegador está reportando!
  
    // Lista de MIME types aceitáveis para .zip
    const validZipTypes = [
      'application/zip',
      'application/x-zip-compressed',
      // Adicione 'application/octet-stream' com cautela, pois é genérico.
      // Pode ser necessário se outros tipos falharem consistentemente.
      'application/octet-stream'
    ];
  
    // Verifica se o arquivo existe e se o tipo dele está na lista de tipos válidos
    if (file && validZipTypes.includes(file.type)) {
      setSelectedFile(file);
      if (onFileSelect) {
        onFileSelect(file);
      }
      console.log("Arquivo .zip válido selecionado:", file);
    } else {
      // -- Mensagem de erro mais informativa --
      alert(`O arquivo "${file?.name}" não parece ser um .zip válido ou o tipo (${file?.type || 'desconhecido'}) não é reconhecido. Por favor, selecione um arquivo .zip.`);
      console.error("Falha na validação do tipo:", {
          name: file?.name,
          expected: validZipTypes.join(' ou '),
          received: file?.type
      });
      // Opcional: Limpar seleção se o tipo for inválido
      // setSelectedFile(null);
      // if (fileInputRef.current) { fileInputRef.current.value = ""; }
      // if (onFileSelect) { onFileSelect(null); }
    }
  }, [onFileSelect]); // Mantenha as dependências do useCallback

  //Abrir o explorador de arquivos
  const handleAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Para a seleção do arquivo no input
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      handleFile(event.target.files[0]);
    }
  };

  // Metodo para permitir o drop
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Reverte o estilo para sair do drop
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]){
      
      handleFile(event.dataTransfer.files[0]);

      if (event.dataTransfer.items) {
        event.dataTransfer.items.clear();

      }else{
        event.dataTransfer.clearData();
      }
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (onFileSelect) {
      onFileSelect(null);
    }
  }

  return (
    <div className='upload-file-area'>
      {/* Input de arquivo escondido */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Esconde o input
        accept=".zip" // Restringe para arquivos .zip no explorador
      />

      {/* Área de Upload/Drop */}
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
        onClick={!selectedFile ? handleAreaClick : undefined} // Permite clicar só se não houver arquivo
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button" // Indica que é clicável
        tabIndex={0} // Torna focável
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAreaClick(); }} // Permite ativar com teclado
      >
        {selectedFile ? (
          // Mostrar informações do arquivo selecionado
          <div className='file-info'>
             <div className='upload-icon-circle selected'>
                <BsFileEarmarkZip /> {/* Ícone de Zip */}
             </div>
             <p className='file-name'>{selectedFile.name}</p>
             <p className='file-size'>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
             <button onClick={(e) => {e.stopPropagation(); clearSelection();}} className="clear-button">
                Remover
             </button>
          </div>
        ) : (
          <>
            <div className='upload-icon-circle'>
              <BsUpload />
            </div>
            <h3 className='h3-upload'>Faça upload do arquivo</h3>
            <p className='paragraph-upload-zone'>Arraste e solte ou clique para selecionar o arquivo .zip</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
