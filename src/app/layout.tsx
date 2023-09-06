import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'

const roboto_Mono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodeVif',
  description: 'App created by aBgAmeuR',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${roboto_Mono.className} flex min-h-screen flex-col items-center justify-between p-8 bg-background overflow-hidden`}>{children}</body>
    </html>
  )
}

