"use server"
import { prisma } from "@/utils/prisma"
import { createProductItem, updateProduct, queryProductById, queryAllProducts, queryAllProductsItem, queryProductCategory} from "../../../actions"
import {AdminForm} from "@/components/admin/adminForm"
import {AdminTable} from "@/components/admin/adminTable"
import Image from 'next/image'
import RenderStars from '@/components/ui/stars';
import EditIcon from "@/components/admin/editIcon";
import EditableTable from "@/components/admin/editableTable/editableTable";

export default async function EditProduct({params}) {

  const productsItem = await queryAllProductsItem(params.id);

  const product = await queryProductById(params.id);
  console.log(product);
  const firstProduct = product[0];
  
  const categorie = await queryProductCategory(firstProduct.product_categories_id);
  const firstCategory = categorie[0];
  
  const actions = [
    {
      name: 'Edit',
      color: 'blue',
      dest: '/admin/products/edit/$1'
    }
  ];
  const headers = ["ID", "SKU", "Preço", "Tamanho", "Cor", "Estoque", "Ação"];

  const fieldsProductupdate = [{
    "name" : "id",
    "value" : firstProduct.id,
    "type": "hidden",
  },
  {
    "name" : "productName",
    "label": "Nome do Produto",
    "placeholder": firstProduct.name,
  },
  {
    "name": "description",
    "label": "Descrição",
    "type": "textarea",
    "placeholder": firstProduct.description,
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
    "name" : "amount",
    "label": "Quantidade",
    "type" : "number"
  } , 
  {
    "name" : "color",
    "label": "Cor",
    "type" : "string"
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
          <AdminForm  formTitle ="Editar Produto" action ={updateProduct} fields = {fieldsProductupdate} buttonLabel = "Salvar"/>
        </div>
        <div className="flex justify-center w-full items-center flex-auto mx-6">
          <AdminForm formTitle ="Adicionar Itens" action ={createProductItem } fields = {fieldsItem} buttonLabel = "Adicionar"/>
        </div>
      </div>
      <div className="flex gap-3 max-w-3xl">
          <div>
              <Image 
                  src={`https://picsum.photos/id/${Math.round(
                      Math.random() * 1084
                  )}/200`}
                  alt="Foto do produto"
                  width={300}
      height={300}
              />
              <div className="flex items-center mt-2">
                  <RenderStars rating={firstProduct.rating}></RenderStars>
              </div>
          </div>
          <div className="w-fit">
    <div className="flex justify-between items-center pb-4">
      <h3 className="text-2xl font-bold border-b-zinc-600 border-b">
        {firstProduct.name}
      </h3>
      <EditIcon />
    </div>
              
    <p>{firstProduct.description}</p>
          </div>
      </div>
      
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