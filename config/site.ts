export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: " ",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Главная",
      href: "/",
    },
    {
      title: "Посты",
      href: "/publications",
      // disabled: true
    },
    {
      title: "Услуги",
      href: "/services",
    },
    {
      title: "Проекты",
      href: "/cases",
    },
  ],
  links: {
    // twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
