import { Container } from '../Container'

export function CtaSection() {
    return (
        <section className="relative bg-green-950 pt-16">
            <Container size="large">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
                    {/* Título */}
                    <div className="order-1 md:col-span-4">
                        <h2 className="text-center text-[2.3rem] leading-[1.1] font-medium tracking-[-0.035em] text-neutral-50 md:text-left md:text-[3.5rem]">
                            Tenha tudo na palma da mão
                        </h2>
                    </div>

                    <div className="order-3 flex justify-center md:order-2 md:col-span-4">
                        <div className="w-full max-w-[24rem]">
                            <img
                                src="https://cdn.prod.website-files.com/68238fb1e73f8874c5727241/68238fb1e73f8874c5727291_Mockup-iphone.avif"
                                alt="Mockup iPhone"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                    <div className="order-2 flex flex-col gap-8 md:order-3 md:col-span-4">
                        <p className="text-center  text-neutral-200/60 md:text-left md:text-lg">
                            Com o Green InvestApp, você acompanha seus
                            investimentos em tempo real, monitora a produção das
                            usinas solares e realiza transações com segurança e
                            praticidade.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-md border border-green-800/20 bg-green-950 px-3.5 py-2"
                            >
                                <img
                                    src="https://cdn.prod.website-files.com/68238fb1e73f8874c5727241/68238fb1e73f8874c572728f_Frame.svg"
                                    alt=""
                                    className="h-5 w-5"
                                />
                                <div>
                                    <div className="text-[0.531rem] font-medium text-neutral-400">
                                        Disponível em
                                    </div>
                                    <div className="text-sm font-medium text-neutral-50">
                                        Play Store
                                    </div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-md border border-green-800/20 bg-green-950 px-3.5 py-2"
                            >
                                <img
                                    src="https://cdn.prod.website-files.com/68238fb1e73f8874c5727241/68238fb1e73f8874c5727290_apple-icon.svg"
                                    alt=""
                                    className="h-5 w-5"
                                />
                                <div>
                                    <div className="text-[0.531rem] font-medium text-neutral-400">
                                        Disponível na
                                    </div>
                                    <div className="text-sm font-medium text-neutral-50">
                                        App Store
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
