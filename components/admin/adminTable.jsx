

export async function AdminTable({title,headers,data}) {
  "use server"
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
            {/* <th className="border p-4">Name</th>
            <th className="border p-4">Email</th>
            <th className="border p-4">Actions</th> */}
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4">
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>


    </div>
  )
}
