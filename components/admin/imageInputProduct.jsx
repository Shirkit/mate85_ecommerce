
import React, { useState, useEffect } from 'react';
import styles from '@/components/admin/produtoInput.module.css';

function ImageInput({ onImageUpload, imagem, index }) {
  const [image, setImage] = useState(imagem);

  useEffect(() => {
    // Verifique se a imagem foi atualizada
    if (imagem !== image) {
      setImage(imagem);
    }
  }, [imagem, image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        onImageUpload(reader.result, index);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.containerNovoProdutoImg}>
      <div className="w-full h-40 object-cover mb-2">
        {image ? (
          <img className={styles.imgProduto} src={image} alt="Imagem do Produto" />
        ) : (
          <div className="image-placeholder">Imagem Vazia</div>
        )}
        <input className={styles.inputImg} type="file" accept="image/*" onChange={handleImageChange} />
      </div>
    </div>
  );
}

export default ImageInput;
