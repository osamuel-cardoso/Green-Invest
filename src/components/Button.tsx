import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
    base: 'rounded-md text-[0.875rem] font-medium cursor-pointer',
    variants: {
        size: {
            medium: 'py-[.5625rem] px-4',
            large: 'py-3.5 px-6',
        },
        variant: {
            primary: 'bg-neutral-50',
            secondary: "border border-neutral-100"
        },
    },
    defaultVariants: {
        size: 'large',
        variant: 'primary',
    },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants, ComponentProps<'button'> {}

export function Button({
    className,
    size,
    children,
    variant,
    ...props
}: ButtonProps) {
    return (
        <button {...props} className={button({ className, size, variant })}>
            {children}
        </button>
    )
}
