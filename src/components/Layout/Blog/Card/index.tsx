import Image from 'next/image'
import React from 'react'
import { tv } from 'tailwind-variants'

// Definindo o componente com slots usando Tailwind Variants
const card = tv({
    slots: {
        base: 'rounded-lg',
        image: 'relative w-full overflow-hidden',
        content: 'p-6 space-y-4',
        date: 'text-sm font-medium',
        title: 'font-bold leading-tight',
        description: 'leading-relaxed',
        footer: 'px-6 pb-6 pt-0',
    },
    variants: {
        size: {
            small: {
                base: 'max-w-sm',
                image: 'h-32',
                title: 'text-lg',
                description: 'text-sm',
            },
            medium: {
                base: 'max-w-md',
                image: 'h-40',
                title: 'text-xl',
                description: 'text-sm',
            },
            large: {
                base: 'max-w-lg',
                image: 'h-48',
                title: 'text-2xl',
                description: 'text-base',
            },
        },
        theme: {
            default: {
                base: 'bg-white border border-gray-200',
                date: 'text-gray-500',
                title: 'text-gray-900',
                description: 'text-gray-600',
            },
            green: {
                base: 'bg-green-50 border border-green-200',
                date: 'text-green-600',
                title: 'text-green-900',
                description: 'text-green-700',
            },
            solar: {
                base: 'bg-gradient-to-b from-blue-50 to-green-50 border border-green-300',
                date: 'text-blue-600',
                title: 'text-gray-900',
                description: 'text-gray-700',
            },
        },
    },
    defaultVariants: {
        size: 'medium',
        theme: 'default',
    },
})

interface CardProps {
    size?: 'small' | 'medium' | 'large'
    image?: React.ReactNode
    date?: React.ReactNode
    title?: React.ReactNode
    description?: React.ReactNode
    footer?: React.ReactNode
}

export function Card({ image, date, title, description }: CardProps) {
    return (
        <div className="">
            {/* Slot para imagem */}
            {image && (
                <Image
                    src={'/'}
                    alt="imagem do artigo."
                    width={540}
                    height={364}
                />
            )}

            {/* Conteúdo do card */}
            <div className={''}>
                {/* Slot para data */}
                {date && <div className={''}>{date}</div>}

                {/* Slot para título */}
                {title && <h3 className={''}>{title}</h3>}

                {/* Slot para descrição */}
                {description && <div className={''}>{description}</div>}
            </div>
        </div>
    )
}
