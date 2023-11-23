'use client'
import React from 'react';
import { AdminForm } from "@/components/admin/adminForm"
import { AdminTable } from "@/components/admin/adminTable"
import CardProductItem from '../admin/cardProductItem';
import Image from 'next/image'
import RenderStars from '@/components/ui/stars';
import EditableTable from "@/components/admin/editableTable/editableTable";
import { createProductItem, updateProduct, queryProductById, queryAllProducts, queryAllProductsItem, queryProductCategory } from "@/app/admin/products/actions"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import UploadImagePage from '@/components/admin/uploadImage';

const ReturnComponent = ({ dados }) => {
    const handleFormSubmit = async (formValues) => {
      try {
        const retornoProduto = await createProductItem(formValues);

        if(retornoProduto.success=== true){
        toast.success(retornoProduto.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      }  
      else
      toast.error(retornoProduto.message);
      } catch (error) {
        toast.error("Houve um erro durante a criação do produto");
      }
    };
  
  const { firstProduct, fieldsProductupdate, fieldsItem, headers, productsItem, action, categorie , imageURLs, handleDeleteImage} = dados;
  
  return (
    <div className="py-3 px-2 self-center grow flex flex-col items-center gap-4 text-white">

    {/* Primeira linha */}
    <div className="flex flex-col md:flex-row gap-4 w-full">

      {/* Upload Image */}
      <div className="flex-shrink-0">
        <UploadImagePage firstProductId={dados.firstProduct.id}/>
      </div>

      {/* Card */}
      <div className="flex flex-col w-full md:w-2/3">

        <div className="flex justify-center items-center mb-4">
          <CardProductItem
            key={firstProduct.id}
            name={firstProduct.name}
            images={imageURLs}
            description={firstProduct.description}
            rating={firstProduct.rating}
            categorie={categorie}
            handleDelete={handleDeleteImage}
          />
        </div>
        <div>
        </div>
      </div>
    </div>

    {/* Segunda linha */}
    <div className="flex flex-col md:flex-row gap-4 w-full">

      {/* Primeiro Admin Form */}
      <div className="flex justify-center items-center w-full md:w-1/2">
        <AdminForm formTitle="Editar Produto" action={updateProduct} fields={fieldsProductupdate} buttonLabel="Salvar" />
      </div>

      {/* Segundo Admin Form */}
      <div className="flex justify-center items-center w-full md:w-1/2">
        <AdminForm formTitle="Adicionar Itens"  fields={fieldsItem} buttonLabel="Adicionar" onSubmit={handleFormSubmit} />
      </div>

    </div>

    {/* Terceira linha */}
    <div className="flex flex-col w-full">

      {/* Editable */}
      <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-[70%] overflow-x-auto">
          <EditableTable
            title="Sub-produtos"
            headers={headers}
            data={productsItem}
            action={action}
          />
        </div>
      </div>

    </div>

  </div>
  
  );
};

export default ReturnComponent;