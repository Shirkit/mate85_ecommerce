import { Button } from "@/components/ui/button"
import { updateProduct } from './actions'

export function UpdateProduct(){
    
    return (
        <form action={updateProduct}>
            <h2>Editar Produto</h2>
            <input type="text" name="id" placeholder="Id do produto"/>
            <input type="text" name="nome" placeholder="Novo nome do produto"/>
            <Button>
                Atualizar
            </Button>
        </form>
    )
}