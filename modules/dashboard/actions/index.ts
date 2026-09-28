"use server"

import { db } from "@/lib/db"
import { currentUser } from "@/modules/auth/actions"
import { revalidatePath } from "next/cache"

export const getAllPlaygroundForUser = async()=>{
    const user = await currentUser()
    
    try{
        const playground = await db.playground.findMany({
            where:{
                userId : user?.id
            },
            include:{
                user : true
            }
        })
        return playground
    }
    catch(error){
        console.log(error)
    }
}

export const createPlayground = async(data : {
    title : string,
    description? : string,
    template : "NEXTJS" | "REACT" | "EXPRESS" | "ANGULAR" | "VUE" | "HONO"   
})=>{
    const user = await currentUser()
    const {title, description, template} = data

    try{
        const playground = await db.playground.create({
            data:{
                title:title,
                description:description,
                template : template,
                userId : user?.id!
            }
        })
        return playground
    }catch(error){
        console.log(error)
    }
}

export const deletePlaygroundById = async(id : string)=>{
    try{
        const playground = await db.playground.delete({
            where:{
                id
            }
        })
        revalidatePath("/dashboard")
        return playground
    }catch(error){
        console.log(error)
    }
}

export const editPlaygroundById = async(id : string, data : {title : string, description? : string,})=>{
    try{
        const playground = await db.playground.update({
            where:{
                id
            },
            data
        })
        revalidatePath("/dashboard")
        return playground
    }catch(error){
        console.log(error)
    }
}

export const duplicatePlaygroundById = async(id : string)=>{
    try{
        const playground = await db.playground.findUnique({
            where : {
                id
            }
        })
        if(!playground) throw new Error("Playground not found")

        const duplicatedPlayground = await db.playground.create({
            data:{
                title : `${playground.title} (copy)`,
                description : playground.description,
                template : playground.template,
                userId : playground.userId

                // todo : add template files
            }
        })
        revalidatePath("/dashboard")
        return duplicatedPlayground
    }catch(error){
        console.log(error)
    }
}

export const toggleStarMarked = async(playgroundId : string, isChecked : boolean)=>{
    const user = await currentUser()
    const userId = user?.id!
    if(!user) throw new Error("User not found")
    try{
        if(isChecked){
            await db.starmark.create({
                data:{
                    playgroundId,
                    userId : user.id!,
                    isMarked : isChecked
                }
            })
        }else{
            await db.starmark.delete({
                where:{
                    userId_playgroundId : {
                        playgroundId,
                        userId
                    }
                }
            })
        }
        revalidatePath("/dashboard")
        return {success : true , isMarked : isChecked}
    }catch(error){
        console.log("Error toggling star mark",error)
        return {success : false , error : "Failed to toggle star mark"}
    }
       

        }
