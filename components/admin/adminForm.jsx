import { Button } from "@/components/ui/button";
import { prisma } from "@/utils/prisma";
import { EditIcon } from "lucide-react";

export function AdminForm(props) {

  return (
    <div className="bg-white p-8 mt-5 mb-3 text-gray-600 rounded-lg shadow-lg rounded-lg h-fit w-fit w-6/12" >

      <h1 className="text-2xl font-bold mb-4 border-b-zinc-600 border-b flex flex-nowrap"><EditIcon className="mx-2" /> {props.formTitle}</h1>
      <form action={props.action}>
        {props.fields.map((field) => {

          return (

            // eslint-disable-next-line react/jsx-key
            <div className="m-4">
              <label className="block mb-2" htmlFor="name">{field.label}</label>

              {field.type == "select" ? (
                <select name={field.name} value={field.value} className="bg-gray-800 text-white p-2 rounded-md w-full">
                  {field.options.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea className="bg-neutral-300 text-black p-2 rounded-md w-full" value={field.value} name={field.name} rows={4} cols={40} />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  placeholder={field.placeholder}
                  className="bg-neutral-300 text-black p-2 rounded-md w-full"
                />
                //TODO arrumar value hidden para atualização e mostrar value no editform
              )}

            </div>
          )
        })}

        <Button className="ml-5 mt-3 text-white" variant="form" size="lg">{props.buttonLabel}</Button>
      </form>
    </div>
  )
}


