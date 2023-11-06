"use server"

import { getServerSession } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"

async function getUserById(userId){
  return await prisma.user.findFirst({
    where:{
      id:userId
    }
  })
}

async function getUserOrdersById(userId){
  return await prisma.order.findMany({
    where:{
      users_id:userId
    }
  })
}

// TODO Ver qual endereço de um usuário vamos pegar
async function getUserAddressById(userId){
  return await prisma.address.findFirst({
    where:{
      users_id:userId
    }
  })
}
async function getOrderItemByOrderId(orderId){
  return await prisma.orderItem.findMany({
    where:{
      orders_id:orderId
    }
  })
}

async function updateUser(data){
  await prisma.user.update({
    where:{
      id:(await getServerSession()).user.id
    },
    data:{
      name:data.name
    }
  })
  return true
}
export {getUserById, getUserOrdersById, getOrderItemByOrderId,getUserAddressById,updateUser}