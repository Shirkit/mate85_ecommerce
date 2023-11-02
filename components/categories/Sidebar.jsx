"use client"

import Categories from "@/app/admin/products/categories/page";
import { revalidatePath } from "next/cache";
import React, { useEffect, useState,useTransition } from "react";
import {AiFillFilter} from "react-icons/ai";
import {useRouter} from "next/navigation";
import { getCategories } from "@/app/(website)/shop/actions";



const shirtSizes = ["P","M","G","GG"];

export default function Sidebar() {

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [categoryId,setCategoryId] = useState("");
  const [categoryName,setCategoryName] = useState("");
  const [isPending,startTransition] = useTransition();
  const [categories,setCategories] = useState([]);
  const router = useRouter()

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    
  }
  
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  }
  
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);

    setCategoryName(e.target.options[e.target.selectedIndex].text)
  }

  const apllyFilter = () => {
    router.push( `/shop?categoryId=${categoryId}&categoryName=${categoryName}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
  }
  
  useEffect(() => {
    if(!isPending){
      startTransition(async () => {
        const res = await getCategories();
        setCategories(res);
      });
    }
  }, [])

  return (
    <div className="text-gray h-full w-1/5 p-4 rounded-lg border-solid border">
      <div className="flex justify-between items-baseline border-b">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <AiFillFilter />
      </div>

      <div className="p-5 mb-4 border-b">
        <label className="font-bold block mb-1">Preço</label>
        
        <div className="flex justify-between mb-2">
          <input
            type="number"
            min="0"
            max="100"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-1/2 p-2 border rounded"
          />
          <span className="mx-2">-</span>
          <input
            type="number"
            min="0"
            max="100"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-1/2 p-2 border rounded"
          />
        </div>
        <label className="font-bold block mb-1">Categoria</label>

        <select onChange={handleCategoryChange}>
          {categories.map((cat) => {
            
            return (<option value={cat.id}>{cat.name}</option>)
          })}
        </select>

      </div>

      <div className="p-5 mb-4">
        <label className="font-bold block mb-1">Tamanho</label>

        <div className="my-5 flex justify-start gap-x-2.5">
          {shirtSizes.map((shirtSize, index) => {
            return (
              <div key={index} className="w-12 h-8 bg-gray-300 rounded-full flex justify-center items-center text-black text-3xs">
                {shirtSize}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={apllyFilter} className="bg-black text-white px-8 py-2 mx-auto rounded-full">Aplicar Filtro</button>
      </div>
    </div>
  );
}
