"use server"
import { prisma } from "@/utils/prisma"
import { updateProduct, createProductItem } from "../../../actions"
import {AdminForm} from "@/components/admin/adminForm"

export default async function EditProduct({params}) {

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
    <div>
      <div className="flex justify-center w-full items-center">
        <AdminForm  formTitle ="Adicionar Produto" action ={updateProduct} fields = {fieldsProductupdate} buttonLabel = "Adicionar"/>
      </div>
      <div className="flex justify-center w-full items-center">
        <AdminForm  formTitle ="Adicionar Produto" action ={createProductItem } fields = {fieldsItem} buttonLabel = "Adicionar"/>
      </div>
    </div>
  );
}