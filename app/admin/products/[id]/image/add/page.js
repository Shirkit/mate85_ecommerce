'use client'
import { prisma } from '@/utils/prisma'
import { useState } from 'react';
import { queryProductById} from "../../../actions"
import { ref, uploadBytes } from '@firebase/storage';
import { storage } from '@/firebase';
import { FaCheck, FaTimes } from 'react-icons/fa';

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
        const storageRef = ref(storage, `1/${fileName}`);
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
      <div class="p-8 m-5 flex items-center justify-center w-full">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <div class="px-5 grid justify-items-center">
                <input  type="file" onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />
                <button class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" onClick={handleUpload}>
                  Enviar Imagem
                </button>
              </div>
          </label>
          {error && <div style={{ color: 'red' }}>{error}</div>}
      </div> 
  );
}