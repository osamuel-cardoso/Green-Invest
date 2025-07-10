import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Blog } from '@/components/Layout/Blog/index.layout'
import { Post } from '@/gql/generated'
import { hygraph } from '@/lib/hygraph/hygraph'
import { GET_LAST_POST } from '@/lib/hygraph/queries'
import { GetPostsResponse } from '@/types/blog'
import { notFound } from 'next/navigation'

async function getLastPost(): Promise<Post[] | null> {
    try {
        const { posts } = await hygraph.request<GetPostsResponse>(GET_LAST_POST)
        return posts
    } catch (error) {
        console.error('Erro ao buscar post:', error)
        return null
    }
}

export default async function Page() {
    const posts = await getLastPost()

    if (!posts) {
        notFound()
    }

    const post = posts[0]

    return (
        <>
            <Header />
            <Blog data={post} />
            <Footer />
        </>
    )
}
