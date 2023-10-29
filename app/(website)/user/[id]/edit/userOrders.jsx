"use client"
import React, { useEffect, useState, useTransition } from 'react';
import { getUserOrdersById, getOrderItemByOrderId} from './actions';

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
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className='flex gap-x-8'>
                <td>{order.id}</td>
                {/* <td>{order.orderItems}</td> */}
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
