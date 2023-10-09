

import React from 'react';
import styles from '@/components/admin/produtoInput.module.css'

function ProdutoInput({
  nome,
  cor,
  categoria,
  tamanho,
  valor,
  onNomeChange,
  onCorChange,
  onCategoriaChange,
  onTamanhoChange,
  onValorChange,
}) {
  return (
    <div className={styles.containerNovoProdutoInput}>
      <div className={styles.ProdutoInput}>
        <label htmlFor="nome"><strong>Nome do Produto:</strong></label>&nbsp;
        <input
          type="text"
          id="nome"
          value={nome}
          placeholder='Insira o nome do produto'
          required
          onChange={(e) => onNomeChange(e.target.value)}
        />
        <div>
          <label htmlFor="cor"><strong>Cor:</strong></label>&nbsp;
          <input
            type="text"
            id="cor"
            value={cor}
            placeholder='Insira a cor do produto'
            required
            onChange={(e) => onCorChange(e.target.value)}
          />

        </div>

        <label htmlFor="categoria"><strong>Categoria:</strong></label>
        <select id="categoria" value={categoria} required onChange={(e) => onCategoriaChange(e.target.value)}>
          <option value='1' >Escolha a categoria:</option>
          {/* Opções da categoria */}
        </select>

        <div>
          <label htmlFor="tamanho"><strong>Tamanho:</strong> </label>
          <select id="tamanho" value={tamanho} required onChange={(e) => onTamanhoChange(e.target.value)}>
            <option value="1">Escolha o tamanho:</option>
            {/*consultar no banco ou definir estatico*/}
          </select>
        </div>
        <div>
          <label htmlFor="valor"><strong>Valor em Reais:</strong></label>&nbsp;
          <input
            type="number"
            id="valor"
            value={valor}
            required
            placeholder='Digite o valor do produto em reais'
            onChange={(e) => onValorChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProdutoInput;
