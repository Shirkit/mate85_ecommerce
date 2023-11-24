'use client'

import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Card, Flex, Title, Icon, Badge, Text, Metric, Button, DateRangePicker, SearchSelect, SearchSelectItem, Divider, Select, SelectItem, } from '@tremor/react';
import { AlertCircleIcon, CheckIcon, ClockIcon, LoaderIcon, MoreHorizontalIcon, PackageCheckIcon, SearchIcon, TruckIcon } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import ProductList from '@/components/order/productList';
import { updateStatus } from '../actions';

const deltaTypes = {
    waiting: { icon: ClockIcon, color: 'gray' },
    "payment-pending": { icon: ClockIcon, color: 'red' },
    completed: { icon: CheckIcon, color: 'emerald' },
    shipped: { icon: TruckIcon, color: 'lime' },
    delivered: { icon: PackageCheckIcon, color: 'green' },
    processing: { icon: LoaderIcon, color: 'blue' },
}

const numberformatter = (number, decimals = 0) =>
    Intl.NumberFormat("pt-BR", {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(Number(number)).toString();

function OrdersTable({ orders, total }) {
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [quantity, setQuantity] = useState(0)

    const closeModal = () => setIsOpen(false);

    const openModal = () => setIsOpen(true);

    const showOrderDetails = (order) => {
        openModal();
        setSelectedOrder(order);
    }

    const filterByCustomer = (customer, data) => {
        if (customer === '') {
            return data;
        } else {
            return data.filter((item) => item.user.name.toLowerCase().includes(customer.toLowerCase()));
        }
    };

    useEffect(() => {
        setFilteredOrders(filterByCustomer(selectedCustomer, orders));
    }, [selectedCustomer, orders]);

    useEffect(() => {
        let qty = 0
        selectedOrder?.order_items?.forEach(item => {
            qty += item.quantity
        });
        setQuantity(qty)
    }, [selectedOrder])

    return (
        <main className='p-12'>
            <Card>
                <Flex className="mb-4" alignItems="start">
                    <div className="truncate">
                        <Text>Faturamento</Text>
                        <Metric className="truncate">{numberformatter(total, 2)}</Metric>
                    </div>
                </Flex>
                <div>
                    <Flex className='space-x-0.5' justifyContent='start' alignItems='center'>
                        <Title>Pedidos</Title>
                        <Icon icon={AlertCircleIcon}
                            variant='simple'
                            tooltip='Lista de pedidos dos usuários'
                        />
                    </Flex>
                </div>

                <div>
                    <Flex className='space-x-2 mt-4' justifyContent='evenly'>
                        <SearchSelect className='max-w-full sm:max-w-xs' onValueChange={setSelectedCustomer} placeholder='Buscar usuário...' icon={SearchIcon} value={selectedCustomer}>
                            {orders.reduce((acc, curr) => {
                                if (curr.user.name && !acc.includes(curr.user.name)) {
                                    acc.push(curr.user.name)
                                }
                                return acc;
                            }, []).map((name, index) => (
                                <SearchSelectItem key={index} value={name}>
                                    {name}
                                </SearchSelectItem>
                            ))}
                        </SearchSelect>
                        <DateRangePicker placeholder='Selecionar período' enableSelect={false} enableClear={true} />

                    </Flex>
                </div>

                <Table className="mt-6">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Pedido</TableHeaderCell>
                            <TableHeaderCell className="text-right">Comprador</TableHeaderCell>
                            <TableHeaderCell className="text-right">Contato</TableHeaderCell>
                            <TableHeaderCell className="text-right">Total</TableHeaderCell>
                            <TableHeaderCell className="text-right">Status</TableHeaderCell>
                            <TableHeaderCell className="text-right">Ação</TableHeaderCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredOrders
                            .map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell className="text-right">{order.user.name}</TableCell>
                                    <TableCell className="text-right">{order.user.email}</TableCell>
                                    <TableCell className="text-right">{numberformatter(order.total, 2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge icon={deltaTypes[order.status].icon} color={deltaTypes[order.status].color}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='light' icon={MoreHorizontalIcon} iconPosition='right' onClick={() => { showOrderDetails(order) }}>
                                            Detalhes
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Card>

            {selectedOrder && (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Lista de Produtos e Mudança de Status
                                        </Dialog.Title>
                                        <form action={() => { updateStatus(selectedOrder.id, selectedStatus) }} className='flex gap-6 mt-6'>
                                            <Select onValueChange={setSelectedStatus} placeholder='Selecione o status...'>
                                                {Object.keys(deltaTypes).map((key, index) => (
                                                    <SelectItem key={index} value={key}>
                                                        {key}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                            <Button>
                                                Salvar
                                            </Button>
                                        </form>

                                        <Divider />

                                        {selectedOrder.order_items.map((item, index) => (
                                            <ProductList
                                                key={index}
                                                name={item.product.productItem_product.name}
                                                size={item.product.size}
                                                price={item.price}
                                                quantity={item.quantity}
                                                imageSrc={`https://picsum.photos/id/${item.product.product_id}/200`}
                                            />
                                        ))
                                        }

                                        <div className='flex gap-4 pt-4 justify-between'>
                                            <div>
                                                <p className='font-bold'>Data e Hora:</p>
                                                <p> - {selectedOrder.createdAt?.toLocaleDateString()}</p>
                                                <p> - {selectedOrder.createdAt?.toLocaleTimeString()}</p>
                                            </div>

                                            <div>
                                                <p className='font-bold'>Total do Pedido:</p>
                                                <p> - R${selectedOrder.total}</p>
                                                <p> - {quantity} unidades</p>
                                            </div>
                                        </div>

                                        {/* <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Your payment has been successfully submitted. We’ve sent
                                                you an email with all of the details of your order.
                                            </p>
                                            <p>{selectedOrder.order_items[0].product.productItem_product.name}</p>
                                        </div> */}

                                        {/* <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Got it, thanks!
                                            </button>
                                        </div> */}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </main>
    );
}

export default OrdersTable;