import { Button } from "@/components/ui/button";
import { asyncCreateProductCategory } from "./action";

export function CreateProductCategory() {
  return (
    <form action={asyncCreateProductCategory}>
      <h2>Nova Categoria</h2>
      <input type="text" name="nome" placeholder="Categoria" />
      <Button>Criar</Button>
    </form>
  );
}
