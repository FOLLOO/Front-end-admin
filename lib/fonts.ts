import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const myFont = localFont({
  src: [
    {
      path: "../fonts/Sora.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sans", // совпадает с fontSans
})
