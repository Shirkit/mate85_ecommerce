"use server"
import React from 'react'

async function FilteredProducts({minPrice, maxPrice}) {
  const categoryId = await prisma.productCategory.findMany({
    where:{
      name : params.category
    }
  }).id;
  
  const products = await prisma.product.findMany({
    where:{
      product_category: categoryId
    }
  });
  
  // TODO Otimizar isso, talvez usar UseEffect?
  const filteredProducts = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {filteredProducts.map((product) => {
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
  )
}

export default FilteredProducts
