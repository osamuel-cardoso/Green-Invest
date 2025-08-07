import { aspekta } from '@/fonts/aspekta'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    metadataBase: new URL('https://blog.greeninvest.com.br'),
    title: {
        default:
            'Blog Green Invest | Energia Solar e Investimentos Sustentáveis',
        template: '%s | Green Invest',
    },
    description:
        'Blog da Green Invest - Tudo sobre investimento em energia solar, sustentabilidade e rentabilidade garantida.',
    generator: 'Next.js',
    applicationName: 'Green Invest Blog',
    referrer: 'origin-when-cross-origin',
    authors: [{ name: 'Green Invest', url: 'https://greeninvest.com.br' }],
    creator: 'Green Invest',
    publisher: 'Green Invest',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    manifest: '/manifest.json',
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [{ url: '/apple-touch-icon.png' }],
    },
}

export default function Root({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR" className={`${aspekta.variable} antialiased`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://media.graphassets.com" />
            </head>
            <body className="isolate">{children}</body>
        </html>
    )
}
