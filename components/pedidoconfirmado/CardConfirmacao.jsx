import React from 'react';



export default function CardConfirmacao({
    nome,
    email,
    total,
    cepEntrega,
    formaPagamento,
    
 }) {  
    return ( 
    
    
        <div className='bg-white  flex flex-col items-center  shadow-lg h-4/5 w-full'>
            <div className="text-start font-bold text-2xl mb-4">
					<h2>Pedido Confirmado</h2>
				</div> 

        <div className='bg-green-100 p-4 h-auto md:h-2/6 border border-green-400 w-auto md:w-2/4 rounded-sm'>
<strong><p className='text-green-800'>Seu pedido foi realizado com sucesso.</p></strong>
<p className='text-green-700'>Obrigado por comprar conosco <strong>Julian Reina</strong>. Em breve você receberá um email no 
endereço<strong> teste@hotmail.com </strong>  
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
        <p> ID: 1421</p>
        <p> Total: R$ 235,40</p>
        <p>Cep de entrega: 41810-105</p>
        <p>Forma de envio: Correios PAC</p>

        <br>
        </br>
        <p>*Os produtos serão enviados em até 2 dias após a confirmação do pagamento.</p>
        </div>


    </div>
    
    
    );
      
    
}