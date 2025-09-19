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
      href: "/services",
    },
    {
      title: "Другие проеткы или (Профиль)",
      href: "/cases",
    },
  ],
  links: {
    // twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
    server: "https://ui.shadcn.com",
    bot: "https://ui.shadcn.com",
    obsidian: "https://ui.shadcn.com",
    mySQL: "https://ui.shadcn.com",
  },
}
