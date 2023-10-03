
"use server"
import { prisma } from "@/utils/prisma"
import { AdminTable } from "@/components/admin/adminTable"



const users = await prisma.user.findMany();

export default async function ManageUsers() {


  const actions = [
    {
      name: 'Edit',
      color: 'blue',
      dest: '/admin/users/edit/$1'
    }
  ];
  const headers = ['id', 'Name', 'Email', "Actions"];

  return (
    <AdminTable title="Usuários" headers={headers} data={users} actions={actions} />
  )

}