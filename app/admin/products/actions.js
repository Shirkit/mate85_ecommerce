'use server'
import { prisma } from "@/utils/prisma"
import { product_categories } from "@/utils/sampledata"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


async function createProduct(data) {
    const newProduct = await prisma.product.create({
        data: {
            name: data.get("productName"),
            description: data.get("description"),
            product_categories_id: parseInt(data.get("category")),
        },
    })

    const productId = newProduct.id;

    redirect(`/admin/products/${productId}/productsItem/add`)
}

async function createProductItem(data) {
    try {
   
  
      const { sku, size, amount, price, product_id } = data;
  
      // Criar o produto usando o Prisma
      await prisma.productItem.create({
        data: {
          sku: sku,
          size: size,
          amount: parseInt(amount),
          price: parseFloat(price),
          productItem_product: {
            connect: {
              id: parseInt(product_id),
            },
          },
        },
      });
  
      // Após criar o produto com sucesso, você pode chamar revalidatePath
      revalidatePath(`/admin/products/$1/productsItem/add`);
  
      // Retornar um objeto de sucesso, se necessário
      return { success: true, message: 'Produto criado com sucesso!' };
    } catch (error) {
        if (error.constructor.name === 'PrismaClientKnownRequestError') {
            // Lidar com o erro específico do Prisma
            if (error.code === 'P2002') {
              return { success: false, message: 'Erro ao criar o produto: SKU duplicado.' };
            }
        }

      

      return { success: false, message: 'Erro ao criar o produto.'};
    }
    }
  
  
async function updateProduct(data) {
    await prisma.product.update({
        where: {
            id: parseInt(data.get("id")),
        },
        data: {
            name: data.get("productName"),
            description: data.get("description"),
            product_categories_id: parseFloat(data.get("category"))
        },

    })

    revalidatePath(`/admin/products/$1/productsItem/add`)
}

async function queryProductById(data) {
    return await prisma.product.findMany({
        where: {
            id: parseInt(data)
        },
        select: {
            id: true,
            name: true,
            description: true,
            rating: true,
            product_categories_id: true
        },
    })
}

async function queryProductCategory(data) {
    return await prisma.productCategory.findMany({
        where: {
            id: data? parseInt(data): null
        },
        select: {
            id: true,
            name: true,
        },
    })
}

async function queryAllProducts() {
    return await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            rating: true,
            product_categories_id: true,
        },
    })
}

async function queryAllProductsItem(data) {
    return await prisma.productItem.findMany({
        where: {
            product_id: parseInt(data)
        },
        select: {
            sku: true,
            price: true,
            size: true,
            amount: true,
        },
    })
}

export { createProduct, createProductItem, updateProduct, queryProductById, queryAllProducts, queryAllProductsItem, queryProductCategory }