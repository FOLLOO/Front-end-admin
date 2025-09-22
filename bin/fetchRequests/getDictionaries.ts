import {toast} from "sonner";
import {BASE_URL, BASE_PORT} from "@/bin/utils";


export class Dictionaries{
  private url: string;
  constructor() {
     this.url = `${BASE_URL}:${BASE_PORT}/api`;
  }

  async getAll(database: string) {
    try{
      const res = await fetch(`${this.url}/${database}`, {
        method: 'GET',
      })
      if (res.ok) {
        const data = await res.json();
        toast('Service created successfully.!', {
          description: 'Please say thank you to Sairommef',
        });
        return data; // <--- добавьте это
      }
      else {
        toast('Error with server!', {
          description: 'The data is not empty please check the connecting to server or LAN or server data, or hit Nafis on the back of the head',
        });
        return []; // <--- чтобы не было undefined
      }
    }catch(e: any){
      toast('Something went wrong!', {
        description: 'Logs was send on console',
      });
      return []; // <--- чтобы не было undefined
    }
  }

  async create(database: string, data: Record<string, any>) {
    try{
      const res = await fetch(`${this.url}/${database}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
      if (res.ok) {
        const data = await res.json();
        toast('Service created successfully.!', {
          description: 'Please say thank you to Sairommef',
        });
        return data; // <--- добавьте это
      }
      else {
        toast('Error with server!', {
          description: 'The data is not empty please check the connecting to server or LAN or server data, or hit Nafis on the back of the head',
        });
        return []; // <--- чтобы не было undefined
      }
    }catch(e: any){
      toast('Something went wrong!', {
        description: 'Logs was send on console',
      });
      return []; // <--- чтобы не было undefined
    }
  }
}

