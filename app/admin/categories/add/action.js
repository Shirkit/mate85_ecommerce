"use server";

import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

async function addCategories(category) {
  // await prisma.category.create({where : {id : category.get("id")}});

  redirect("/categories/add");
}

export { addCategories };
