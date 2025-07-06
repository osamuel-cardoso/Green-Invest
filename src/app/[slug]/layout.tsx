import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default async function Layout({
    children,
}: Readonly<{
    params: {
        slug: string
    }
    children: React.ReactNode
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
