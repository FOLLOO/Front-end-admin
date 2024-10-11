import React from "react";
// import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {toast} from "sonner";

// eslint-disable-next-line react-hooks/rules-of-hooks
// const {toast} = useToast()

export async function deleteTags(id: string) {
  if (id === null) {
    toast(`id is can't be NULL!`, {
      description: new Date().toLocaleDateString("ru-RU"),
    })
  }
  try {
    const res = await fetch(`http://192.168.0.101:5000/api/post/deleteTag/${id}`, {
      method: 'DELETE',
    })
    if (res.status === 200) {
      toast(`tag is deleted successfully!`,{
        description: new Date().toLocaleDateString("ru-RU"),
      })
    }
    else {
      toast( `Doesn't work!`,{
        description: new Date().toLocaleDateString("ru-RU"),
      })
    }
  } catch (e) {
    toast(`tag is deleted successfully!`,{
      description: 'Something failed, then i tried to delete tag, sorry',
    })
  }
}
