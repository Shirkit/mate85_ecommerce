"use server";

import { prisma } from '@/utils/prisma';
import { useRouter } from 'next/navigation';
import  Sidebar  from "@/components/categories/Sidebar";
import Link from 'next/link';
import Card from '@/components/ui/Card';



export default async function Shop({searchParams}) {
  

  // let categoryId = undefined
  // {searchParams.category ? 
  //   (categoryId = await prisma.productCategory.findFirst({
  //     where:{
  //       name : searchParams.category? searchParams.category : undefined
  //     }
  //   }))
  //   : // se nao especificamos uma categoria vamos mostrar todos os produtos
  //   (categoryId = await prisma.productCategory.findMany({
  //     where:{
  //       name : searchParams.category? searchParams.category : undefined
  //     }
  //   }))
  // }

  const categoryId = searchParams?.categoryId ? parseInt(searchParams?.categoryId) : undefined
  const priceSearch = {}
  priceSearch.gte = searchParams?.minPrice ? parseFloat(searchParams?.minPrice) : undefined
  priceSearch.lte = searchParams?.maxPrice ? parseFloat(searchParams?.maxPrice) : undefined
  
  // const products = categoryId? await prisma.product.findMany({
  //   where:{
  //     product_categories_id: categoryId? categoryId.id : undefined,
  //     price:priceSearch
  //   }
  // }) : []

  const products = categoryId? await prisma.product.findMany({
    where:{
      product_categories_id: categoryId? categoryId : undefined,
      product_item:{
        some:{
          price:priceSearch
        }
      }
    }
  }) : []

  return(
    <div className="mt-16 flex justify-center min-h-screen">
      
      <Sidebar />
      <div className="flex flex-col items-start px-12 w-3/5"> 
        
        <div className="mx-4">
        {(categoryId) && (searchParams.categoryName) ?
            (<h1 className="text-2xl font-bold mb-4">{searchParams.categoryName.charAt(0).toUpperCase() + searchParams.categoryName.slice(1)}</h1>
            ) : (!categoryId) && (searchParams) ? 

            (<h1 className="text-2xl font-bold mb-4">Não há produtos disponíveis nessa categoria</h1>
            ) : 
            (
              <h1 className="text-2xl font-bold mb-4">Todos os Produtos</h1>
            )

          }  

        </div>
     
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={"/product/" + product.id} key={product.id}>
              <Card
                name={product.name}
                image={`https://picsum.photos/id/${product.id}/200`}
                price={product.price}
                rating={product.rating}
              />
            </Link>
          ))
        ) : (
          <p>Não temos produtos disponíveis com estes preços</p>
        )}
        </div>
      </div>
    </div>
  )
}
