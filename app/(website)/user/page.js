"use client"
import React, { useEffect, useState, useTransition } from 'react';
import { updateUser } from './actions';
import UserOrders from "@/app/(website)/user/userOrders"
import { useSession, signIn, signOut } from 'next-auth/react'
import { toast } from 'react-toastify';

const ProfileEditComponent = ({ params }) => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const [isPending, startTransision] = useTransition()

  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      setFormData(session.user)
    }
  }, [session])

  const handleOnSave = (e) => {
    if (!isPending) {
      startTransision(async () => {
        const res = await updateUser(formData)
        if (res)
          toast.success("Perfil atualizado com sucesso")
        else
          toast.error("Erro ao atualizar o seu perfil")
      })
    }
  }

  if (status == "authenticated") {
    return (
      <div className='flex my-10 gap-4 max-w-7xl w-full'>
        <div className="max-w-md mx-auto bg-white rounded-lg p-8 border">
          <h1 className="text-2xl mb-4 text-bold">Editar Conta</h1>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
            <input
              type="text"
              id="username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-400"
              required
              disabled={isPending}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-400"
              required
              disabled
            />
          </div>

          {/* <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-400"
            required
          />
        </div> */}

          <div className='flex justify-between mt-8 gap-8'>
            <button className="flex border rounded-lg w-max px-4 py-2 bg-black text-white border-black duration-300 hover:bg-transparent hover:text-black" onClick={handleOnSave} type="submit" disabled={isPending}>Salvar</button>
            <button className='flex border rounded-lg w-max px-4 py-2 bg-black text-white border-black duration-300 hover:bg-transparent hover:text-black' onClick={() => signOut()} disabled={isPending}>Fazer logout</button>
          </div>

        </div>
        {/* //TODO ver o que vamos mostrar de um pedido */}
        <div className="mx-auto bg-white rounded-lg p-8 border w-full">
          <UserOrders userId={session.user.id} className="" />
        </div>
      </div>

    );
  } else if (status == "unauthenticated") {
    return (
      <div className='flex my-10'>
        <div className="max-w-md mx-auto bg-white rounded-lg p-8 border flex flex-col items-center gap-4">
          <p>Você precisa estar logado para ver seus pedidos</p>
          <button onClick={() => signIn()} className='flex border rounded-lg w-max px-4 py-2 bg-black text-white border-black duration-300 hover:bg-transparent hover:text-black'>Fazer login</button>
        </div>
      </div>
    )
  }


};

export default ProfileEditComponent;
