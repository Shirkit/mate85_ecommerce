'use server'
import React from "react";

export default async function CardConfirmacao(props) {
  const pedido = props.pedido;

  const produtos = pedido.order_items;
  const user = pedido.user;
  const adress = pedido.address;


  return (


    <div className='bg-white  flex flex-col items-center  shadow-lg h-4/5 w-full'>

      {pedido.status === "completed" ? (
        <React.Fragment>
          <div className="text-start font-bold text-2xl mb-4">
            <h2>Pedido Confirmado</h2>
          </div>

          <div className='bg-green-100 p-4 h-auto md:h-2/6 border border-green-400 w-auto md:w-2/4 rounded-sm'>
            <p className='text-green-800'><strong>Seu pedido foi realizado com sucesso.</strong></p>
            <p className='text-green-700'>Obrigado por comprar conosco <strong>{user.name}</strong>. Em breve você receberá um email no
              endereço<strong> {user.email} </strong>
              com todos os detalhes do pedido
            </p>
            <div className='flex items-center bg-green-500 h-auto md:h-2/6 border border-green-400 w-auto md:w-full mt-8'>
              <p className='text-green-50'><strong>✅ Pagamento Aprovado </strong></p>


            </div>
          </div>
        </React.Fragment>) : pedido.status === "waiting" ? (<React.Fragment>
          <div className="text-start font-bold text-2xl mb-4">
            <h2>Pedido Confirmado</h2>
          </div>

          <div className='bg-yellow-100 p-4 h-auto md:h-2/6 border border-yellow-400 w-auto md:w-2/4 rounded-sm'>
            <p className='text-yellow-800'><strong>Seu pedido foi realizado com sucesso.</strong></p>
            <p className='text-yellow-700'>Obrigado por comprar conosco <strong>{user.name}</strong>.<br></br>
              Seu pedido está aguardando pagamento. Após a confirmação, começaremos a
              preparar sua compra com carinho. <br></br><br></br> Agradecemos por escolher a nossa loja!
              Em breve você receberá um email no
              endereço<strong> {user.email} </strong>
              com todos os detalhes do pedido
            </p>
            <div className='flex items-center bg-yellow-500 h-auto md:h-2/6 border border-yellow-400 w-auto md:w-full mt-8'>
              <p className='text-green-50'><strong>⏳ Aguardando Pagamento </strong></p>


            </div>
          </div>
        </React.Fragment>) : pedido.status === "payment-pending" ? (<React.Fragment>
          <div className="text-start font-bold text-2xl mb-4">
            <h2>Pedido Cancelado</h2>
          </div>

          <div className='bg-red-100 p-4 h-auto md:h-2/6 border border-red-400 w-auto md:w-2/4 rounded-sm'>
            <p className='text-red-800'> <strong>Pagamento não aprovado.</strong></p><br></br>
            <p className='text-red-700'>Prezado <strong>{user.name}</strong>,<br>
            </br><br></br> Lamentamos informar que seu pedido foi cancelado devido à não aprovação do pagamento.<br></br>
              Entendemos que imprevistos podem ocorrer, e lamentamos qualquer inconveniente que isso possa ter causado.
              Se desejar, você pode verificar o status do seu pagamento e tentar novamente, ou entrar
              em contato conosco para obter assistência adicional.<br></br><br></br>
              Agradecemos o seu interesse em fazer compras conosco e esperamos poder atendê-lo melhor em uma futura oportunidade.
              Se precisar de qualquer esclarecimento ou assistência, não hesite em nos contatar. Estamos à disposição para ajudá-lo.
            </p>
            <div className='flex items-center bg-red-500 h-auto md:h-2/6 border border-red-400 w-auto md:w-full mt-8'>
              <p className='text-red-50'><strong>🚫 Pagamento Recusado </strong></p>


            </div>
          </div>
        </React.Fragment>) : null}


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



          </tbody>
        </table>
        <br></br>
        <div> Total: <strong>R${pedido.total}</strong></div>

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