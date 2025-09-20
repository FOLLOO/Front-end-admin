'use client'
import React from 'react';
import { usePathname } from 'next/navigation';

import {Table, TableCell, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import { dictionaries } from '../../../config/site'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dictionaries } from '@/bin/fetchRequests/getDictionaries';


export default function Page() {
  
  type DictioryType = {
    id: number;
    name: string;
  };

  const [data, setData] = React.useState<DictioryType[]>([]);
  const [sortedData, setSortedData] = React.useState<DictioryType[]>([])
  const [inputValue, setInputValue] = React.useState("");
  
  const pathname = usePathname();
  const handleClick = () => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSortedData(filteredData);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setInputValue(value);

    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSortedData(filteredData);
  };

  async function fetchData() {
    const dictionaries = new Dictionaries();
    try {
      const res = await dictionaries.getAll(pathname.split('/')[2]);
      setData(res);
      setSortedData(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);



  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              {(dictionaries as any)[pathname.split('/')[2]]} <br className="hidden sm:inline" />
      </h1>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="search" placeholder="Поиск" onChange={(e) => onChange(e)} value={inputValue}/>
        <Button type="submit" variant="default" onClick={handleClick}>
          Найти
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Дата редактирования</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData && sortedData.length > 0 && sortedData.map((item) => (
          <TableRow>
              {Object.keys(item).map((key, index) => (
                (key === 'createdAt' || key === 'updatedAt' ? (
                  <TableCell key={key}>{new Date((item as any)[key]).toLocaleDateString()}</TableCell>
                ) : (
                <TableCell key={key}>{(item as any)[key]}</TableCell>
                )
              )))}
          </TableRow>
          ))}
        </TableBody>
      </Table>

      
    </section>
  );
};