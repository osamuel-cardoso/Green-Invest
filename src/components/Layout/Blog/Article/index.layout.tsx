import { Container } from '@/components/Container'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import bgDecorativeImage from '@/images/blog_floater.svg'
import sampleImage from '@/images/samples/istockphoto-1147544807-612x612.jpg'
import { Separator } from '@base-ui-components/react'
import { Calendar, Clock } from 'lucide-react'
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx'
import Image from 'next/image'
import Link from 'next/link'

const markdownOptions: MarkdownToJSX.Options = {
    overrides: {
        h1: {
            props: {
                className: 'pb-6 text-[1.3125rem] font-bold text-emerald-950',
            },
            component: ({ children, ...props }) => (
                <h1 {...props}>{children}</h1>
            ),
        },
        h2: {
            props: {
                className:
                    'w-full pb-6 text-[1.3125rem] font-bold text-emerald-950',
            },
            component: ({ children, ...props }) => (
                <h2 {...props}>{children}</h2>
            ),
        },
        h3: {
            props: {
                className:
                    'w-full text-[1.1875rem] font-bold text-emerald-950',
            },
            component: ({ children, ...props }) => (
                <h3 {...props}>{children}</h3>
            ),
        },
        h4: {
            props: {
                className: 'w-full text-[1.0625rem] font-bold text-emerald-950',
            },
            component: ({ children, ...props }) => (
                <h4 {...props}>{children}</h4>
            ),
        },
        h5: {
            props: {
                className: 'w-full text-base font-bold text-emerald-950',
            },
            component: ({ children, ...props }) => (
                <h5 {...props}>{children}</h5>
            ),
        },
        h6: {
            props: {
                className: 'w-full text-sm font-bold text-emerald-950',
            },
            component: ({ children, ...props }) => (
                <h6 {...props}>{children}</h6>
            ),
        },
        p: {
            props: {
                className:
                    'mb-5 w-full tracking- text-[.9375rem] text-gray-600',
            },
            component: ({ children, ...props }) => <p {...props}>{children}</p>,
        },
        ol: {
            props: {
                className: 'mb-5 list-decimal pl-4',
            },
            component: ({ children, ...props }) => (
                <ol {...props}>{children}</ol>
            ),
        },
        ul: {
            props: {
                className: 'mb-5 list-disc pl-4',
            },
            component: ({ children, ...props }) => (
                <ul {...props}>{children}</ul>
            ),
        },
        li: {
            props: {
                className: 'mb-1 text-[.9375rem] font-medium text-emerald-700',
            },
            component: ({ children, ...props }) => (
                <li {...props}>{children}</li>
            ),
        },
        blockquote: {
            props: {
                className:
                    'mb-6 bg-neutral-50 rounded-[.3125rem] p-4  text-gray-700',
            },
            component: ({ children, ...props }) => (
                <blockquote {...props}>{children}</blockquote>
            ),
        },
        code: {
            props: {
                className:
                    'bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800',
            },
            component: ({ children, ...props }) => (
                <code {...props}>{children}</code>
            ),
        },
        pre: {
            props: {
                className:
                    'mb-6 overflow-x-auto rounded-lg bg-gray-900 p-6 text-gray-100',
            },
            component: ({ children, ...props }) => (
                <pre {...props}>{children}</pre>
            ),
        },
        strong: {
            props: {
                className: 'font-semibold text-emerald-950',
            },
            component: ({ children, ...props }) => (
                <strong {...props}>{children}</strong>
            ),
        },
        em: {
            props: {
                className: 'text-gray-700 italic',
            },
            component: ({ children, ...props }) => (
                <em {...props}>{children}</em>
            ),
        },
        a: {
            props: {
                className:
                    'w-full text-wrap font-semibold text-emerald-700 underline underline-offset-1',
            },
            component: ({ children, href, ...props }) => (
                <Link href={href || '#'} {...props}>
                    {children}
                </Link>
            ),
        },
        img: {
            props: {
                className: 'mb-8 block h-auto w-full rounded-2xl',
            },
            component: ({ src, alt, width, height, ...props }) => (
                <Image
                    src={src || ''}
                    width={width ? Number(width) : 800}
                    height={height ? Number(height) : 600}
                    alt={alt || 'Imagem de post.'}
                    {...props}
                />
            ),
        },
        hr: {
            props: {
                className: 'my-8 border-t border-gray-300',
            },
            component: ({ ...props }) => <hr {...props} />,
        },
        table: {
            props: {
                className: 'mb-6 w-full border-collapse border border-gray-300',
            },
            component: ({ children, ...props }) => (
                <table {...props}>{children}</table>
            ),
        },
        th: {
            props: {
                className:
                    'border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold',
            },
            component: ({ children, ...props }) => (
                <th {...props}>{children}</th>
            ),
        },
        td: {
            props: {
                className: 'border border-gray-300 px-4 py-2',
            },
            component: ({ children, ...props }) => (
                <td {...props}>{children}</td>
            ),
        },
    },
}

export function Article() {
    return (
        <main>
            <ArticleHero />
            <Content content={content} />
        </main>
    )
}

