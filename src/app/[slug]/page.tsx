import { Article } from '@/components/Layout/Blog/Article/index.layout'
import { ArticleStructuredData } from '@/components/seo/StructuredData'
import { Post } from '@/gql/generated'
import { hygraph } from '@/lib/hygraph/hygraph'
import { GET_POST_BY_SLUG, GET_POSTS } from '@/lib/hygraph/queries'
import { GetPostResponse, GetPostsResponse } from '@/types/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
    params: Promise<{ slug: string }>
}

// Gerar metadata dinâmica para cada artigo
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return {
            title: 'Artigo não encontrado | Green Invest',
            description: 'O artigo que você procura não foi encontrado.',
        }
    }

    // Extrair palavras-chave das categorias
    const keywords = [
        ...(post.category?.map((cat) => cat.title) || []),
        'energia solar',
        'investimento sustentável',
        'green invest',
        post.author?.name || 'Green Invest',
    ].join(', ')

    // Criar descrição otimizada
    const description =
        post.excerpt ||
        `${post.title}. Leia este artigo completo sobre ${post.category?.[0]?.title || 'energia solar'} no blog da Green Invest.`

    return {
        title: `${post.title} | Blog Green Invest`,
        description: description.substring(0, 160),
        keywords,
        authors: post.author
            ? [{ name: post.author.name }]
            : [{ name: 'Green Invest' }],
        openGraph: {
            title: post.title,
            description: post.excerpt || description,
            url: `https://blog.greeninvest.com.br/${post.slug}`,
            siteName: 'Green Invest',
            images: post.coverImage
                ? [
                      {
                          url: post.coverImage.url,
                          width: post.coverImage.width || 1200,
                          height: post.coverImage.height || 630,
                          alt: post.title,
                      },
                  ]
                : [
                      {
                          url: '/og-default.jpg',
                          width: 1200,
                          height: 630,
                          alt: 'Green Invest',
                      },
                  ],
            locale: 'pt_BR',
            type: 'article',
            publishedTime: post.publishedAt || undefined,
            modifiedTime: post.updatedAt || post.publishedAt || undefined,
            authors: post.author ? [post.author.name] : ['Green Invest'],
            tags: post.category?.map((cat) => cat.title),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || description,
            images: [post.coverImage?.url || '/twitter-default.jpg'],
            creator: '@greeninvest',
        },
        robots: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
        },
        alternates: {
            canonical: `https://blog.greeninvest.com.br/${post.slug}`,
        },
    }
}

// Gerar paths estáticos para ISR
export async function generateStaticParams() {
    try {
        const { posts } = await hygraph.request<GetPostsResponse>(GET_POSTS, {
            quantity: 100,
        })

        return posts.map((post) => ({
            slug: post.slug,
        }))
    } catch (error) {
        console.error('Erro ao gerar paths estáticos:', error)
        return []
    }
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        const { post } = await hygraph.request<GetPostResponse>(
            GET_POST_BY_SLUG,
            { slug }
        )
        return post
    } catch (error) {
        console.error('Erro ao buscar post:', error)
        return null
    }
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <>
            <ArticleStructuredData post={post} />
            <Article params={params} />
        </>
    )
}
