"use server"
import { prisma } from "@/utils/prisma"
import { createProductItem, updateProduct, queryProductById, queryAllProducts, queryAllProductsItem, queryProductCategory } from "../../../actions"
import { AdminForm } from "@/components/admin/adminForm"
import { AdminTable } from "@/components/admin/adminTable"
import Image from 'next/image'
import RenderStars from '@/components/ui/stars';
import EditableTable from "@/components/admin/editableTable/editableTable";
import Card from '@/components/admin/Card'

import ReturnComponent from "@/components/ui/insertProduct"


export default async function EditProduct({ params }) {

  const productsItem = await queryAllProductsItem(params.id);

  const product = await queryProductById(params.id);
  const firstProduct = product[0];

  const categorie_vector = await prisma.productCategory.findMany({
    select: {
      id: true,
      name: true,
    },
  })
  let categorie = ""

  const actions = [
    {
      name: 'Edit',
      color: 'blue',
      dest: '/admin/products/edit/$1'
    }
  ];
  const headers = ["SKU", "Preço", "Tamanho", "Estoque", "Ação"];

  const fieldsProductupdate = [{
    "name": "id",
    "value": firstProduct.id,
    "type": "hidden",
  },
  {
    "name": "productName",
    "label": "Nome do Produto",
    "value": firstProduct.name, // TODO trocar de placeholder para value
  },
  {
    "name": "description",
    "label": "Descrição",
    "type": "textarea",
    "value": firstProduct.description, // TODO trocar de placeholder para value
  },
  {
    "name": "category",
    "label": "Categoria",
    "type": "select",
    "value": firstProduct.product_categories_id,
    "options": []
  },
  ];

  categorie_vector.forEach(el => {
    fieldsProductupdate[3].options.push({ "id": el.id, "name": el.name })
    if (firstProduct.product_categories_id == el.id)
      categorie = el.name
  });

  const fieldsItem = [{
    "name": "sku",
    "label": "SKU",
    "type": "text"
  },
  {
    "name": "size",
    "label": "Tamanho",
    "type": "text"
  },
  {
    "name": "amount",
    "label": "Quantidade",
    "type": "number"
  },
  {
    "name": "price",
    "label": "Preço",
    "type": "number",
  },
  {
    "name": "product_id",
    "value": params.id,
    "type": "hidden",
  },
  ];  
  const dados = {firstProduct, fieldsProductupdate, fieldsItem, headers, productsItem, actions, categorie}

  return (
    <div>
<ReturnComponent dados={dados}></ReturnComponent>

    </div>

  );
}