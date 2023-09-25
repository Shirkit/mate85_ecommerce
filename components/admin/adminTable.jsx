import Link from "next/link"

// Adicionar server actions aqui para editar e deletar
export async function AdminTable({title,headers,data,actions}) {
  "use server"
  console.log(actions)
  return (

    
    <div className="m-2 bg-zinc-700 p-8 text-white border-solid rounded-lg h-fit">

      <h1 className="text-2xl font-bold mb-4 border-b-zinc-600 border-b">{title}</h1>

      

      <table className="min-w-full border-collapse border border-gray-300">
        <thead >
          
          <tr className="bg-gray-100 text-black">

            {headers.map((header) => {
              return (
                <th className="border p-4">{header}</th>
              )
            })}
         
          </tr>
        </thead>
        <tbody>

        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(row).map((key) => (
              <td key={key} className="border p-4">
                {row[key]}
              </td>
            ))}
              <td className="border p-4">
            {actions.map((action, index) => (
              <Link href={action.dest.replace('$1', row.id)}>
                <button className={"bg-" + action.color + "-500 hover:bg-" + action.color + "-700 text-white font-bold py-2 px-4 mr-2"}>
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
  )
}
