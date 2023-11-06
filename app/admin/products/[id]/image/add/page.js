'use client'
// import { prisma } from '@/utils/prisma'
import { useState } from 'react';
import { ref, uploadBytes } from '@firebase/storage';
import { storage } from '@/firebase';

export default function UploadImagePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError(null); // Limpe quaisquer erros anteriores.
  };
  
  const uploadImage = async (formData) => {
    try {
      if (selectedFile) {
        console.log(storage);
        const file = formData.get('file');
        const fileName = file.name;
        const storageRef = ref(storage, `images/${fileName}`);
        await uploadBytes(storageRef, file);
        console.log('Imagem enviada com sucesso.');
      } else {
        setError('Nenhum arquivo selecionado.');
      }
    } catch (error) {
      setError('Erro ao enviar imagem: ' + error.message);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      await uploadImage(formData);
    } else {
      setError('Nenhum arquivo selecionado.');
    }
  };

  return (
    <div>
      <form encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload}>
          Enviar Imagem
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}