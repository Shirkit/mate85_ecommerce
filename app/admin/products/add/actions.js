'use server'

import { prisma } from "@/utils/prisma"
import { redirect } from 'next/navigation'

async function addProduct(product){
  // await prisma.product.create({where : {id : product.get("id")}});

  redirect("/products/add");
}

export {addProduct}