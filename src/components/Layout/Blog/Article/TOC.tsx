'use client'

import { cn, TocItem } from '@/lib/utils'

import { useEffect, useState } from 'react'

interface TableOfContentsProps {
    items: TocItem[]
    className?: string
}

export function TOC({ items, className }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '-20% 0% -70% 0%',
                threshold: 0,
            }
        )

        // Observa todos os headings
        items.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => {
            items.forEach(({ id }) => {
                const element = document.getElementById(id)
                if (element) {
                    observer.unobserve(element)
                }
            })
        }
    }, [items])

    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string
    ) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            const offset = 80 // Ajuste para o header fixo
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = window.pageYOffset - offset + elementPosition

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            })

            // Atualiza o hash da URL sem scroll
            window.history.pushState(null, '', `#${id}`)
        }
    }

    if (items.length === 0) return null

    return (
        <nav
            className={cn('sticky top-24 overflow-y-auto', className)}
            aria-label="Índice"
        >
            <h3 className="mb-4 text-sm font-semibold text-emerald-950">
                Neste artigo
            </h3>
            <ul className="space-y-2 text-sm">
                {items.map((item) => (
                    <li
                        key={item.id}
                        style={{
                            paddingLeft: `${(item.level - 1) * 0.75}rem`,
                        }}
                    >
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => handleClick(e, item.id)}
                            className={cn(
                                'block py-1 text-gray-600 transition-colors hover:text-emerald-700',
                                '-ml-px border-l-2 pl-3',
                                activeId === item.id
                                    ? 'border-emerald-600 font-medium text-emerald-700'
                                    : 'border-transparent hover:border-gray-300'
                            )}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

// Componente server para gerar o TOC
export function TableOfContents({ items }: { items: TocItem[] }) {
    return <TOC items={items} />
}
