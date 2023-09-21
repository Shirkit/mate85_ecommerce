"use server"
import { prisma } from "@/utils/prisma"
import { createProduct } from "../actions"
import {AdminForm} from "@/components/admin/adminForm"

export default async function AddEditProduct() {

  const fields = [{
    "name" : "productName",
    "label": "Nome do Produto",
    "type":"text",
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

  {
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
      <AdminForm  formTitle ="Adicionar Produto" action ={createProduct} fields = {fields} buttonLabel = "Adicionar"/>
    </div>
    
  );
}