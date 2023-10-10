"use server";

import { prisma } from '@/utils/prisma';
import { useRouter } from 'next/navigation';
import  Sidebar  from "@/components/categories/Sidebar";
import Link from 'next/link';
import Card from '@/components/ui/Card';



export default async function Category({params, searchParams}){

  const categoryId = await prisma.productCategory.findFirst({
    where:{
      name : params.category//params.category
    }
  })


  const priceSearch = {}
  priceSearch.gte = searchParams?.minPrice ? parseFloat(searchParams?.minPrice) : undefined
  priceSearch.lte = searchParams?.maxPrice ? parseFloat(searchParams?.maxPrice) : undefined
  
  const products = categoryId? await prisma.product.findMany({
    where:{
      product_categories_id: categoryId? categoryId.id : undefined,
      price:priceSearch
    }
  }) : []

  
  return(
    <div className="mt-16 flex justify-center min-h-screen">
      
      <Sidebar category = {params.category}/>
      <div className="flex flex-col items-start px-12 w-3/5"> 
        
        <div className="mx-4">
        {(categoryId) &&
            <h1 className="text-2xl font-bold mb-4">{params.category.charAt(0).toUpperCase() + params.category.slice(1)}</h1>
          }  
          {(!categoryId) &&
            <h1 className="text-2xl font-bold mb-4">Não há produtos disponíveis nessa categoria</h1>
          }          
        </div>
     
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => {
              return (
                <Link href={"/product/" + product.id} key={product.id}>
                  <Card
                    name={product.name}
                    image={`https://picsum.photos/id/${product.id}/200`}
                    price={product.price}
                    rating={product.rating}
                  />
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}
