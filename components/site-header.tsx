"use client"

import Link from "next/link"
import { useState } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Dictionary</span>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <MainNav items={siteConfig.mainNav} />
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex sm:items-center sm:space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost",
                }),
                "hover:bg-accent hover:text-accent-foreground transition-colors",
              )}
            >
              <Icons.gitHub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>

          <ThemeToggle />

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container py-4 space-y-3">
          {siteConfig.mainNav?.map((item, index) => (
            <Link
              key={index}
              href={item.href || "/"}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Icons.gitHub className="h-5 w-5 mr-2" />
            GitHub
          </Link>
        </div>
      </div>
    </header>
  )
}
