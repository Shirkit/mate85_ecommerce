"use client"
import Link from "next/link"
import { SearchProduct } from "@/components/SearchProduct"
import { useEffect, useState } from "react"

// Adicionar server actions aqui para editar e deletar
export function AdminTable(props) {
  const [filterValue, setFilterValue] = useState('')
  const [propsData, setPropsData] = useState([])

  useEffect(() => {
    if (filterValue) {
      setPropsData(props.data.filter(el => {
        return el.name.toLowerCase().includes(filterValue.toLowerCase())
      }))
    }
  }, [filterValue])

  useEffect(() => {
    if (props.data) {
      setPropsData(props.data)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      {props.hasSearchBar &&
        <SearchProduct
          placeholder="Pesquisa pelo nome"
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          className='w-3'
        />
      }

      <div className="m-2 bg-white p-8 text-zin-700 border-solid rounded-lg h-fit">

        <h1 className="text-2xl font-bold mb-4 border-b-zinc-600 border-b">{props.title}</h1>
        <table className="min-w-full border-collapse border border-gray-300">

          <thead >
            <tr className="bg-gray-100 text-black">
              {props.headers.map((header) => {
                return (
                  <th className="border p-4">{header}</th>
                )
              })}

            </tr>
          </thead>

          <tbody>
            {propsData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(row).map((key) => (
                  <td key={key} className="border p-4">
                    {row[key]}
                  </td>
                ))}
                <td className="border p-4">
                  {props.actions.map((action, index) => (
                    <Link href={action.dest.replace('$1', row.id)}>
                      <button className={"bg-" + action.color + "-500 hover:bg-" + action.color + "-700 text-zin-900 font-bold py-2 px-4 mr-2"}>
                        {action.name}
                      </button>
                    </Link>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
