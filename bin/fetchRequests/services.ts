import React from "react";
import {Service_create} from "@/types/types";
import {toast} from "sonner";


export async function getServices() {
  try {
    const res = await fetch(`http://192.168.0.100:5000/api/post/getServices`, {
      method: 'GET',
    })
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (e) {
    console.log('Нет подключения к серверу @Сервисы@')
  }
}

/**
 * Создание сервиса.
 * @param {Service_create[]} data - Данные для отправки, по-умолчанию на сервере принимает изображение, поэтому должна быть FormData.
 * @throws {Error} - Если данные отправлены неверно, либо они пустые, или ошибка на стороне сервера.
 */
export async function createServices(data: FormData) {
  try{
    if (data === undefined || data === null) {
      toast('Data is coming NULL!', {
        description: 'The data is empty please check the correctness of the data entered, or hit Nafis on the back of the head',
      });
    }
    const res = await fetch(`http://192.168.0.100:5000/api/post/createService`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: data,
    })
    if (res.ok) {
      toast('Service created successfully.!', {
        description: 'Please say thank you to Sairommef',
      });
      console.log(res.json())
    }
    else {
      toast('Error with server!', {
        description: 'The data is not empty please check the connecting to server or LAN or server data, or hit Nafis on the back of the head',
      });
      console.log(res.json())
      console.log(res)
    }

  }catch(e: any){
    toast('Something went wrong!', {
      description: 'Logs was send on console',
    });
    console.log('error to creating service', + '\n', + e)
  }
}
