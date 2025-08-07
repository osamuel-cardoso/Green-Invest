import { Container } from '@/components/Container'
import { Post } from '@/gql/generated'
import bgDecorativeImage from '@/images/blog_floater.svg'
import { Separator } from '@base-ui-components/react'
import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Blog({ data }: { data: Post }) {
    return (
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
                                        {data.category?.map((cat, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-row items-center justify-center gap-2.5 rounded-full bg-emerald-900 px-[.875rem] py-[.3125rem]"
                                            >
                                                <p className="block text-sm text-emerald-50">
                                                    {cat.title}
                                                </p>
                                            </div>
                                        ))}
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
                                                        data.author.picture.url
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
                                                    {data.timeSpentReading === 1
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
        </main>
    )
}
