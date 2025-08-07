/* eslint-disable @typescript-eslint/no-unused-vars */
import { Post } from '@/gql/generated'
import Script from 'next/script'

interface BlogStructuredDataProps {
    posts: Post[]
    siteUrl?: string
    siteName?: string
    siteDescription?: string
}

export function BlogStructuredData({
    posts,
    siteUrl = 'https://blog.greeninvest.com.br',
    siteName = 'Blog Green Invest',
    siteDescription = 'Fique por dentro das últimas novidades e tendências do mercado de energia solar e investimentos sustentáveis.',
}: BlogStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${siteUrl}/#blog`,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': siteUrl,
        },
        name: siteName,
        description: siteDescription,
        publisher: {
            '@type': 'Organization',
            name: 'Green Invest',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
                width: 200,
                height: 60,
            },
            url: siteUrl,
            sameAs: [
                'https://www.facebook.com/greeninvest',
                'https://www.instagram.com/greeninvest',
                'https://www.linkedin.com/company/greeninvest',
                'https://twitter.com/greeninvest',
            ],
        },
        blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            '@id': `${siteUrl}/${post.slug}`,
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            author: post.author
                ? {
                      '@type': 'Person',
                      name: post.author.name,
                      image: post.author.picture?.url,
                      url: `${siteUrl}/author/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`,
                  }
                : {
                      '@type': 'Organization',
                      name: 'Green Invest',
                  },
            image: post.coverImage
                ? {
                      '@type': 'ImageObject',
                      url: post.coverImage.url,
                      width: post.coverImage.width,
                      height: post.coverImage.height,
                  }
                : undefined,
            url: `${siteUrl}/${post.slug}`,
            keywords: post.category?.map((cat) => cat.title).join(', '),
            articleSection: post.category?.[0]?.title,
            wordCount: post.content?.text
                ? post.content.text.split(' ').length
                : undefined,
            timeRequired: post.timeSpentReading
                ? `PT${post.timeSpentReading}M`
                : undefined,
        })),
    }

    // Dados adicionais para a organização
    const organizationData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Green Invest',
        alternateName: 'Green Invest Brasil',
        url: siteUrl,
        logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.png`,
            width: 200,
            height: 60,
        },
        description:
            'Plataforma de investimento em energia solar. Seja sócio de usinas solares e tenha rentabilidade garantida.',
        foundingDate: '2020',
        founders: [
            {
                '@type': 'Person',
                name: 'Fundador Green Invest',
            },
        ],
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'São Paulo',
            addressRegion: 'SP',
            addressCountry: 'BR',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+55-11-0000-0000',
            email: 'contato@greeninvest.com.br',
            availableLanguage: ['Portuguese', 'English'],
        },
        sameAs: [
            'https://www.facebook.com/greeninvest',
            'https://www.instagram.com/greeninvest',
            'https://www.linkedin.com/company/greeninvest',
            'https://twitter.com/greeninvest',
        ],
        slogan: 'Invista no futuro, colha energia limpa',
        knowsAbout: [
            'Energia Solar',
            'Investimentos Sustentáveis',
            'Energia Renovável',
            'Usinas Solares',
            'Sustentabilidade',
        ],
    }

    // Website SearchAction para aparecer na caixa de busca do Google
    const websiteData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        publisher: {
            '@id': `${siteUrl}/#organization`,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
        inLanguage: 'pt-BR',
    }

    return (
        <>
            <Script
                id="blog-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <Script
                id="organization-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationData),
                }}
            />
            <Script
                id="website-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteData),
                }}
            />
        </>
    )
}

interface ArticleStructuredDataProps {
    post: Post
    siteUrl?: string
}

