import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Blog } from '@/components/Layout/Blog/index.layout'
import { ShowcaseSection } from '@/components/Layout/Blog/Showcase.section'
import { CtaSection } from '@/components/sections/Cta.section'

import { BlogStructuredData } from '@/components/seo/StructuredData'
import { Post } from '@/gql/generated'
import { hygraph } from '@/lib/hygraph/hygraph'
import { GET_LAST_POST, GET_POSTS } from '@/lib/hygraph/queries'
import { GetPostsResponse } from '@/types/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Metadata dinâmica para a home
export async function generateMetadata(): Promise<Metadata> {
    const posts = await getAllPosts()
    const latestPost = posts?.[0]

    return {
        title: 'Blog Green Invest | Energia Solar e Investimentos Sustentáveis',
        description:
            'Descubra como investir em energia solar e transformar seu futuro financeiro. Guias, análises e tendências do mercado de energia renovável.',
        keywords:
            'energia solar, investimento sustentável, usinas solares, energia renovável, green invest, investimento verde',
        openGraph: {
            title: 'Blog Green Invest | Invista no Futuro Sustentável',
            description:
                'Descubra como investir em energia solar e transformar seu futuro financeiro com a Green Invest.',
            url: 'https://blog.greeninvest.com.br',
            siteName: 'Green Invest',
            images: [
                {
                    url: latestPost?.coverImage?.url || '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Green Invest - Investimento em Energia Solar',
                },
            ],
            locale: 'pt_BR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blog Green Invest | Energia Solar e Investimentos',
            description: 'Guias e análises sobre investimento em energia solar',
            images: [latestPost?.coverImage?.url || '/twitter-image.jpg'],
            creator: '@greeninvest',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: 'https://blog.greeninvest.com.br',
            languages: {
                'pt-BR': 'https://blog.greeninvest.com.br',
            },
        },
        authors: [{ name: 'Green Invest', url: 'https://greeninvest.com.br' }],
        category: 'technology',
    }
}

async function getLastPost(): Promise<Post[] | null> {
    try {
        const { posts } = await hygraph.request<GetPostsResponse>(GET_LAST_POST)
        return posts
    } catch (error) {
        console.error('Erro ao buscar post:', error)
        return null
    }
}

async function getAllPosts(): Promise<Post[] | null> {
    try {
        const { posts } = await hygraph.request<GetPostsResponse>(GET_POSTS, {
            quantity: 50,
        })
        return posts
    } catch (error) {
        console.error('Erro ao buscar posts:', error)
        return null
    }
}

export default async function Page() {
    const lastPosts = await getLastPost()
    const allPosts = await getAllPosts()

    if (!lastPosts || !allPosts) {
        notFound()
    }

    const featuredPost = lastPosts[0]

    return (
        <>
            <BlogStructuredData posts={allPosts} />
            <Header />
            <Blog data={featuredPost} />
            <ShowcaseSection posts={allPosts} />
            <CtaSection />
            <Footer />
        </>
    )
}
