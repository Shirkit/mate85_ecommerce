
import React from 'react';

import CardConfirmacao from '@/components/pedidoconfirmado/CardConfirmacao';


export default async function PedidoConfirmado(params) {


	const pedido = await prisma.order.findFirst({ where: { id: params.id }, include: {user: true, address:true, order_items: {
		include: {
		  product: true, 
		},
	  },},});

	

	return (
		<main>
			{
                <CardConfirmacao pedido={pedido}></CardConfirmacao>
                }
                </main>)}
				