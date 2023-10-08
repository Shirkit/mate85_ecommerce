import { AdminForm } from "@/components/admin/adminForm"

const dummyFunction = async () => {
  "use server"
  return;
}


export default function AddEditUser() {
  const fields = [{
    "name": "username",
    "label": "Nome do Usuário",
    "type": "text",
  },

  {
    "name": " email",
    "label": "Email",
    "type": "text"
  },

  {
    // Mudar endereço
    "name": "address",
    "label": "Endereço",
    "type": "text"
  },
  ];
  return (
    <div className="flex justify-center w-full items-center">
      <AdminForm formTitle="Adicionar Usuário" action={dummyFunction} fields={fields} buttonLabel="Criar Usuário" />
    </div>
  )
}