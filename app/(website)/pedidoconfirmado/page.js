import React from 'react';

import CardConfirmacao from '@/components/pedidoconfirmado/CardConfirmacao';


export default async function Home() {
	let products = [
		{ id: 1, name: 'seila', price: 1 },
		{ id: 2, name: 'seila2', price: 2 },
		{ id: 3, name: 'seila3', price: 3 },
		{ id: 4, name: 'seila4', price: 5 },
	]

	

	return (
		<main>
			{
                <CardConfirmacao></CardConfirmacao>
                }
                </main>)}