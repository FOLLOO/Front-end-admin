'use client'

import React from 'react';

import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {BASE_PORT, BASE_URL} from "@/bin/utils";

export default function Page() {

  const [tags, setTags] = React.useState(1);
  const [namespace, setNamespace] = React.useState<string[]>([]);
  const toggleClick = () => {
    if (tags === 10) {
      toast("Number of posts exceeded!", {
        description: new Date().toLocaleDateString("en-US"),
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    } else setTags(tags + 1);
  }

   async function POST(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    for(let i = 0; i < namespace.length; i++) {
      try{
      const res = await fetch(`http://192.168.0.101:5000/api/post/createTag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tagName: namespace[i] }),
      })
        toast(`${namespace[i]} created!`, {
          description: new Date().toLocaleDateString("en-US"),
          action: {
            label: "OK",
            onClick: () => console.log("OK"),
          },
        })
     } catch (e){
       console.log('Something went wrong');
     }
    }
  }

  // async function POST_tags(e){
  //   e.preventDefault();
  //   console.log(namespace)
  // }


  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Create Tags
      </h1>

      <h1 className="text-xl font-extrabold leading-tight tracking-tighter md:text-2xl">
        Add Tags
      </h1>

      <form className="grid w-full max-w-sm items-center gap-1.5" onSubmit={(e) => POST(e)}>
        {Array.from({length: tags}, (_, index) => (
          <Input type="text" placeholder="Name" key={index} required
            onChange={(e) => namespace[index] = e.target.value}
          />
        ))}
        <div className={'flex-auto '}>
          <Button variant="outline" type={'button'} onClick={toggleClick}>Add</Button>
          <Button variant="outline" type={'button'} onClick={() => setTags(tags - 1)}>Delete</Button>
          <Button variant="default" type={'submit'}>Save</Button>
        </div>
      </form>

    </section>
  );
};


