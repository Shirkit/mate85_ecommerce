import { Button } from "@/components/ui/button";

const categorias = await prisma.ProductCategory.findMany()

export function AdminForm(props) {

  return (
    <div className="bg-zinc-700 p-8 text-white border-solid rounded-lg h-fit" >

      <h1 className="text-2xl font-bold mb-4 border-b-zinc-600 border-b">{props.formTitle}</h1>
      <form action={props.action}>
        {props.fields.map((field) => {

          return (

            <div className="mb-4">
              <label className="block mb-2" htmlFor="name">{field.label}</label>

              {(() => {
                if (field.type == 'select'){
                    return (
                      <select name={field.name} className="bg-gray-800 text-white p-2 rounded-md w-full">
                        {categorias.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    )
                }
              
                return null;
              })()}


              {(() => {
                if (field.type != 'select'){
                    return (
                      <input
                        type={field.type}
                        name={field.name}
                        className="bg-gray-800 text-white p-2 rounded-md w-full"
                      />
                    )
                }
              
                return null;
              })()}
              
            </div>
          )
        })}

        <Button>{props.buttonLabel}</Button>
      </form>
    </div>
  )
}


