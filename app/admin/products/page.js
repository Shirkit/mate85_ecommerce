import {AdminTable} from "@/components/admin/adminTable"
import { queryAllProducts, queryProductByName } from "./actions"

const products = await queryAllProducts()

const actions = [
	{
		name: 'Edit',
		color: 'blue',
		dest: '/admin/products/edit/$1'
	}
];
const headers = ['ID','Nome', 'Avaliação', "Ação"];

export default async function ManageProducts(){
	return (
		<div className="w-full flex justify-center items-center pt-6">
			<AdminTable 
				title="Produtos" 
				headers={headers} 
				data={products} 
				actions={actions} 
				hasSearchBar={true}
			/>
		</div>
		
	)
  
}