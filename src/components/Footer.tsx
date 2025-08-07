import Link from 'next/link'
import { Brand } from './Brand'
import { Button } from './Button'
import { Container } from './Container'

export function Footer() {
    return (
        <footer className="bg-[#091c14] py-6">
            <Container size="large">
                <div className="grid gap-12 gap-x-4 md:grid-cols-[0.75fr_1fr]">
                    <div className="grid gap-4 md:content-between">
                        <Brand className="h-6 text-white" />
                        <span className="text-xs text-neutral-50 opacity-60 md:text-[.875rem]">
                            Green Invest · 2025
                        </span>
                    </div>
                    <div className="grid gap-16">
                        <div className="hidden w-full gap-8 md:flex">
                            <span className="text-[.875rem] text-neutral-50 opacity-60">
                                Seja sócio de usinas
                            </span>
                            <span className="text-[.875rem] text-neutral-50 opacity-60">
                                Rentabilidade Garantida
                            </span>
                            <span className="text-[.875rem] text-neutral-50 opacity-60">
                                1,4% ao mês
                            </span>
                            <span className="text-[.875rem] text-neutral-50 opacity-60">
                                Transparência total
                            </span>
                        </div>
                        <div className="flex flex-col items-start gap-6">
                            <h3 className="text-4xl leading-none font-medium text-neutral-50 lg:text-[4.5rem] xl:text-[5.5rem]">
                                Invista no futuro!
                            </h3>

                            <Button>Entrar em contato</Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-3">
                                <span className="text-[.875rem] text-neutral-50 opacity-55">
                                    Navegação
                                </span>
                                <ul className="flex flex-col gap-1">
                                    <li className="text-[.875rem] text-neutral-50">
                                        <Link href={'#'}>Investimento</Link>
                                    </li>
                                    <li className="text-[.875rem] text-neutral-50">
                                        <Link href={'#'}>Sobre</Link>
                                    </li>
                                    <li className="text-[.875rem] text-neutral-50">
                                        <Link href={'#'}>Blog</Link>
                                    </li>
                                    <li className="text-[.875rem] text-neutral-50">
                                        <Link href={'#'}>Contato</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className="text-[.875rem] text-neutral-50 opacity-55">
                                    Depoimentos
                                </span>
                                <ul className="flex flex-col gap-1">
                                    <li className="text-[.875rem] text-neutral-50">
                                        <Link href={'#'}>
                                            Políticas de privacidade
                                        </Link>
                                    </li>
                                    <li className="text-[.875rem] text-neutral-50">
                                        <Link href={'#'}>Termos de uso</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 leading-none">
                            <span className="align-middle">
                                <span className="text-xs text-neutral-50 opacity-60 md:text-[.875rem]">
                                    Desenvolvido por{' '}
                                </span>
                                <span className="text-xs text-neutral-50 md:text-[.875rem]">
                                    Rabbit Studio
                                </span>
                            </span>

                            <span className="align-middle text-xs text-neutral-50 opacity-60 md:text-[.875rem]">
                                Todos os direitos reservados{' '}
                            </span>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