function ArticleHero() {
    return (
        <section className="relative overflow-x-hidden pt-16 md:pt-24">
            <Container size="large">
                <div className="flex flex-col gap-12 md:gap-16">
                    <div className="flex w-full flex-col items-start justify-start gap-8">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="block text-sm text-neutral-300 uppercase opacity-50 hover:opacity-100">
                                    <BreadcrumbLink
                                        className="hover:text-neutral-50"
                                        href="/"
                                    >
                                        Início
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="text-neutral-50 opacity-50" />
                                <BreadcrumbItem className="block text-sm text-neutral-300 uppercase opacity-50 hover:opacity-100">
                                    <BreadcrumbLink
                                        className="hover:text-neutral-50"
                                        href="/"
                                    >
                                        Article
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex w-full flex-col items-start justify-start gap-4">
                            <div className="flex flex-row items-start justify-start gap-1.5">
                                <div className="flex flex-row items-center justify-center gap-2.5 rounded-full bg-emerald-900 px-[.875rem] py-[.3125rem]">
                                    <p className="block text-sm text-emerald-50">
                                        Finanças
                                    </p>
                                </div>
                            </div>
                            <h1 className="max-w-[50rem] text-5xl leading-[1.15] text-neutral-50">
                                Balanço Patrimonial: tudo que você precisa saber
                            </h1>
                            <p className="block max-w-[40rem] leading-relaxed text-neutral-50">
                                O balanço patrimonial ou balanço contábil,
                                consiste em um relatório contábil que possui a
                                principal finalidade de apresentar a situação
                                financeira...
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-6 md:flex-row">
                            <div className="flex items-center justify-start gap-2.5">
                                <Image
                                    className="h-6 w-6 rounded-full"
                                    src={sampleImage}
                                    alt="imagem ilustrativa."
                                />
                                <p className="block text-sm text-neutral-300">
                                    Por{' '}
                                    <span className="font-medium">
                                        Jeferson Ferreira
                                    </span>
                                </p>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="hidden h-5 w-px bg-emerald-50 opacity-10 md:block"
                            />
                            <div className="flex items-center justify-start gap-2.5">
                                <Calendar
                                    size={20}
                                    className="text-emerald-600"
                                />
                                <p className="block text-sm text-neutral-300">
                                    11 de janeiro de 2023
                                </p>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="hidden h-5 w-px bg-emerald-50 opacity-10 md:block"
                            />
                            <div className="flex flex-row items-center justify-start gap-2.5">
                                <Clock size={20} className="text-emerald-600" />
                                <p className="block text-sm text-neutral-300">
                                    3 minutos de leitura
                                </p>
                            </div>
                        </div>
                    </div>
                    <Image
                        className="relative z-10 w-full rounded-[1.0625rem] object-cover md:h-[37.75rem]"
                        src={sampleImage}
                        alt="imagem ilustrativa."
                    />
                </div>
            </Container>
            <img
                className="absolute hidden md:top-[8%] md:left-[48%] md:block lg:top-[12%] lg:left-[68%]"
                src={bgDecorativeImage.src}
                alt="Decorativo."
            />
            <div className="absolute top-0 right-0 left-0 -z-1 h-[80vh] w-full bg-emerald-950 lg:h-[100vh]"></div>
        </section>
    )
}

function Content({ content }: { content: string }) {
    return (
        <section className="py-16 md:py-24">
            <Container size="large">
                <div className="grid grid-cols-2">
                    <div className="prose prose-lg markdown-content max-w-none">
                        <Markdown options={markdownOptions}>{content}</Markdown>
                    </div>
                </div>
            </Container>
        </section>
    )
}

const content = `
# Getting Started

This guide will help you make your first requests to the sandbox API. Production endpoints will follow a similar process but with different URLs.

## Overview

Here's a four-step process for getting started with the Astra API:

1. Create a developer account and generate API Keys
2. Create a test user profile
3. Authorize the client with the test user
4. Make a request to the API

### Optional

You can view a code-based walkthrough of the user onboarding process by checking out our recipe section.

## Developer Account Creation

To create a developer account, follow these steps:

1. Browse to the Sandbox Dashboard
2. Enter your email and set a password
3. Provide your first and last name and agree to the Developer Policy and Terms of Service
4. Click **"Create Account"** to access the Dashboard panel
5. Fill out the required fields to generate application credentials (Client ID and Client Secret)
6. Click the **"Save Changes"** button to finalize the account setup

## Accessing Developer Account

You can log into the dashboard using your email and password. You can return to access your keys or edit redirect URIs at any time.

### Redirect URIs Note

> **Note:** Redirect URIs guide users back to a specific page in your application after exiting the SDK. Multiple Redirect URIs can be registered for flexibility.

## User Intent Creation

To make requests to the Astra API on behalf of an end user, you need to create user intent. This requires setting up a test user profile first.

## API Key Generation

Remember to complete the signup process and generate your API keys:

- **Client ID**: Your unique application identifier
- **Client Secret**: Your application's secret key

Keep these credentials secure and never expose them in client-side code.
`
