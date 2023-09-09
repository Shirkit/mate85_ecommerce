"use client"
import {addProduct} from "./actions"
import {AdminForm} from "@/components/admin/adminForm"

export default function AddEditProduct() {
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
  }
  ];
  return (
    <div className="flex justify-center w-full items-center">
      <AdminForm  formTitle ="Adicionar Produto" action ={addProduct} fields = {fields} buttonLabel = "Criar Produto"/>
    </div>
    
  );
}