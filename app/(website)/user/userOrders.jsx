"use client"
import React, { useEffect, useState, useTransition } from 'react';
import { getUserOrdersById, getOrderItemByOrderId} from './actions';
import Link from "next/link"

const OrdersPage = ({userId, className}) => {
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
    <div className={`${className} container mx-auto mt-10`}>
      <h1 className="text-2xl font-bold mb-5">Seus Pedidos</h1>
        <table className="table-auto w-full">
          <thead className='bg-gray-200'>
            <tr>
              <th className="px-4 py-2 text-center">ID</th>
              <th className="px-4 py-2 text-center">Data</th>
              <th className="px-4 py-2 text-center">Total</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className='border-b'>
                <td className="px-4 py-2 text-center">{order.id}</td>
                <td className="px-4 py-2 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-center">{order.total}</td> 
                <td className="px-4 py-2 text-center">{order.status}</td>
                <td className="px-4 py-2 text-center">
                <Link key={order.id} href ={"/statusPedido/" + order.id}>
                  <button 
                    className="bg-black hover:bg-gray-950 text-white font-bold py-2 px-4 rounded"
                  >
                    Ver Pedido
                  </button>
                </Link>
               
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default OrdersPage;
