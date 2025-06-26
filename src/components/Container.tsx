import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const container = tv({
    base: 'w-full mx-auto px-3.5 md:px-4',

    variants: {
        size: {
            medium: '55rem',
            large: '83.5rem',
        },
    },

    defaultVariants: {
        size: 'large',
    },
})

type ContainerVariants = VariantProps<typeof container>

interface ContainerProps extends ContainerVariants, ComponentProps<'div'> {}

export function Container({ className, size, children }: ContainerProps) {
    return <div className={container({ className, size })}>{children}</div>
}
