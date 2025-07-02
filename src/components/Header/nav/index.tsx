'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Body from './Body'
import Footer from './Footer'
import styles from './style.module.scss'

const links = [
    {
        title: 'Home',
        href: '/',
        src: 'home.png',
    },
    {
        title: 'Shop',
        href: '/shop',
        src: 'shop.png',
    },
    {
        title: 'About Us',
        href: '/about',
        src: 'home.png',
    },
    {
        title: 'Lookbook',
        href: '/lookbook',
        src: 'lookbook.png',
    },
    {
        title: 'Contact',
        href: '/contact',
        src: 'contact.png',
    },
]

export function Nav() {
    const [selectedLink, setSelectedLink] = useState({
        isActive: false,
        index: 0,
    })

    return (
        <motion.div
            variants={{
                initial: {
                    height: 0,
                },
                enter: {
                    height: 'auto',
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                },
                exit: {
                    height: 0,
                    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
                },
            }}
            initial="initial"
            animate="enter"
            exit="exit"
            className={styles.nav}
        >
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Body
                        links={links}
                        selectedLink={selectedLink}
                        setSelectedLink={setSelectedLink}
                    />
                    <Footer />
                </div>
            </div>
        </motion.div>
    )
}
