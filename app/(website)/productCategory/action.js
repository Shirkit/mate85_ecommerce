"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function CreateProductCategory(data) {
  await prisma.categoria.create({
    data: { nome: data.get("nome") },
  });

  revalidatePath("/productCategory/");
}

async function removeProductCategory(data) {
  await prisma.categoria.delete({
    where: {
      id: +data.get("id"),
    },
  });

  redirect("/productCategory/");
}

async function updateProductCategory(data) {

  await prisma.categoria.update({
    where: {
      id: parseInt(data.get("id")),
    },
    data: {
      nome: data.get("nome"),
    },
  });
  revalidatePath("/productCategory/");
}

export {
  asyncCreateProductCategory,
  removeProductCategory,
  updateProductCategory,
};
