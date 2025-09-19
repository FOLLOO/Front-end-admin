import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users,  User, Medal, TypeIcon, Library, Factory, Star, Swords } from "lucide-react"

const dictionaries = [
  {
    title: "Степень износа",
    description: "Степень износа предмета. Например: После полевых испытаний, Прямо с завода, Закаленное в боях, и т.д.",
    href: "/dictionaries/degree_of_wear",
    icon: Factory,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Коллекции",
    description: "Коллекции предметов в игре. Например: Коллекция «Кейс Гамбит», Коллекция «Кейс Prisma 2», и т.д.",
    href: "/dictionaries/collections",
    icon: Library,
    color: "text-red-600 dark:text-red-400",
  },
  {
    title: "Редкость",
    description: "Редкость предмета. Например: Промо, Базовая, Армейская, и т.д.",
    href: "/dictionaries/rarity",
    icon: Star,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Тип объектов",
    description: "Принадлежность предмета к определенному типу. Например: Оружие, Наклейка, Перчатки, и т.д.",
    href: "/dictionaries/type_of_objects",
    icon: TypeIcon,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Тип оружий",
    description: "Тип оружия в игре. Например: Пистолет, Винтовка, Дробовик, и т.д.",
    href: "/dictionaries/technical",
    icon: Swords,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Турниры",
    description: "Турниры, в которых участвовали профессиональные игроки. Например: ESL One Cologne 2021, PGL Major Stockholm 2021, и т.д.",
    href: "/dictionaries/slang",
    icon: Medal,
    color: "text-pink-600 dark:text-pink-400",
  },
    {
    title: "Тип материалов",
    description: "Тип материалов стикеров. Например: Металл, Дерево, Пластик, и т.д.",
    href: "/dictionaries/slang",
    icon: TypeIcon,
    color: "text-red-600 dark:text-red-400",
  },
    {
    title: "Профессиональные игроки",
    description: "Профессиональные игроки, участвующие в турнирах. Например: s1mple, ZywOo, NiKo, и т.д.",
    href: "/dictionaries/slang",
    icon: User,
    color: "text-red-600 dark:text-red-400",
  },
    {
    title: "Команды",
    description: "Профессиональные команды, участвующие в турнирах. Например: Natus Vincere, G2 Esports, FaZe Clan, и т.д.",
    href: "/dictionaries/slang",
    icon: Users,
    color: "text-purple-600 dark:text-purple-400",
  },
]

export default function DictionaryHub() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Роутинг по простым сущностям</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Простые справочники, которые можно использовать в различных частях административной панели для обеспечения
              согласованности данных и улучшения пользовательского опыта.
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
                <Card className="h-full border-2 transition-all duration-200 hover:border-primary/50 hover:shadow-lg group-focus:border-primary/50 group-focus:shadow-lg">
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
