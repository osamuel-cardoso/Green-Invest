import type { Metadata } from 'next'

import { aspekta } from '@/fonts/aspekta'
import './globals.css'

export const metadata: Metadata = {
    title: 'Blog · Green Invest',
    description: 'Blog da Green Invest.',
}

export default function Root({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-br" className={`${aspekta.variable} antialiased`}>
            <body className="isolate">{children}</body>
        </html>
    )
}
