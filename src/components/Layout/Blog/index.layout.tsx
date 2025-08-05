import { Container } from '@/components/Container'
import { Post } from '@/gql/generated'
import bgDecorativeImage from '@/images/blog_floater.svg'
import placeholder from '@/images/samples/istockphoto-1147544807-612x612.jpg'
import { hygraph } from '@/lib/hygraph/hygraph'
import { GET_POSTS } from '@/lib/hygraph/queries'
import { GetPostsResponse } from '@/types/blog'
import { Separator } from '@base-ui-components/react'
import { Calendar, Clock, LinkIcon } from 'lucide-react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

export function Blog({ data }: { data: Post }) {
    return (
        <>
            <main>
                <section className="relative overflow-clip overflow-x-hidden py-16 md:py-24">
                    <Container size="large">
                        <Link
                            href={data.slug}
                            className="grid gap-12 md:grid-cols-2 md:gap-16"
                        >
                            <div className="flex flex-col items-start gap-6 md:justify-between">
                                <div className="flex w-full flex-col items-start justify-start gap-8">
                                    <div className="flex w-full flex-col items-start justify-start gap-4">
                                        <div className="flex flex-row items-start justify-start gap-1.5">
                                            {data.category?.map(
                                                (cat, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-row items-center justify-center gap-2.5 rounded-full bg-emerald-900 px-[.875rem] py-[.3125rem]"
                                                    >
                                                        <p className="block text-sm text-emerald-50">
                                                            {cat.title}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <h1 className="max-w-[50rem] text-[2.5rem] leading-[1.15] text-neutral-50 md:text-5xl">
                                            {data.title}
                                        </h1>
                                        {data.excerpt && (
                                            <p className="block max-w-[40rem] leading-relaxed text-neutral-50">
                                                {data.excerpt}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-6 md:flex-row">
                                        {data.author && (
                                            <div className="flex items-center justify-start gap-2.5">
                                                {data.author?.picture && (
                                                    <Image
                                                        className="h-6 w-6 rounded-full"
                                                        src={
                                                            data.author.picture
                                                                .url
                                                        }
                                                        alt={data.author?.name}
                                                        width={24}
                                                        height={24}
                                                    />
                                                )}
                                                <p className="block text-sm text-neutral-300">
                                                    Por{' '}
                                                    <span className="font-medium">
                                                        {data.author?.name}
                                                    </span>
                                                </p>
                                            </div>
                                        )}

                                        <Separator
                                            orientation="vertical"
                                            className="hidden h-5 w-px bg-emerald-50 opacity-10 md:block"
                                        />
                                        <div className="flex items-center justify-start gap-2.5">
                                            <Calendar
                                                size={18}
                                                className="text-emerald-600"
                                            />
                                            <p className="block text-sm text-neutral-300">
                                                {new Date(
                                                    data.publishedAt!
                                                ).toLocaleDateString('pt-BR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        {data.timeSpentReading && (
                                            <>
                                                <Separator
                                                    orientation="vertical"
                                                    className="hidden h-5 w-px bg-emerald-50 opacity-10 md:block"
                                                />
                                                <div className="flex flex-row items-center justify-start gap-2.5">
                                                    <Clock
                                                        size={18}
                                                        className="text-emerald-600"
                                                    />
                                                    <p className="block text-sm text-neutral-300">
                                                        {data.timeSpentReading}{' '}
                                                        {data.timeSpentReading ===
                                                        1
                                                            ? 'minuto'
                                                            : 'minutos'}{' '}
                                                        de leitura
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <span className="text-green-50 opacity-60 transition hover:opacity-100">
                                    Ler Artigo →
                                </span>
                            </div>
                            {data.coverImage && (
                                <Image
                                    className="relative z-10 w-full rounded-[1.0625rem] object-cover md:h-[23.75rem]"
                                    src={data.coverImage.url}
                                    alt={data.title}
                                    width={data.coverImage.width!}
                                    height={data.coverImage.height!}
                                />
                            )}
                        </Link>
                    </Container>
                    <img
                        className="absolute hidden md:top-[8%] md:left-[48%] md:block lg:top-[12%] lg:left-[68%]"
                        src={bgDecorativeImage.src}
                        alt="Decorativo."
                    />
                    <div className="absolute top-0 right-0 left-0 -z-1 h-[80vh] w-full bg-emerald-950 md:h-[90vh] lg:h-[100vh]"></div>
                </section>
                <Showcase />
            </main>
        </>
    )
}

async function getPosts(quantity: number): Promise<Post[] | null> {
    try {
        const { posts } = await hygraph.request<GetPostsResponse>(GET_POSTS, {
            quantity,
        })

        return posts
    } catch (error) {
        console.error('Erro ao buscar post:', error)
        return null
    }
}

async function Showcase() {
    const posts = await getPosts(9)

    return (
        <section className="pt-0 pb-16 md:pt-24 md:pb-24">
            <Container size="large" className="flex flex-col gap-16">
                <div className="flex flex-col gap-7">
                    <Label>Nosso Blog</Label>
                    <h2 className="text-neutral-1000 text-[2.5rem] leading-[1.15] font-medium md:text-4xl">
                        Veja nossos artigos
                    </h2>
                </div>
                <div>
                    <div className="grid gap-6 md:grid-cols-3 md:gap-4">
                        {posts?.map((post) => {
                            return (
                                <Card
                                    href={post.slug}
                                    key={post.id}
                                    image={post.coverImage?.handle}
                                    date={post.publishedAt!}
                                    excerpt={post.excerpt!}
                                    heading={post.title}
                                />
                            )
                        })}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function Label({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-green-950"></div>
            <span className="text-[.8125rem] font-medium text-green-950 uppercase">
                {children}
            </span>
        </div>
    )
}

function Card({
    image,
    excerpt,
    heading,
    date,
    href,
}: {
    href: string
    image?: string | StaticImport
    date: string
    heading: string
    excerpt: string
}) {
    return (
        <Link href={href} className="flex flex-col gap-6">
            <Image
                className="rounded-[.5625rem] object-cover md:h-80"
                src={image || placeholder}
                alt="Imagem do post."
            />

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <Calendar className="text-green-700" size=".875rem" />
                    <span className="text-[.8125rem] font-medium text-green-700 uppercase">
                        {new Date(date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-[1.1875rem] leading-[1.15] font-medium">
                        {heading}
                    </h3>
                    <p className="text-[.9375rem] text-neutral-600">
                        {excerpt}
                    </p>
                </div>
            </div>
            <div className="group flex items-center gap-3">
                <LinkIcon
                    className="text-emerald-700 transition group-hover:text-green-950"
                    size={'1rem'}
                />
                <span className="text-sm font-medium text-emerald-700 transition group-hover:text-green-950">
                    Ler mais
                </span>
            </div>
        </Link>
    )
}
