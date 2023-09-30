"use server"
import { prisma } from "@/utils/prisma"
import { createProductItem } from "../../../actions"
import {AdminForm} from "@/components/admin/adminForm"

export default async function AddEditProductItem(productId) {

  const fields = [{
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
];

  return (
    <div className="flex justify-center w-full items-center">
      <AdminForm  formTitle ="Adicionar Sub Produto" action ={createProductItem} fields = {fields} buttonLabel = "Adicionar"/>
    </div>
    
  );
}