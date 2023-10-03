"use server"
import { prisma } from "@/utils/prisma"
import { createProductItem, updateProduct, queryProductById, queryAllProducts, queryAllProductsItem, queryProductCategory} from "../../../actions"
import {AdminForm} from "@/components/admin/adminForm"
import {AdminTable} from "@/components/admin/adminTable"
import Image from 'next/image'
import RenderStars from '@/components/ui/stars';
import EditableTable from "@/components/admin/editableTable/editableTable";
import Card from '@/components/admin/Card'

export default async function EditProduct({params}) {

  const productsItem = await queryAllProductsItem(params.id);

  const product = await queryProductById(params.id);
  const firstProduct = product[0];
  
  const categorie_vector = await queryProductCategory(firstProduct.product_categories_id);
  const firstCategory = categorie_vector[0];
  const categorie = firstCategory.name;
  
  const actions = [
    {
      name: 'Edit',
      color: 'blue',
      dest: '/admin/products/edit/$1'
    }
  ];
  const headers = ["SKU", "Preço", "Tamanho", "Estoque", "Ação"];

  const fieldsProductupdate = [{
    "name" : "id",
    "value" : firstProduct.id,
    "type": "hidden",
  },
  {
    "name" : "productName",
    "label": "Nome do Produto",
    "placeholder": firstProduct.name, // TODO trocar de placeholder para value
  },
  {
    "name": "description",
    "label": "Descrição",
    "type": "textarea",
    "placeholder": firstProduct.description, // TODO trocar de placeholder para value
  },
  {
    "name" : "category",
    "label": firstCategory.name,
    "type" : "select"
  } , 
  
  ];

  const fieldsItem = [{
    "name" : "sku",
    "label": "SKU",
    "type" : "text"
  } , 
  {
    "name" : "size",
    "label": "Tamanho",
    "type" : "text"
  } , 
  {
    "name" : "amount",
    "label": "Quantidade",
    "type" : "number"
  } , 
  {
    "name" : "price",
    "label" : "Preço",
    "type" : "number",
  },
  {
    "name" : "product_id",
    "value" : params.id,
    "type" : "hidden",
  },
];

  return (
      <div className="py-3 px-2 self-center grow flex flex-col items-center gap-4 text-white">
        <div className="flex flex-nowrap">
          <div className="flex justify-center w-full items-center flex-auto mx-6">
            <Card
              key={firstProduct.id}
              name={firstProduct.name}
              description={firstProduct.description}
              image={`https://picsum.photos/${firstProduct.id}/200`}
              rating={firstProduct.rating}
              categorie={categorie}
						/>
          </div>
          <div className="flex justify-center w-full items-center flex-auto">
            <AdminForm  formTitle ="Editar Produto" action ={updateProduct} fields = {fieldsProductupdate} buttonLabel = "Salvar"/>
          </div>
          <div className="flex justify-center w-full items-center flex-auto">
            <AdminForm formTitle ="Adicionar Itens" action ={createProductItem } fields = {fieldsItem} buttonLabel = "Adicionar"/>
          </div> 
      </div>
      {/* TODO reload page e mostrar novos itens */}
      
      <div className="max-w-[70%] overflow-x-auto">
          <EditableTable 
              title="Sub-produtos" 
              headers={headers} 
              data={productsItem} 
              action={actions} 
          />
      </div>
  </div>
        
  );
}