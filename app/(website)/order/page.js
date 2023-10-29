'use client';

import React, { startTransition, useEffect, useState } from 'react'
import ProductList from '@/components/order/productList';
import RadioButton from '@/components/order/radioButton';
import { CreditCardIcon } from "lucide-react";
import { useCart } from '@/components/CartContext';
import { GetAddressesFromUserId, createOrder } from './actions';
import { Switch } from '@/components/ui/switch';
import { toast } from 'react-toastify';
import { redirect } from 'next/dist/server/api-utils';

const CheckoutPage = () => {
    const paymentOptions = [
        { label: 'Pix', icon: <CreditCardIcon />, description: 'Pague com Pix a qualquer momento!' },
        { label: 'Cartão de Crédito', icon: <CreditCardIcon />, },
        { label: 'Boleto Bancário', icon: <CreditCardIcon />, },
    ]

    const { cartItems, cartTotal } = useCart()
    const [address, setAddress] = useState({
        type: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
        complement2: ""
    })

    const [address2, setAddress2] = useState({
        type: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
        complement2: ""
    })

    const [multipleAddresses, setMultipleAddresses] = useState(false)

    const [selectedOption, setSelectedOption] = useState(paymentOptions[0].label)

    const onValueChange = (event) => {
        setSelectedOption(event.currentTarget.value)
    }

    async function tryCreateOrder() {        
        let res = await createOrder({billing_address: address, shipping_same_as_billing: !multipleAddresses, shipping_address: address2, gateway: {name: selectedOption}, cart: cartItems, total: cartTotal})
        console.log("🚀 ~ file: page.js:57 ~ tryCreateOrder ~ res:", res)
        if (res) {
            if (res.order) {
                toast.success('Pedido criado com sucesso!')
                // TODO redirecionar para a página
                // redirect(`/statusPedido/${res.order.id}`)
            } else if (res.error) {
                toast.error('Erro ao criar o pedido. ' + res.error)
            } else {
                toast.error('Erro desconhecido ao criar o pedido. ' + res)
            }
        } else
            toast.error('Erro desconhecido ao criar o pedido.')
    }

    useEffect(() => {
        startTransition(() => {
            // TODO pegar o usuário logado atual
            GetAddressesFromUserId("ff8eda38-a707-4013-91cb-c5e514dce984").then((res) => {
                res.forEach(el => {
                    if (el && el.type === 'billing')
                        setAddress(el)
                    else if (el && el.type === 'shipping')
                        setAddress2(el)
                });
            })
        })
    }, [])

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

                            <form className="space-y-4" id="order" action={tryCreateOrder}>

                                <h2 className="text-lg font-semibold mb-2">Endereço de Cobrança{multipleAddresses ? "" : " e Entrega"}</h2>

                                <div>
                                    <div className="my-2 block">
                                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                            Logradouro
                                        </label>
                                        <input
                                            type="text"
                                            id="street"
                                            name="street"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address.street}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                            Número
                                        </label>
                                        <input
                                            type="text"
                                            id="number"
                                            name="number"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address.number}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                                            Complemento
                                        </label>
                                        <input
                                            type="text"
                                            id="complement"
                                            name="complement"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address.complement}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                                            Bairro
                                        </label>
                                        <input
                                            type="text"
                                            id="neighborhood"
                                            name="neighborhood"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address.neighborhood}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            Cidade
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address.city}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            Estado
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address.state}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            País
                                        </label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address.country}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                                            CEP
                                        </label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address.zip_code}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="complement2" className="block text-sm font-medium text-gray-700">
                                            Complemento 2
                                        </label>
                                        <input
                                            type="text"
                                            id="complement2"
                                            name="complement2"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address.complement2}
                                            form="order"
                                        />
                                    </div>
                                </div>


                            </form>
                        </div>
                    </div>

                    <div className="mb-4 bg-white p-4 rounded shadow">
                        <label htmlFor="multipleaddresses" className="block text-sm font-medium text-gray-700 mb-1">
                            Endereço de <strong>entrega diferente</strong> do endereço de cobrança?
                        </label>
                        <Switch
                            id="multipleaddresses"
                            value={multipleAddresses}
                            checked={multipleAddresses}
                            onCheckedChange={e => setMultipleAddresses(e)}
                        />
                    </div>

                    {(multipleAddresses) &&
                        (<><div className="mb-4">
                            <div className="bg-white p-4 rounded shadow">
                                <h2 className="text-lg font-semibold mb-2">Endereço de Entrega</h2>

                                <div>
                                    <div className="my-2 block">
                                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                            Rua
                                        </label>
                                        <input
                                            type="text"
                                            id="street"
                                            name="street"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address2.street}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                            Número
                                        </label>
                                        <input
                                            type="text"
                                            id="number"
                                            name="number"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address2.number}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                                            Complemento
                                        </label>
                                        <input
                                            type="text"
                                            id="complement"
                                            name="complement"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address2.complement}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                                            Bairro
                                        </label>
                                        <input
                                            type="text"
                                            id="neighborhood"
                                            name="neighborhood"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address2.neighborhood}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            Cidade
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address2.city}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            Estado
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address2.state}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            País
                                        </label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address2.country}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                                            CEP
                                        </label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address2.zip_code}
                                            form="order"
                                        />
                                    </div>

                                    <div className="my-2 block">
                                        <label htmlFor="complement2" className="block text-sm font-medium text-gray-700">
                                            Complemento 2
                                        </label>
                                        <input
                                            type="text"
                                            id="complement2"
                                            name="complement2"
                                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300 sm:text-sm"
                                            defaultValue={address2.complement2}
                                            form="order"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div></>)
                    }

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

                        <button type="submit" form="order" className="bg-zinc-300 w-full rounded-full my-4 py-2 px-4">Fazer Pedido</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;