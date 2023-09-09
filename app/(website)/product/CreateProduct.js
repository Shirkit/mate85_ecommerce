import { Button } from '@/components/ui/button';
import { createProduct } from './actions';

export function CreateProduct() {
    
    return (
        <form action={createProduct}>
            <h2>Novo produto</h2>
            <input
                type="text"
                name="nome"
                placeholder="Nome do produto"
            />
            <Button>
                Criar
            </Button>
        </form>
    );
}
