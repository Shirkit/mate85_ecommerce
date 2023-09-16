
"use server"
import { prisma } from "@/utils/prisma"
import {AdminTable} from "@/components/admin/adminTable"



const users = await prisma.user.findMany();

export default async function ManageUsers(){
  

  const actions = [
    {
      name: 'Edit',
      color: 'blue',
    },
    {
      name: 'Delete',
      color: 'red',
    },
  ];
  const headers = ['id','Name', 'Email', "Actions"];

  return (
    <AdminTable title = "Users" headers = {headers} data = {users} />
  )
  
}