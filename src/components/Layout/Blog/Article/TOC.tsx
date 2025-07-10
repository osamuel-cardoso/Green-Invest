'use client'

import { cn, TocItem } from '@/lib/utils'
import { List } from 'lucide-react'

import { useEffect, useState } from 'react'

interface TableOfContentsProps {
    items: TocItem[]
}

export function TOC({ items }: TableOfContentsProps) {
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
        <nav>
            <ul className="rounded-[.5625rem] bg-[#05604905] pt-2 pr-4 pb-4 pl-2 text-[.8125rem]">
                <div className="flex items-center gap-3 p-4">
                    <List className="text-emerald-700" size={'1rem'} />
                    <h3 className="text-sm font-medium text-emerald-950">
                        Tabela de Conteúdos
                    </h3>
                </div>
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
                                'block py-1 text-gray-500 transition-colors hover:text-emerald-700',
                                'border-l-2 pl-3',
                                activeId === item.id
                                    ? 'border-emerald-600 text-emerald-700'
                                    : 'border-transparent hover:border-emerald-100'
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
