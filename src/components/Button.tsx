import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
    base: 'rounded-md text-[0.875rem] font-medium',
    variants: {
        size: {
            large: 'py-3.5 px-6',
        },
        variant: {
            primary: 'bg-neutral-50',
        },
    },
    defaultVariants: {
        size: 'large',
        variant: 'primary',
    },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants, ComponentProps<'button'> {}

export function Button({ className, size, children, variant }: ButtonProps) {
    return (
        <button className={button({ className, size, variant })}>
            {children}
        </button>
    )
}
