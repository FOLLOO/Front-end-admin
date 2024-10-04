'use client'

import React from 'react';
import Editor from "@/components/editor/editor";
import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";


export default function Page() {

  const [count, setCount] = React.useState(1);
  const [projects, setProjects] = React.useState(1);
  const [checkboxes, setCheckboxes] = React.useState(1);

  const toggleClick = () => {
    if (count === 3) {
      toast("Number of posts exceeded!", {
        description: new Date().toLocaleDateString("en-US"),
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    }
    else setCount(count + 1);
  }

  const toggleProjects = () => {
    if (projects === 5) {
      toast("Number of projects exceeded!", {
        description: new Date().toLocaleDateString("en-US"),
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    }
    else setProjects(projects + 1);
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Create Service
      </h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="type">Type of Service</Label>
        <Input type="text" id="type" placeholder="Type of Service"  />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="definition">Type's definition</Label>
        <Input type="text" id="definition" placeholder="Definition"  />
      </div>

      <h1 className="text-xl font-extrabold leading-tight tracking-tighter md:text-2xl">
          Params
      </h1>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        {Array.from({length: checkboxes}, (_, index) => (
          <div className={'flex flex-col gap-1'}>
          <Input type="text" placeholder="Title"  />
          <Input type="text" placeholder="Description"  />
          </div>
        ))}
        <div className={'flex-auto '}>
          <Button variant="outline" onClick={() => setCheckboxes(checkboxes + 1)}>Add</Button>
          <Button variant="outline" onClick={() => setCheckboxes(checkboxes - 1)}>Delete</Button>
        </div>
      </div>

      <h1 className="text-xl font-extrabold leading-tight tracking-tighter md:text-2xl">
        Related Posts
      </h1>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        {Array.from({length: count}, (_, index) => (
          <Input type="text" placeholder="URL" />
        ))}
        <div className={'flex-auto '}>
          <Button variant="outline" onClick={toggleClick} >Add</Button>
          <Button variant="outline" onClick={() => setCount(count - 1)}>Delete</Button>
        </div>
      </div>

      <h1 className="text-xl font-extrabold leading-tight tracking-tighter md:text-2xl">
        Related Projects
      </h1>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        {Array.from({length: projects}, (_, index) => (
          <Input  type="text" placeholder="URL" />
        ))}
        <div className={'flex-auto '}>
          <Button variant="outline" onClick={toggleProjects}>Add</Button>
          <Button variant="outline" onClick={() => setProjects(projects - 1)}>Delete</Button>
        </div>
      </div>


    </section>
  );
};

