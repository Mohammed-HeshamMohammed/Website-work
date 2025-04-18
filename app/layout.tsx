import { Inter } from "next/font/google"
import { PageTransition } from "@/components/page-transition"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import "./globals.css"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}