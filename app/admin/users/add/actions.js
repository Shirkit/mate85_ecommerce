

import { prisma } from "@prisma/client";
import { Redirect } from "next/navigation";

async function createUser(data){
  "use server"
  
  await prisma.user.create({
    data:{
      name : data.get("username"),
      email : data.get("email"),
      address : data.get("address")
    }
  })

  revalidatePath("/admin/user/manage");
}

