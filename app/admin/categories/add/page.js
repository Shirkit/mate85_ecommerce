"use client";
import { addCategories } from "./action";
import { AdminForm } from "@/components/admin/adminForm";

export default function AddEditCategories() {
  const fields = [
    {
      name: "categoryName",
      label: "Categoria",
      type: "text",
    },
  ];
  return (
    <div className="flex justify-center w-full items-center">
      <AdminForm
        formTitle="Adicionar Categoria"
        action={addCategories}
        fields={fields}
        buttonLabel="Criar Categoria"
      />
    </div>
  );
}