export function ArticleStructuredData({
    post,
    siteUrl = 'https://blog.greeninvest.com.br',
}: ArticleStructuredDataProps) {
    // Dados do artigo principal
    const articleData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${siteUrl}/${post.slug}#article`,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/${post.slug}`,
        },
        headline: post.title,
        description: post.excerpt || '',
        image: post.coverImage
            ? [
                  {
                      '@type': 'ImageObject',
                      url: post.coverImage.url,
                      width: post.coverImage.width,
                      height: post.coverImage.height,
                  },
              ]
            : [`${siteUrl}/default-article-image.jpg`],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: post.author
            ? {
                  '@type': 'Person',
                  name: post.author.name,
                  image: post.author.picture
                      ? {
                            '@type': 'ImageObject',
                            url: post.author.picture.url,
                            width: post.author.picture.width,
                            height: post.author.picture.height,
                        }
                      : undefined,
                  description: post.author.biography,
                  jobTitle: post.author.title,
                  url: `${siteUrl}/author/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`,
              }
            : {
                  '@type': 'Organization',
                  name: 'Green Invest',
                  url: siteUrl,
              },
        publisher: {
            '@type': 'Organization',
            name: 'Green Invest',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
                width: 200,
                height: 60,
            },
            url: siteUrl,
        },
        keywords: post.category?.map((cat) => cat.title).join(', '),
        articleSection: post.category?.[0]?.title,
        inLanguage: 'pt-BR',
        url: `${siteUrl}/${post.slug}`,
        wordCount: post.content?.text
            ? post.content.text.split(' ').length
            : undefined,
        timeRequired: post.timeSpentReading
            ? `PT${post.timeSpentReading}M`
            : undefined,
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: [
                '.article-title',
                '.article-excerpt',
                '.article-content h2',
            ],
        },
        isAccessibleForFree: true,
        hasPart: post.content?.markdown
            ? extractArticleSections(post.content.markdown)
            : [],
    }

    // BreadcrumbList para navegação
    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/${post.slug}#breadcrumb`,
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${siteUrl}/blog`,
            },
            ...(post.category && post.category[0]
                ? [
                      {
                          '@type': 'ListItem',
                          position: 3,
                          name: post.category[0].title,
                          item: `${siteUrl}/categoria/${post.category[0].slug}`,
                      },
                  ]
                : []),
            {
                '@type': 'ListItem',
                position: post.category && post.category[0] ? 4 : 3,
                name: post.title,
                item: `${siteUrl}/${post.slug}`,
            },
        ],
    }

    // FAQ Schema se houver perguntas no conteúdo
    const faqData = extractFAQFromContent(post.content?.markdown)

    // Dados de avaliação (se você tiver um sistema de rating)

    return (
        <>
            <Script
                id="article-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleData),
                }}
            />
            <Script
                id="breadcrumb-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbData),
                }}
            />
            {faqData && (
                <Script
                    id="faq-structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqData),
                    }}
                />
            )}
        </>
    )
}

// Funções auxiliares
function extractArticleSections(markdown: string): unknown[] {
    const sections: unknown[] = []
    const headingRegex = /^##\s+(.+)$/gm
    let match
    let position = 1

    while ((match = headingRegex.exec(markdown)) !== null) {
        sections.push({
            '@type': 'WebPageElement',
            isAccessibleForFree: true,
            cssSelector: `#${match[1].toLowerCase().replace(/\s+/g, '-')}`,
            name: match[1],
            position: position++,
        })
    }

    return sections
}

function extractFAQFromContent(markdown?: string): unknown | null {
    if (!markdown) return null

    // Procura por seções que parecem ser FAQ (você pode ajustar o padrão)
    const faqRegex = /### (.*\?)\n+(.*?)(?=###|\n\n|$)/gs
    const faqs: unknown[] = []
    let match

    while ((match = faqRegex.exec(markdown)) !== null) {
        if (match[1] && match[2]) {
            faqs.push({
                '@type': 'Question',
                name: match[1].trim(),
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: match[2].trim(),
                },
            })
        }
    }

    if (faqs.length === 0) return null

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs,
    }
}
