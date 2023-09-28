'use server'

export default async function CardConfirmacao(props) {
    const pedido = props.pedido;
    
    const produtos = pedido.order_items;
    const user = pedido.user;  
    const adress = pedido.address;

  
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
        <br></br>
        <p> Numero do pedido: {pedido.order_number}</p>
        <br></br>
        <div className='flex justify-center bg-black text-white'>Items</div>
        
        <table className='border-collapse w-full h-full'>
        <thead className="border-2 border-solid border-grey-300 p-2 text-justify">
            
        <tr>
          <th>Produto</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody className="border-2 border-solid border-grey-200 p-4 text-justify">

        {produtos.map(produto => (
            <tr className="border-2 border-solid border-grey-200 p-4 text-justify" key={produto.products_id}>
            <td>{produto.product.name} x 1</td> 
            <td>R${produto.price}</td>
          </tr>
    
        ))}

        
         <br></br>
        <p> Total: <strong>R${pedido.total}</strong></p>
        </tbody>
        </table>
       
        <br>
        </br>
        <p>*Os produtos serão enviados em até 2 dias após a confirmação do pagamento.</p>
        </div>
        <div className=' p-4 h-auto md:h-2/6 border border-black w-auto md:w-2/4 rounded-sm '>
        <h4 className='font-bold'>Informações de Cobrança</h4>

     <p>{user.name}</p>
     <p>Cep: {adress[0].zip_code}</p>
     <p>{adress[0].street} {adress[0].number} {adress[0].complement} {adress[0].neighborhood}</p>
     <p>{adress[0].complemente2} {adress[0].city} - {adress[0].state}</p>
     <p>{adress[0].country}</p>
        {/*Adicionar campos de endereço*/}
        </div>

    </div>
    
    
    );
      
    
}