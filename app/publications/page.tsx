// 'use client'
import React from 'react';
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {Table, TableCell, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export default function Page() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Publications <br className="hidden sm:inline" />
        {/*Add some tablets here, please.*/}
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>


      <Pagination className={'flex justify-end'}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" translate={'yes'}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>



      <div className="flex gap-4">
      <Link href={'/publications/create'} className={buttonVariants()}>
        Добавить пост
      </Link>
      </div>
    </section>
  );
};

