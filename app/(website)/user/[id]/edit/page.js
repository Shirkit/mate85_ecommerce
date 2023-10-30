"use client"
import React, { useEffect, useState, useTransition } from 'react';
import { getUserById,updateUser } from './actions';
import UserOrders from "@/app/(website)/user/[id]/edit/userOrders"

const ProfileEditComponent = ({params}) => {
  const [formData, setFormData] = useState({});
  const [isPending,startTransition] = useTransition();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

   
  useEffect(() => {
    if(!isPending){
      startTransition(async () => {
        const user = await getUserById(params.id);
        setFormData(user)
      })
    }
  },[])

  const handleOnSave = (e) => {
    formData.id = params.id
    updateUser(formData);
    window.location.reload();
  }
  
  return (
    <div className='flex my-10'>
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
        />
      </div>

      <div className="mb-4">
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
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick = {handleOnSave}>Salvar</button>

      </div>
      {/* //TODO ver o que vamos mostrar de um pedido */}
      <UserOrders userId = {params.id}/> 
    </div>
   
  );
};

export default ProfileEditComponent;
