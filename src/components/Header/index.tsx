'use client'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Brand } from '../Brand'
import { Button } from '../Button'
import { Container } from '../Container'

export function Header() {
    const [isActive, setIsActive] = useState(false)
    function handleSetState(state: boolean) {
        setIsActive(state)
    }

    return (
        <header className="z-10 w-full bg-white py-4">
            <Container>
                <div className="relative flex items-center justify-between">
                    <Link href="/">
                        <Brand className="h-6 text-green-950" />
                    </Link>

                    <Button
                        size="medium"
                        variant="secondary"
                        onClick={() => {
                            handleSetState(!isActive)
                        }}
                    >
                        {isActive ? 'Fechar' : 'Navegação'}
                    </Button>
                </div>

                <AnimatePresence mode="wait"></AnimatePresence>
            </Container>
        </header>
    )
}
