import { Button } from "@/components/ui/button";
//import { prisma } from "@/utils/prisma";
import { prisma } from "@/utils/prisma";
import Link from "next/link";
import { UpdateProductCategory } from "./UpdateProductCategory";
import { CreateProductCategory } from "./CreateProductCategory";

export default async function Categorias() {
  const categorias = await prisma.categoria.findMany();

  return (
    <div>
      <h1>Lista de Categorias</h1>

      {categorias.map((categoria) => {
        return (
          <div key={categoria.id}>
            <Link href={`/productCategory/${categoria.id}`}>
              {categoria.nome}
            </Link>
          </div>
        );
      })}

      <CreateProductCategory></CreateProductCategory>

      <UpdateProductCategory></UpdateProductCategory>
    </div>
  );
}
