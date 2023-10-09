import { AdminTable } from "@/components/admin/adminTable";
import { queryAllOrders } from "./actions"

const orders = await queryAllOrders();

const actions = [
    {
        name: 'Edit',
        color: 'blue',
        dest: '/admin/order/edit/$1'
    }
]

const headers = ['ID', 'User_ID', 'Status', 'Total', 'Action']

export default function ManageOrders() {
    return (
        <div>
            <AdminTable
                title="Pedidos"
                headers={headers}
                data={orders}
                actions={actions}
            />
        </div>
    )
}