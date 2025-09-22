'use client'
import React from 'react';
import { usePathname } from 'next/navigation';

import {Table, TableCell, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Pen } from "lucide-react"

import { dictionaries } from '../../../config/site'
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dictionaries } from '@/bin/fetchRequests/getDictionaries';
import { NothingYet } from '@/components/nothing-yeat';
import Link from 'next/link';

import { Users, Backpack, Swords, IceCream, Box, User, Sword, Sticker, DollarSign } from "lucide-react"

const types = [
  {
    title: "Пользователи",
    description: "Пользователи системы с различными ролями и правами доступа.",
    href: "/main_tables/users",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Инвентари",
    description: "Инвентари пользователей, кому что привязано.",
    href: "/main_tables/inventories",
    icon: Backpack,
    color: "text-red-600 dark:text-red-400",
  },
  {
    title: "Предметы в инвентаре",
    description: "Содержание инвентарей пользователей, содержащие различные предметы и ресурсы.",
    href: "/main_tables/inventory_items",
    icon: Swords,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Предметы",
    description: "Предметы, которые могут быть частью инвентарей пользователей.",
    href: "/main_tables/items",
    icon: IceCream,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Кейсы",
    description: "Кейсы стикер кейсы, которые существую в игре.",
    href: "/main_tables/containers",
    icon: Box,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Агенты",
    description: "Агенты, которые существуют в игре.",
    href: "/main_tables/agency",
    icon: User,
    color: "text-pink-600 dark:text-pink-400",
  },
    {
    title: "Оружия",
    description: "Оружия, которые существуют в игре.",
    href: "/main_tables/weapons",
    icon: Sword,
    color: "text-red-600 dark:text-red-400",
  },
    {
    title: "Стикеры",
    description: "Стикеры профессиональные игроков (и не только), участвующие в турнирах. Например: s1mple, ZywOo, NiKo, и т.д.",
    href: "/main_tables/stickers",
    icon: Sticker,
    color: "text-red-600 dark:text-red-400",
  },
    {
    title: "Цены",
    description: "Изменение цен на предметы в разные периоды времени.",
    href: "/main_tables/prices",
    icon: DollarSign,
    color: "text-purple-600 dark:text-purple-400",
  },
]


export default function Page() {  
  type DictioryType = {
    id: number;
    name: string;
  };

  const [data, setData] = React.useState<DictioryType[]>([]);
  const [sortedData, setSortedData] = React.useState<DictioryType[]>([])
  const [inputValue, setInputValue] = React.useState("");

  const [isNothing, setIsNothnig] = React.useState(false);
  
  const pathname = usePathname();
  const currentType = pathname.split('/')[2]; // например, 'users'

  // Найти объект типа по текущему пути
  const typeObj = types.find(
    (type) => type.href.endsWith(currentType)
  );

  // Получить компонент иконки и цвет
  const IconComponent = typeObj?.icon;
  const iconColor = typeObj?.color;



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
      if(res.length === 0){
        setIsNothnig(true);
      }
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
      <div className="flex w-full justify-between gap-2 sticky ">
        <div className='flex gap-2'>
        {IconComponent && (
          <IconComponent className={`w-10 h-10 ${iconColor}`} />
        )}
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {(dictionaries as any)[currentType]} <br className="hidden sm:inline" />
        </h1>      
        </div>

        <Link
            key={'create'}
            href={pathname + '/create'}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
            >
          Создать новую запись
          <Pen/>
        </Link>
      </div>
      {isNothing ? <NothingYet/> : <>
      <div className="flex w-full max-w-lg items-center gap-2">
        <Input type="search" placeholder="Поиск" onChange={(e) => onChange(e)} value={inputValue}/>
        <Button type="submit" variant="default" onClick={handleClick}>
          Найти
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          {/* <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Дата редактирования</TableHead>
          </TableRow> */}
            {sortedData && sortedData.length > 0 && (
              <TableRow key={sortedData[0].id}>
                {Object.keys(sortedData[0]).map((key) => {
                  // Пропустить служебные поля, если нужно
                  if (key.includes('fk')) return null;

                  // Найти ключ из словаря, который содержится в key
                  const dictKey = Object.keys(dictionaries).find(dictKey => key.includes(dictKey));
                  return (
                    <TableHead key={key}>
                      {dictKey ? (dictionaries as any)[dictKey] : key}
                    </TableHead>
                  );
                })}
              </TableRow>
            )}

        </TableHeader>
        <TableBody>
          {sortedData && sortedData.length > 0 && sortedData.map((item) => (
          <TableRow>
              {Object.keys(item).map((key) => {
                if (key === 'createdAt' || key === 'updatedAt') {
                  return (
                    <TableCell key={key}>
                      {new Date((item as any)[key]).toLocaleDateString()}
                    </TableCell>
                  );
                }
                if (key.includes('fk')) {
                  return null; // пропустить поля с 'fk'
                }
                return (
                  <TableCell key={key}>
                    {(item as any)[key]}
                  </TableCell>
                );
              })}
          </TableRow>
          ))}
        </TableBody>
      </Table>
      </>}
    </section>
  );
};