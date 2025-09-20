import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Backpack, Swords, IceCream, Box, User, Sword, Sticker, DollarSign } from "lucide-react"

const dictionaries = [
  {
    title: "Пользователи",
    description: "Пользователи системы с различными ролями и правами доступа.",
    href: "/dictionaries/users",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Инвентари",
    description: "Инвентари пользователей, кому что привязано.",
    href: "/dictionaries/inventories",
    icon: Backpack,
    color: "text-red-600 dark:text-red-400",
  },
  {
    title: "Предметы в инвентаре",
    description: "Содержание инвентарей пользователей, содержащие различные предметы и ресурсы.",
    href: "/dictionaries/inventory_items",
    icon: Swords,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Предметы",
    description: "Предметы, которые могут быть частью инвентарей пользователей.",
    href: "/dictionaries/items",
    icon: IceCream,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Кейсы",
    description: "Кейсы стикер кейсы, которые существую в игре.",
    href: "/dictionaries/containers",
    icon: Box,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Агенты",
    description: "Агенты, которые существуют в игре.",
    href: "/dictionaries/agents",
    icon: User,
    color: "text-pink-600 dark:text-pink-400",
  },
    {
    title: "Оружия",
    description: "Оружия, которые существуют в игре.",
    href: "/dictionaries/weapons",
    icon: Sword,
    color: "text-red-600 dark:text-red-400",
  },
    {
    title: "Стикеры",
    description: "Стикеры профессиональные игроков (и не только), участвующие в турнирах. Например: s1mple, ZywOo, NiKo, и т.д.",
    href: "/dictionaries/stickers",
    icon: Sticker,
    color: "text-red-600 dark:text-red-400",
  },
    {
    title: "Цены",
    description: "Изменение цен на предметы в разные периоды времени.",
    href: "/dictionaries/prices",
    icon: DollarSign,
    color: "text-purple-600 dark:text-purple-400",
  },
]

export default function DictionaryHub() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-10 z-10">
        <div className="container px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl text-start font-bold text-foreground mb-2 text-balance">Основные таблицы</h1>
            <p className="text-lg text-start text-muted-foreground text-pretty max-w-2xl ">
              Основные сущности и их атрибуты, которые используются в системе для управления данными и конфигурациями.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dictionaries.map((dictionary) => {
            const IconComponent = dictionary.icon
            return (
              <Link
                key={dictionary.title}
                href={dictionary.href}
                className="group block transition-transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
              >
                <Card className="h-full border-1 border-popover transition-all duration-200 hover:border-primary/50 hover:shadow-lg group-focus:border-primary/50 group-focus:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-muted ${dictionary.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {dictionary.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">{dictionary.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-primary font-medium group-hover:text-primary/80 transition-colors">
                      Перейти к списку
                      <svg
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
