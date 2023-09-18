import { Button } from "@/components/ui/button";

export function AdminForm(props) {

  return (
    <div className="bg-zinc-700 p-8 text-white border-solid rounded-lg h-fit" >

      <h1 className="text-2xl font-bold mb-4 border-b-zinc-600 border-b">{props.formTitle}</h1>
      <form action={props.action}>
        {props.fields.map((field) => {

          return (
            <div className="mb-4">
              <label className="block mb-2" htmlFor="name">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                className="bg-gray-800 text-white p-2 rounded-md w-full"
              />
            </div>
          )
        })}

        <Button>{props.buttonLabel}</Button>
      </form>
    </div>
  )
}


