import React from 'react';



export default function CardConfirmacao(props) {
    const pedido = props.pedido;
    const produtos = pedido.order_items;
    const user = pedido.user;  
    return ( 
    
    
        <div className='bg-white  flex flex-col items-center  shadow-lg h-4/5 w-full'>
            <div className="text-start font-bold text-2xl mb-4">
					<h2>Pedido Confirmado</h2>
				</div> 

        <div className='bg-green-100 p-4 h-auto md:h-2/6 border border-green-400 w-auto md:w-2/4 rounded-sm'>
<strong><p className='text-green-800'>Seu pedido foi realizado com sucesso.</p></strong>
<p className='text-green-700'>Obrigado por comprar conosco <strong>{user.name}</strong>. Em breve você receberá um email no 
endereço<strong> {user.email} </strong>  
 com todos os detalhes do pedido
</p>
<div className='flex items-center bg-green-500 h-auto md:h-2/6 border border-green-400 w-auto md:w-full mt-8'>
    <p className='text-green-50'><strong>✅ Pagamento Aprovado </strong></p>
    

</div>
        </div>
        <br>
        </br>

        <div className=' p-4 h-auto md:h-2/6 border border-black w-auto md:w-2/4 rounded-sm '>
        <h4 className='font-bold'>Informações Do Pedido</h4>
        <p> Numero do pedido: {pedido.order_number}</p>
        <div className='flex justify-center bg-black text-white'>Items</div>
        <table className='border-collapse'>
        <thead>
            
        <tr>
          <th>Produto</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>

        {/* {produtos.forEach(produto => {
            <tr key={produto.id}>
            <td>{produto.produto.nome} x 1</td> 
            <td>R${produto.produto.preco}</td>
          </tr>
    
        })} */}

        {/*Adicionar estilização de tabela*/}
        <tr>
            <td>azul</td>
            <td>quente</td>
        </tr>
        <tr>
            <td>azul x1</td>
            <td>quente </td>
        </tr>
        <tr>
            <td>azul</td>
            <td>quente</td>
        </tr>
        
        <p> Total: R${pedido.total}</p>
        </tbody>
        </table>
        <br>
        </br>
        <p>*Os produtos serão enviados em até 2 dias após a confirmação do pagamento.</p>
        </div>
        <div className=' p-4 h-auto md:h-2/6 border border-black w-auto md:w-2/4 rounded-sm '>
        <h4 className='font-bold'>Informações de Cobrança</h4>
        {/*Adicionar campos de endereço*/}
        </div>

    </div>
    
    
    );
      
    
}