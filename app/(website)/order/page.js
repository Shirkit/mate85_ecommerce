'use client';

import React, { useState } from 'react'
import ProductList from '@/components/order/productList';
import RadioButton from '@/components/order/radioButton';
import { CreditCardIcon } from "lucide-react";
import { useCart } from '@/components/CartContext';

const CheckoutPage = () => {
    const paymentOptions = [
        { label: 'Pix', icon: <CreditCardIcon />, description: 'Pague com Pix a qualquer momento!' },
        { label: 'Cartão de Crédito', icon: <CreditCardIcon />, },
        { label: 'Boleto Bancário', icon: <CreditCardIcon />, },
    ]

    const { cartItems, cartTotal } = useCart()

    const [selectedOption, setSelectedOption] = useState(paymentOptions[0].label)

    const onValueChange = (event) => {
        setSelectedOption(event.currentTarget.value)
    }

    const handleChange = () => { }

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
                    {/* Endereço */}
                    <div className="mb-4">
                        <div className="bg-white p-4 rounded shadow">

                            <h2 className="text-lg font-semibold mb-2">Endereço de Entrega</h2>

                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                        Tipo de endereço
                                    </label>
                                    <select
                                        name="type"
                                        id="type"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={'billing'}
                                    >
                                        <option value="">Selecione uma opção</option>
                                        <option value="shipping">Entrega</option>
                                        <option value="billing">Cobrança</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                        Rua
                                    </label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={address.street}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                        Número
                                    </label>
                                    <input
                                        type="text"
                                        id="number"
                                        name="number"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={address.number}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                                        Complemento
                                    </label>
                                    <input
                                        type="text"
                                        id="complement"
                                        name="complement"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={address.complement}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                                        Bairro
                                    </label>
                                    <input
                                        type="text"
                                        id="neighborhood"
                                        name="neighborhood"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={address.neighborhood}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        Cidade
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={address.city}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                        Estado
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={address.state}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        País
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={address.country}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                                        CEP
                                    </label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={address.zip_code}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="complement2" className="block text-sm font-medium text-gray-700">
                                        Complemento 2
                                    </label>
                                    <input
                                        type="text"
                                        id="complement2"
                                        name="complement2"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                        onChange={handleChange}
                                        value={address.complement2}
                                    />
                                </div>

                                <div>
                                    {/* Se o cara tiver billing ou shipping, buscar e preencher, e se tiver bloquear o adicionar, caso o cara não tenha um dos dois e não esteja com um endereço pré-preenchido (e.g. o cara tem billing mas não tem shipping, então o billing é selecionado por padrão e o botão adicionar fica desabilitado a menos que ele troque para shipping, no qual o botão vai ficar habilitado e ele vai poder adicionar ou endereço, desta forma o cara só vai ter a desgraça de dois endereços) */}
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                    >
                                        Adicionar endereço
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Métodos de Pagamento */}
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

                    {/* Lista de Itens */}
                    <div className="bg-white p-4 rounded shadow">
                        {cartItems.length > 0 ?
                            cartItems.map((el, index) => {
                                return (
                                    <ProductList
                                        key={index}
                                        name={el.product.name}
                                        size={el.item.size}
                                        price={el.item.price}
                                        quantity={el.quantity}
                                        imageSrc={`https://picsum.photos/id/${el.item.product_id}/200`}
                                    />
                                );
                            }) : <h1 className='text-center'>Carrinho Vazio</h1>
                        }

                    </div>
                </div>

                {/* Resumo */}
                <div className="w-1/4 pr-4">
                    <div className="bg-gray-200 p-4 rounded  ml-10">

                        <h2 className="text-lg font-semibold mb-2 text-center">Resumo</h2>

                        <div className="border-b border-gray-600">
                            <div className="flex w-full my-4">
                                <div className="w-1/2 text-left">
                                    Subtotal:
                                </div>
                                <div className="w-1/2 text-right">
                                    R$ {cartTotal ? cartTotal.toFixed(2) : Number(0).toFixed(2)}
                                </div>
                            </div>

                            <div className="flex w-full my-4">
                                <div className="w-1/2 text-left">
                                    Total:
                                </div>
                                <div className="w-1/2 text-right">
                                    R$ {cartTotal ? cartTotal.toFixed(2) : Number(0).toFixed(2)}
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