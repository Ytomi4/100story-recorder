import './globals.css'
import type { Metadata } from 'next'
import { Shippori_Mincho } from 'next/font/google'

const shippori_mincho = Shippori_Mincho({weight: "600", subsets: ['latin']})

export const metadata: Metadata = {
  title: '百物語Recorder',
  description: 'あなたの語る怪談を記録します',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={shippori_mincho.className}>{children}</body>
    </html>
  )
}
