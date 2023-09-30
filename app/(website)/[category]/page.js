"use server";
import { prisma } from '@/utils/prisma'
import  Sidebar  from "@/components/categories/Sidebar"
import Link from 'next/link';
import Card from '@/components/ui/Card'


export default async function Category({params}){
  const products = await prisma.product.findMany();
  return(
    <div className="flex justify-center min-h-screen"> {/* Set min-h-screen */}
      <Sidebar />
      <div className="px-12 w-3/5"> 
        <h1 className="text-2xl font-bold mb-4 border-b">{params.category}</h1>
        
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
