
"use client";

import { Button } from "@/components/ui/button"
// import { createPlayground } from "@/features/playground/actions";
import { Plus } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react"
import TemplateSelectionModal from "./template-selecting-modal";
import { createPlayground } from "../actions";
import { toast } from "@/components/ui/toast";
// import { toast } from "sonner";

const AddNewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    title: string;
    description?: string;
    template: "NEXTJS" | "REACT" | "EXPRESS" | "ANGULAR" | "VUE" | "HONO" | null
  } | null>(null);

  const router = useRouter();

  const handleSubmit = async(data:{
    title: string;
    description?: string;
    template: "NEXTJS" | "REACT" | "EXPRESS" | "ANGULAR" | "VUE" | "HONO" 
  })=>{
    setSelectedTemplate(data)

    const res = await createPlayground(data)
    toast.add({
      title: "Playground created successfully",
      type: "success",
    })
    setIsModalOpen(false)
    router.push(`/playground/${res?.id}`)
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
        transition-all duration-300 ease-in-out
        hover:bg-background hover:border-[#17B8A6] hover:scale-[1.02]
        shadow-[0_2px_10px_rgba(0,0,0,0.08)]
        hover:shadow-[0_10px_30px_rgba(233,63,63,0.15)]"
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Button
            variant={"outline"}
            className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#17B8A6] group-hover:text-[#17B8A6] transition-colors duration-300"
            size={"icon"}
          >
            <Plus size={30} className="transition-transform duration-300 group-hover:rotate-90" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#17B8A6]">Add New</h1>
            <p className="text-sm text-muted-foreground max-w-[220px]">Create a new playground</p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={"/add-new.svg"}
            alt="Create new playground"
            width={150}
            height={150}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      {/* todo : template selecting model */}
      <TemplateSelectionModal
      isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default AddNewButton