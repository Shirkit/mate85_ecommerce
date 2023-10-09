import { AdminTable } from "@/components/admin/adminTable"
import { queryAllProducts, queryProductByName } from "./actions"
import { prisma } from "@/utils/prisma";

const products = await prisma.product.findMany(
	{
		include: {
			product_category: true
		},
	}
)

for (let i = 0; i < products.length; i++) {
	delete products[i].description
	products[i].category = products[i].product_category.name
	delete products[i].product_categories_id
	delete products[i].product_category

}

const actions = [
	{
		name: 'Edit',
		color: 'blue',
		dest: '/admin/products/$1/productsItem/add'
	}
];
const headers = ['ID', 'Nome', 'Avaliação', "Categoria", "Ação"];

export default async function ManageProducts() {
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