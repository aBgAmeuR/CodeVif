import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'

const roboto_Mono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodeVif',
  description: 'App created by aBgAmeuR',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={roboto_Mono.className}>{children}</body>
    </html>
  )
}
