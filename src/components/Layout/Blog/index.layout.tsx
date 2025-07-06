import { Container } from '@/components/Container'
import { Card } from './Card'

const cardsData = [
    {
        id: '1',
        title: 'Balanço Patrimonial: tudo que você precisa saber',
        description:
            'O balanço patrimonial ou balanço contábil, consiste em um relatório contábil que possui a principal finalidade de apresentar a situação financeira...',
        date: '23 de mai. de 2025',
        image: '/images/solar-panels.jpg',
        tags: ['Finanças', 'Sustentabilidade'],
        theme: 'solar' as const,
        size: 'large' as const,
    },
    {
        id: '2',
        title: 'Investimentos Sustentáveis: O Futuro das Finanças',
        description:
            'Descubra como os investimentos ESG estão transformando o mercado financeiro e como você pode participar dessa revolução.',
        date: '15 de jun. de 2025',
        image: '/images/sustainable-investment.jpg',
        tags: ['ESG', 'Sustentabilidade', 'Investimentos'],
        theme: 'green' as const,
        size: 'medium' as const,
    },
    {
        id: '3',
        title: 'Análise de Mercado: Tendências 2025',
        description:
            'Uma análise completa das principais tendências do mercado financeiro para 2025 e suas implicações para investidores.',
        date: '10 de jul. de 2025',
        image: '/images/market-analysis.jpg',
        tags: ['Mercado', 'Tendências', 'Análise'],
        theme: 'default' as const,
        size: 'medium' as const,
    },
]

export function Blog() {
    return (
        <main>
            <Container size="large">
                <div className="grid grid-cols-3 gap-4">
                    {cardsData.map(
                        ({ date, description, id, image, title }) => (
                            <Card
                                key={id}
                                date={date}
                                description={description}
                                image={image}
                                title={title}
                            />
                        )
                    )}
                </div>
            </Container>
        </main>
    )
}
