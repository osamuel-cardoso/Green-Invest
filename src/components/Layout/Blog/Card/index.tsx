import Image from 'next/image'
import React from 'react'

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
