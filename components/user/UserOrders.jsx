"use client"
import React, { useEffect, useState, useTransition } from 'react';
import { getUserOrdersById, getOrderItemByOrderId} from '../../app/(website)/user/[id]/edit/actions';
import Link from 'next/link';
// import { Link } from 'lucide-react';

const OrdersPage = ({userId}) => {
  const [orders,setOrders] = useState([]);
  const [isPending,startTransition] = useTransition();

  useEffect(() => {
    if(!isPending){
      startTransition(async () => {
        const dataOrders = await getUserOrdersById(userId);
        
        dataOrders.map(async (data) => {
          data.orderItems = await getOrderItemByOrderId(data.id);
        })

        setOrders(dataOrders);
      })
    }
  },[])


  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Seus Pedidos</h1>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className='flex gap-x-5'>
              <th className="text-left">Order ID</th>
              <th className="text-left">Total</th>
              <th className="text-left">Status</th>
              <th className="text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              
                <tr key={order.id} className='flex gap-x-8'>
                  {/* //TODO mandar para a pagina de status de pedido */}
                  <Link key = {order.id} href = {`/statusPedido/${order.id}`}>
                    <td className="border p-2">{order.id}</td>
                    {/* <td>{order.orderItems}</td> */}
                    <td className="border p-2">{order.total}</td>
                    <td className="border p-2">{order.status}</td>
                    <td className="border p-2">{"Hoje"}</td>
                  </Link>
                 
                </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
