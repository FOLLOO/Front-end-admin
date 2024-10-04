// 'use client'
import React from 'react';
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import Editor from "@/components/editor/editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// import styles from './page.module.css'

export default function Page() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Create Publication
      </h1>


      <div className="container p-0">
      <Editor/>
      </div>
    </section>
  );
};

