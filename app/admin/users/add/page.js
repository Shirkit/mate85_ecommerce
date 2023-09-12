"use client"
import {createUser} from "@/app/admin/users/manage/actions";
import {AdminForm} from "@/components/admin/adminForm"

const dummyFunction = () => {
    return;
}


export default function AddEditUser() {
    const fields = [{
        "name" : "username",
        "label": "Nome do Usuário",
        "type":"text",
      },
      
      {
        "name": " email",
        "label": "Email",
        "type":"text"
      },

      {
        // Mudar endereço
        "name": "address",
        "label": "Endereço",
        "type":"text"
      },
      ];
    return (
        <div className="flex justify-center w-full items-center">
            <AdminForm  formTitle ="Adicionar Usuário" action ={createUser} fields = {fields} buttonLabel = "Criar Usuário"/>
        </div>
    )
}