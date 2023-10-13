'use server'

import EditableTable from "@/components/admin/editableTable/editableTable"
import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import { updateProductItem } from "./actions"
import { AdminForm } from "@/components/admin/adminForm"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"


export default async function productItem({params}) {

    const product_items = await prisma.productItem.findMany({
        where: {
            product_id: parseInt(params.id)
        }
    })

    const actions = [
        {
          name: 'Edit',
          color: 'blue',
          dest: '/admin/products/[id]/productsItem/[sku]',
          action: {updateProductItem}
        }
      ];

    console.log(product_items)

    const headers = ["sku", "product_id", "size", "amount", "price"]
    return (
        <div>
            {/* <form action = {updateProductItem} id="send_form"> */}
                <div class="w-full text-sm text-center text-zinc-600">
                    <div class="text-xs uppercase bg-neutral-200 text-zinc-900">
                        <div>
                            {headers.map((header) => (
                                <th key={header} scope="col" class="px-6 py-3 w-fit">
                                    {header}
                                </th>
                            ))}
                        </div>
                    </div>
                    <div>
                        {product_items.map((item) => (
                            <form action = {updateProductItem}>
                                <div class="border-b bg-white border-neutral-300">
                                    <td class="px-6 py-4">
                                        <input
                                            class="px-6 py-4"
                                            type="text"
                                            name="sku"
                                            value={item.sku}
                                            readOnly
                                        />
                                    </td>
                                
                                    <td class="px-6 py-4">
                                        <input
                                            class="px-6 py-4"
                                            type="text"
                                            name="product_id"
                                            value={item.product_id}
                                            readOnly
                                        />
                                    </td>
                                
                                    <td class="px-6 py-4">
                                        <input
                                            class="px-6 py-4"
                                            type="text"
                                            name="size"
                                            defaultValue={item.size}
                                        />
                                    </td>
                                
                                    <td class="px-6 py-4">
                                        <input
                                            class="px-6 py-4"
                                            type="text"
                                            name="amount"
                                            defaultValue={item.amount}
                                        />
                                    </td>
                                
                                    <td class="px-6 py-4">
                                        <input
                                            class="px-6 py-4"
                                            type="text"
                                            name="price"
                                            defaultValue={item.price}
                                        />
                                    </td>
                                

                                    <td class="px-6 py-4">
                                        <Button>
                                            <Edit2></Edit2>
                                        </Button>
                                    </td>
                                </div>
                            </form>
                        ))}
                    </div>
                </div>
            {/* </form> */}
        </div>
        
        
        
        // <div>
        //     {product_items.map((prods) => {
        //         return (
        //             <form action = {updateProductItem}>
                        // <input
                        //     type="text"
                        //     name="sku"
                        //     value={prods.sku}
                        //     readOnly
                        // />
                        // <input
                        //     type="text"
                        //     name="product_id"
                        //     value={prods.product_id}
                        //     readOnly
                        // />
                        // <input
                        //     type="text"
                        //     name="size"
                        //     defaultValue={prods.size}
                        // />
                        // <input
                        //     type="text"
                        //     name="amount"
                        //     defaultValue={prods.amount}
                        // />
                        // <input
                        //     type="text"
                        //     name="price"
                        //     defaultValue={prods.price}
                        // />
                        // <Button>
                        //     <Edit2></Edit2>
                        // </Button>

        //             </form>
        //         )
        //     })}
            
        // </div>
    )
}