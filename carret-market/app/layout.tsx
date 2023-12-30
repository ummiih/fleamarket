"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from "@/components/Navigation";
import {RecoilRoot} from "recoil";

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: '강황마켓',
//   description: '강황마켓에 오신걸 환영합니다!',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <html lang="en">
      <body className={inter.className}>
      <RecoilRoot>
            <Navigation>
                {children}
            </Navigation>
      </RecoilRoot>
      </body>
      </html>
  )
}
