'use client'
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";


// import styles from './tags-data.module.css'

export default function TagsData({data}: {data: any}) {

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Tags list <br className="hidden sm:inline"/>
        {/*Add some tablets here, please.*/}
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Updated at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: string, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</TableCell>
              <TableCell className="text-right">{new Date(item.updatedAt).toLocaleDateString('ru-RU')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

