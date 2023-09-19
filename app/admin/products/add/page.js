"use server"
import { prisma } from "@/utils/prisma"
import { createProduct } from "../actions"
import {AdminForm} from "@/components/admin/adminForm"
import Card from '@/components/ui/Card'

export default async function AddEditProduct() {
  const fields = [{
    "name" : "productName",
    "label": "Nome do Produto",
    "type":"text",
  },
  
  {
    "name" : "price",
    "label" : "Preço",
    "type": "number",
  },

  {
    "name": "description",
    "label": "Descrição",
    "type":"textarea"
  },
  {
    "name" : "category",
    "label": "Categorias",
    "type" : "text"
  }  ];

  const products = await prisma.product.findMany();
  return (
    <div className="flex justify-center w-full items-center">
      <AdminForm  formTitle ="Adicionar Produto" action ={createProduct} fields = {fields} buttonLabel = "Adicionar"/>
      
      {/* <div>
        <h1>Lista de Produtos</h1>
        {products.map((product) => {
            return (
                <Card
                  key={product.id}
                  name={product.name}
                  image={`https://picsum.photos/id/${Math.round(
                    Math.random() * 1084
                  )}/200`}
                  price={product.price}
                  rating={3}
                />
            )
        })}
      </div> */}
    </div>
    
  );
}