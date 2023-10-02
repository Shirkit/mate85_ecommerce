"use server"
import { prisma } from "@/utils/prisma"
import { updateProduct, createProductItem, queryAllProductsItem, queryProduct, queryProductCategory} from "../../../actions"
import {AdminForm} from "@/components/admin/adminForm"
import {AdminTable} from "@/components/admin/adminTable"

export default async function EditProduct({params}) {

  const productsItem = await queryAllProductsItem(params.id);

  const product = await queryProduct(params.id);
  const firstProduct = product[0];
  
  const categorie = await queryProductCategory(firstProduct.product_categories_id);
  const firstCategory = categorie[0];
  console.log(firstCategory.id);
  
  const actions = [
    {
      name: 'Edit',
      color: 'blue',
      dest: '/admin/products/edit/$1'
    }
  ];
  const headers = ['Tamanho', 'Quantidade', "Preço", "Atualizar"];

  const fieldsProductupdate = [{
    "name" : "productName",
    "label": "Nome do Produto",
    "value": firstProduct.name
  },
  {
    "name": "description",
    "label": "Descrição",
    "type": "textarea",
    "value": firstProduct.description,
  },
  {
    "name" : "category",
    "label": firstCategory.name,
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
          <AdminForm  formTitle ="Editar Produto" action ={updateProduct(params.id)} fields = {fieldsProductupdate} buttonLabel = "Salvar"/>
        </div>
        <div className="flex justify-center w-full items-center flex-auto mx-6">
          <AdminForm formTitle ="Adicionar Itens" action ={createProductItem } fields = {fieldsItem} buttonLabel = "Adicionar"/>
        </div>
      </div>
        <div className="w-full flex justify-center items-center pt-6">
          <AdminTable 
            title="Estoque" 
            headers={headers} 
            data={productsItem} 
            actions={actions} 
            hasSearchBar={false}
          />
        </div>
      </div>
        
  );
}