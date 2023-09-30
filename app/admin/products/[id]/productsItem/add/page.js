"use server"
import { prisma } from "@/utils/prisma"
import { updateProduct, createProductItem, queryAllProductsItem } from "../../../actions"
import {AdminForm} from "@/components/admin/adminForm"
import {AdminTable} from "@/components/admin/adminTable"


export default async function EditProduct({params}) {
  const productsItem = await queryAllProductsItem(params.id);
  
  const actions = [
    {
      name: 'Edit',
      color: 'blue',
      dest: '/admin/products/edit/$1'
    }
  ];
  const headers = ['Tamanho', 'Quantidade', "Preço"];

  const fieldsProductupdate = [{
    "name" : "productName",
    "label": "Nome do Produto",
  },
  {
    "name": "description",
    "label": "Descrição",
    "type":"textarea"
  },
  {
    "name" : "category",
    "label": "Categorias",
    "type" : "select"
  } , 

  ];

  const fieldsItem = [{
    "name" : "size",
    "label": "Tamanho",
    "type" : "text"
  } , 
  {
    "name" : "sku",
    "label": "SKU",
    "type" : "text"
  } , 
  {
    "name" : "amout",
    "label": "Quantidade",
    "type" : "number"
  } , 

  {
    "name" : "price",
    "label" : "Preço",
    "type": "number",
  },
  {
    "name" : "product_id",
    "value" : params.id,
    "type" : "hidden",
  },
];

  return (
    <div className="flex justify-center flex-wrap">
      <div className="flex flex-nowrap">
        <div className="flex justify-center w-full items-center flex-auto mx-6">
          <AdminForm  formTitle ="Adicionar Produto" action ={updateProduct} fields = {fieldsProductupdate} buttonLabel = "Adicionar"/>
        </div>
        <div className="flex justify-center w-full items-center flex-auto mx-6">
          <AdminForm  formTitle ="Adicionar Itens" action ={createProductItem } fields = {fieldsItem} buttonLabel = "Adicionar"/>
        </div>
      </div>
        <div className="w-full flex justify-center items-center pt-6">
          <AdminTable 
            title="Produtos" 
            headers={headers} 
            data={productsItem} 
            actions={actions} 
            hasSearchBar={true}
          />
        </div>
      </div>
        
  );
}