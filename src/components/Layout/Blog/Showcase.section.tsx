'use client'

import { Container } from '@/components/Container'
import { Post } from '@/gql/generated'
import { Calendar, ChevronDown, Clock, Link2, Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

interface ShowcaseSectionProps {
    posts: Post[]
}

export function ShowcaseSection({ posts }: ShowcaseSectionProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'readTime'>(
        'recent'
    )
    const [showFilters, setShowFilters] = useState(false)

    // Extrair categorias únicas
    const categories = useMemo(() => {
        const cats = new Map<string, { title: string; slug: string }>()
        posts.forEach((post) => {
            post.category?.forEach((cat) => {
                if (cat.slug) {
                    cats.set(cat.slug, { title: cat.title, slug: cat.slug })
                }
            })
        })
        return Array.from(cats.values())
    }, [posts])

    // Filtrar e ordenar posts
    const filteredPosts = useMemo(() => {
        let filtered = [...posts]

        // Filtrar por busca
        if (searchTerm) {
            filtered = filtered.filter(
                (post) =>
                    post.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    (post.excerpt &&
                        post.excerpt
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (post.author?.name &&
                        post.author.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            )
        }

        // Filtrar por categorias
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((post) =>
                post.category?.some((cat) =>
                    selectedCategories.includes(cat.slug)
                )
            )
        }

        // Ordenar
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'recent':
                    return (
                        new Date(b.publishedAt!).getTime() -
                        new Date(a.publishedAt!).getTime()
                    )
                case 'oldest':
                    return (
                        new Date(a.publishedAt!).getTime() -
                        new Date(b.publishedAt!).getTime()
                    )
                case 'readTime':
                    return (a.timeSpentReading || 0) - (b.timeSpentReading || 0)
                default:
                    return 0
            }
        })

        return filtered
    }, [posts, searchTerm, selectedCategories, sortBy])

    const toggleCategory = (slug: string) => {
        setSelectedCategories((prev) =>
            prev.includes(slug)
                ? prev.filter((s) => s !== slug)
                : [...prev, slug]
        )
    }

    const clearFilters = () => {
        setSearchTerm('')
        setSelectedCategories([])
        setSortBy('recent')
    }

    const hasActiveFilters =
        searchTerm || selectedCategories.length > 0 || sortBy !== 'recent'

    return (
        <section className="pt-0 pb-16 md:pt-24 md:pb-24">
            <Container size="large" className="flex flex-col gap-12">
                {/* Header da seção */}
                <div className="flex flex-col gap-7">
                    <Label>Nosso Blog</Label>
                    <h2 className="text-neutral-1000 text-[2.5rem] leading-[1.15] font-medium md:text-4xl">
                        Veja nossos artigos
                    </h2>
                </div>

                {/* Barra de Filtros */}
                <div className="space-y-4">
                    {/* Linha 1: Busca e Ordenação */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Busca */}
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar artigos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                            />
                        </div>

                        {/* Ordenação e Toggle Filtros */}
                        <div className="flex gap-3">
                            {/* Ordenação */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) =>
                                        setSortBy(
                                            e.target.value as typeof sortBy
                                        )
                                    }
                                    className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pr-10 pl-4 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                                >
                                    <option value="recent">
                                        Mais recentes
                                    </option>
                                    <option value="oldest">Mais antigos</option>
                                    <option value="readTime">
                                        Tempo de leitura
                                    </option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>

                            {/* Toggle Filtros Mobile */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
                            >
                                Filtros
                                {selectedCategories.length > 0 && (
                                    <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">
                                        {selectedCategories.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Linha 2: Categorias */}
                    <div
                        className={`${showFilters ? 'block' : 'hidden'} space-y-4 lg:block`}
                    >
                        {categories.length > 0 && (
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm font-medium text-gray-700">
                                    Categorias:
                                </span>
                                {categories.map((category) => (
                                    <button
                                        key={category.slug}
                                        onClick={() =>
                                            toggleCategory(category.slug)
                                        }
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                            selectedCategories.includes(
                                                category.slug
                                            )
                                                ? 'bg-emerald-500 text-white'
                                                : 'border border-gray-200 bg-white text-gray-700 hover:border-emerald-500 hover:text-emerald-500'
                                        }`}
                                    >
                                        {category.title}
                                    </button>
                                ))}

                                {/* Limpar Filtros */}
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
                                    >
                                        <X className="h-3 w-3" />
                                        Limpar filtros
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Grid de Posts ou Estado Vazio */}
                {filteredPosts.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-3 md:gap-4">
                        {filteredPosts.map((post) => (
                            <Card
                                href={post.slug}
                                key={post.id}
                                image={post.coverImage?.url}
                                date={post.publishedAt!}
                                excerpt={post.excerpt!}
                                heading={post.title}
                                timeSpentReading={post.timeSpentReading}
                                author={post.author}
                                categories={post.category}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 rounded-full bg-gray-100 p-4">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Nenhum artigo encontrado
                        </h3>
                        <p className="mb-6 max-w-md text-sm text-gray-600">
                            Tente ajustar seus filtros ou buscar por outros
                            termos
                        </p>
                        <button
                            onClick={clearFilters}
                            className="rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}
            </Container>
        </section>
    )
}

function Label({ children }: { children: React.ReactNode }) {
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
    timeSpentReading,
    categories,
}: {
    href: string
    image?: string
    date: string
    heading: string
    excerpt: string
    timeSpentReading?: number
    author?: { name: string; picture?: { url: string } | null } | null
    categories?: Array<{ title: string; slug: string }>
}) {
    return (
        <Link href={href} className="group flex flex-col gap-6">
            {/* Imagem com badges de categoria */}
            <div className="relative overflow-hidden rounded-[.5625rem]">
                {image ? (
                    <Image
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-80"
                        src={image}
                        alt="Imagem do post."
                        width={400}
                        height={320}
                    />
                ) : (
                    <div className="flex items-center justify-center bg-gray-100 md:h-80">
                        <span className="text-gray-400">Sem imagem</span>
                    </div>
                )}

                {/* Badges de categoria sobre a imagem */}
                {categories && categories.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {categories.map((cat, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                            >
                                {cat.title}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3">
                {/* Meta info */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="text-green-700" size=".875rem" />
                        <span className="text-[.8125rem] font-medium text-green-700 uppercase">
                            {new Date(date).toLocaleDateString('pt-BR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                    {timeSpentReading && (
                        <div className="flex items-center gap-2">
                            <Clock className="text-green-700" size=".875rem" />
                            <span className="text-[.8125rem] font-medium text-green-700">
                                {timeSpentReading} min
                            </span>
                        </div>
                    )}
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-[1.1875rem] leading-[1.15] font-medium transition-colors group-hover:text-emerald-700">
                        {heading}
                    </h3>
                    <p className="line-clamp-2 text-[.9375rem] text-neutral-600">
                        {excerpt}
                    </p>
                </div>

                <div className="group/link mt-4 flex items-center gap-3">
                    <Link2
                        className="text-emerald-700 transition group-hover/link:text-green-950"
                        size={'1rem'}
                    />
                    <span className="text-sm font-medium text-emerald-700 transition group-hover/link:text-green-950">
                        Ler mais
                    </span>
                </div>
            </div>
        </Link>
    )
}
