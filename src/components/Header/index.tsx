'use client'
import { Nav } from '@/components/Header/nav'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Brand } from '../Brand'
import { Button } from '../Button'
import { Container } from '../Container'

export default function Index() {
    const [isActive, setIsActive] = useState(false)
    function handleSetState(state: boolean) {
        setIsActive(state)
    }

    return (
        <header className="z-10 w-full bg-white py-6">
            <Container>
                <div className="relative flex justify-between">
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

                <AnimatePresence mode="wait">
                    {isActive && <Nav />}
                </AnimatePresence>
            </Container>
        </header>
    )
}
