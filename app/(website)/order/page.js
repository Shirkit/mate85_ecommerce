'use client';

import React, { useState } from 'react'
import ProductList from '@/components/ui/order/productList';
import RadioButton from '@/components/ui/order/radioButton';
import { CreditCardIcon } from "lucide-react";

const CheckoutPage = () => {
    const paymentOptions = [
        { label: 'Pix', icon: <CreditCardIcon />, description: 'Pague com Pix a qualquer momento!' },
        { label: 'Cartão de Crédito', icon: <CreditCardIcon />, },
        { label: 'Boleto Bancário', icon: <CreditCardIcon />, },
    ]

    const [selectedOption, setSelectedOption] = useState(paymentOptions[0].label)

    const onValueChange = (event) => {
        setSelectedOption(event.currentTarget.value)
    }

    const cart = {
        cartItems: [
            {
                quantity: 1,
                product: {
                    id: 1, name: 'seila', price: 1,
                },
            },
            {
                quantity: 1,
                product: {
                    id: 2, name: 'seila2', price: 2,
                },
            },
            {
                quantity: 1,
                product: {
                    id: 3, name: 'seila3', price: 3,
                },
            },
            {
                quantity: 1,
                product: {
                    id: 4, name: 'seila4', price: 5,
                }
            }
        ],
        cartTotal: 11,
    };

    const address = {
        "id": 331,
        "users_id": "ff8eda38-a707-4013-91cb-c5e514dce984",
        "orders_id": null,
        "type": "billing",
        "street": "Melrose",
        "number": "[object Undefined]",
        "complement": "Room 50",
        "neighborhood": "Junction",
        "city": "Conceiçăo do Tocantins",
        "state": "Ceará",
        "country": "Brasil",
        "zip_code": "07147-928",
        "complement2": "Suite 79"
    }

    return (
        <>
            <div className="text-center font-bold text-2xl mb-4 mt-4">
                <h2>Revise seu Pedido</h2>
            </div>
            <div className="max-w-screen-xl mx-auto flex p-4">
                <div className="w-3/4">
                    {/* Shipping Address Div */}
                    <div className="mb-4">
                        <div className="bg-white p-4 rounded shadow">

                            <h2 className="text-lg font-semibold mb-2">Endereço de Entrega</h2>

                            <p>Nome do Indivíduo</p>
                            <p>{address.zip_code}</p>
                            <p>{address.street} {address.complement} {address.neighborhood}</p>
                            <p>{address.complement2} {address.city} - {address.state}</p>
                            <p>{address.country}</p>
                        </div>
                    </div>

                    {/* Payment Methods Div */}
                    <div className="mb-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold mb-2">Métodos de Pagamento</h2>

                            {paymentOptions.map((option, index) => {
                                return (
                                    <RadioButton
                                        key={index}
                                        icon={option.icon}
                                        label={option.label}
                                        description={option.description}
                                        checked={selectedOption === option.label}
                                        onChange={onValueChange}
                                    />)
                            })}
                        </div>
                    </div>

                    {/* Items List Div */}
                    <div className="bg-white p-4 rounded shadow">
                        {cart.cartItems.map((item, index) => {
                            return (
                                <ProductList
                                    key={index}
                                    product={item.product}
                                    quantity={item.quantity}
                                    imageSrc={`https://picsum.photos/id/${item.product.id}/200`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Floating Summary (Resume) Div on the Left */}
                <div className="w-1/4 pr-4">
                    <div className="bg-gray-200 p-4 rounded fixed ml-10">

                        <h2 className="text-lg font-semibold mb-2 text-center">Resumo</h2>

                        <div className="border-b border-gray-600">
                            <div className="flex w-full my-4">
                                <div className="w-1/2 text-left">
                                    Subtotal:
                                </div>
                                <div className="w-1/2 text-right">
                                    R${cart.cartTotal.toFixed(2)}
                                </div>
                            </div>
                            <div className="flex w-full my-4">
                                <div className="w-1/2 text-left">
                                    Total:
                                </div>
                                <div className="w-1/2 text-right">
                                    R${cart.cartTotal.toFixed(2)}
                                </div>
                            </div>
                        </div>

                        <button className="bg-zinc-300 w-full rounded-full my-4 py-2 px-4">Fazer Pedido</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;