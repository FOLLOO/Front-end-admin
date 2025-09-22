export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "STEAM API Admin",
  description:
    "Это административная панель, разработанная на Next.js с использованием компонентной библиотеки shadcn/ui. Панель предоставляет удобный интерфейс для управления данными и конфигурациями проекта",
  mainNav: [
    {
      title: "Главная",
      href: "/",
    },
    {
      title: "Словари",
      href: "/dictionaries",
      // disabled: true
    },
    {
      title: "Сущности",
      href: "/main_tables",
    },
    {
      title: "Другие проеткы или (Профиль)",
      href: "/user",
    },
  ],
  links: {
    // twitter: "https://twitter.com/shadcn",
    github: "https://github.com/FOLLOO/Front-end-admin",
    docs: "https://ui.shadcn.com",
    server: "https://ui.shadcn.com",
    bot: "https://ui.shadcn.com",
    obsidian: "https://ui.shadcn.com",
    mySQL: "https://ui.shadcn.com",
  },
}

export const dictionaries = {
    degree_of_wear: "Степени износа",
    collections: "Коллекции",
    collection: "Коллекця",
    rarity: "Редкости",
    rare: "Редкость",
    type_of_objects: "Типы объектов",
    type_of_object: "Тип объекта",
    type_of_weapons: "Типы оружий",
    type_of_weapon: "Типы оружя",
    tournaments: "Турниры",
    tournament: "Турнир",
    isStarTrack: "StarTrack",
    name: "Наименование",
    id: "ID",
    type_of_materials: "Типы материалов",
    pro_players: "Профессиональные игроки",
    teams: "Команды",
    inventories: "Инвентари",
    inventory_items: "Предметы в инвентаре",
    items: "Предметы",
    containers: "Кейсы",
    agents: "Агенты",
    agency: "Агенты",
    weapons: "Оружия",
    stickers: "Стикеры",
    prices: "Цены",
    createdAt: "Дата создания",
    updatedAt: "Дата обнолвения",
    users: 'Пользователи'
}

