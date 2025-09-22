'use client'
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import {Toaster} from "@/components/ui/sonner";
import * as React from "react";

export default function IndexPage() {
  return (
      <section className="container flex flex-col p items-start gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Это административная панель,<br className="hidden sm:inline" />
            разработанная на Next.js <br className="hidden sm:inline" />   
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            с использованием компонентной библиотеки shadcn/ui.  
            Панель предоставляет удобный интерфейс для управления данными и конфигурациями проекта.
          </p>
          <p className="max-w-[700px] text-lg text-foreground">
            Основные задачи админ-панели:  
          </p>
          <ul className="max-w-[700px] text-lg text-foreground">
            <li>- управление контентом сайта (добавление, редактирование, удаление)  </li>
            <li>- модерация пользовательских данных и комментариев  </li>
            <li>- быстрый доступ к настройкам проекта  </li>
            <li>- просмотр статистики и аналитики  </li>
            <li>- визуализация данных через графики и таблицы  </li>
          </ul>
        </div>
        <div className="flex gap-4 flex-wrap">
          {Object.keys(siteConfig.links).map((key, index ) => (
            <Link
              key={key}
              href={siteConfig.links[key as keyof typeof siteConfig.links]}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants()}
            >
              {key.toUpperCase()}
            </Link>
          ))}
        </div>
        <Toaster />
      </section>
  )
}
