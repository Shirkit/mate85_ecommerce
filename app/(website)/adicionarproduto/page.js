 'use client'
 
import React, { useState } from 'react';
import ProdutoInput from '@/components/admin/produtoInput';
import ImageInput from '@/components/admin/imageInputProduct';
import styles from '@/components/admin/produtoInput.module.css';

const AdicionarProduto = () => {
  const [produtos, setProdutos] = useState([
    {
      nome: '',
      cor: '',
      categoria: '',
      tamanho: '',
      valor: 0,
      imagem: null,
      
    },
  ]);
  const [totalProdutos, setTotalProdutos] = useState(produtos.length);

  const handleNomeChange = (nome, index) => {
    const newProdutos = [...produtos];
    newProdutos[index] = { ...newProdutos[index], nome };
    setProdutos(newProdutos);
    
    
  };
  const handleCorChange = (cor, index) => {
    const newProdutos = [...produtos];
    newProdutos[index] = { ...newProdutos[index], cor };
    setProdutos(newProdutos);
  };

  const handleCategoriaChange = (categoria, index) => {
    const newProdutos = [...produtos];
    newProdutos[index] = { ...newProdutos[index], categoria };
    setProdutos(newProdutos);
  };

  const handleTamanhoChange = (tamanho, index) => {
    const newProdutos = [...produtos];
    newProdutos[index] = { ...newProdutos[index], tamanho };
    setProdutos(newProdutos);
  };

  const handleValorChange = (valor, index) => {
    const newProdutos = [...produtos];
    newProdutos[index] = { ...newProdutos[index], valor };
    setProdutos(newProdutos);
  };

  const handleImageUpload = (file, index) => {
    const newProdutos = [...produtos];
    newProdutos[index] = { ...newProdutos[index], imagem: file };
    setProdutos(newProdutos);
    
  };

  const adicionarNovoProduto = () => {
    setProdutos([
      ...produtos,
      {
        nome: '',
        cor: '',
        categoria: '',
        tamanho: '',
        valor: 0,
        imagem: null,
      },
    ]);
    console.log(produtos);
    setTotalProdutos(produtos.length +1);
  };

  const removerProduto = (index) => {
    const newProdutos = [...produtos];
    newProdutos.splice(index, 1);
    setProdutos(newProdutos);
    console.log(produtos);
    setTotalProdutos(produtos.length -1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Produtos:', produtos);
  };

  return (
    <div>
      <h1>Novos Produtos</h1>
      <form onSubmit={handleSubmit}>
      
        {produtos.map((produto, index) => (
          <div key={index} id={`produto-${index}`} className={styles.containerNovoProduto}>
            <h1><strong>Produto {index + 1}</strong></h1>
            <ImageInput
              onImageUpload={(file) => handleImageUpload(file, index)}
              imagem={produto.imagem}
              index={index}
              
            />
           
            <ProdutoInput
              nome={produto.nome}
              cor={produto.cor}
              categoria={produto.categoria}
              tamanho={produto.tamanho}
              valor={produto.valor}
              onNomeChange={(nome) => handleNomeChange(nome, index)}
              onCorChange={(cor) => handleCorChange(cor, index)}
              onCategoriaChange={(categoria) => handleCategoriaChange(categoria, index)}
              onTamanhoChange={(tamanho) => handleTamanhoChange(tamanho, index)}
              onValorChange={(valor) => handleValorChange(valor, index)}
            />
            <button onClick={() => removerProduto(index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></svg></button>
          </div>
        ))}
        <div className={styles.adicionarMaisProdutos}>
          <button onClick={adicionarNovoProduto}>
            Adicionar mais produto
          </button>
        </div>
        <br></br><br></br><br></br>
<div >
  
  <h2>Confirmação de novos produtos</h2>
  <br></br>
  <div >
  <p>Novos produtos adicionados: <strong>{totalProdutos}</strong></p>
</div>
</div>
<br></br>
        <button className={styles.btnEnviarProdutos}type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default AdicionarProduto;
