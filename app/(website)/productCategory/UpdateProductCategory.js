import { Button } from "@/components/ui/button";
import { updateProductCategory } from "./action.js";

export function UpdateProductCategory() {
  return (
    <form action={updateProductCategory}>
      <h2>Editar Categoria</h2>
      <input type="text" name="id" placeholder="Id do Categoria" />
      <input type="text" name="nome" placeholder="Nova Categoria" />
      <Button>Atualizar</Button>
    </form>
  );
}
