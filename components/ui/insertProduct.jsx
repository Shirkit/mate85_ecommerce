'use client'
import React from 'react';
import { AdminForm } from "@/components/admin/adminForm"
import { AdminTable } from "@/components/admin/adminTable"
import Image from 'next/image'
import RenderStars from '@/components/ui/stars';
import EditableTable from "@/components/admin/editableTable/editableTable";
import Card from '@/components/admin/Card'
import { createProductItem, updateProduct, queryProductById, queryAllProducts, queryAllProductsItem, queryProductCategory } from "@/app/admin/products/actions"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
const ReturnComponent = ({ dados }) => {
    const handleFormSubmit = async (formValues) => {
      try {
        console.log(formValues);
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

    
    
    const { firstProduct, fieldsProductupdate, fieldsItem, headers, productsItem, actions, categorie } = dados;
  return (
    <div className="py-3 px-2 self-center grow flex flex-col items-center gap-4 text-white">
      <div className="flex flex-nowrap">
        <div className="flex justify-center w-full items-center flex-auto mx-6">
            <ToastContainer></ToastContainer>
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
          <AdminForm formTitle="Editar Produto" action={updateProduct} fields={fieldsProductupdate} buttonLabel="Salvar" />
        </div>
        <div className="flex justify-center w-full items-center flex-auto">
          <AdminForm formTitle="Adicionar Itens"  fields={fieldsItem} buttonLabel="Adicionar" onSubmit={handleFormSubmit} />
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
};

export default ReturnComponent;