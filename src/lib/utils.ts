import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface TocItem {
    id: string
    text: string
    level: number
}

/**
 * Extrai headings do markdown e gera uma estrutura de TOC
 */
export function extractTocFromMarkdown(markdown: string): TocItem[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const toc: TocItem[] = []
    let match

    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length
        const text = match[2].trim()

        // Gera um ID único baseado no texto
        const id = generateId(text)

        toc.push({
            id,
            text,
            level,
        })
    }

    return toc
}

/**
 * Gera um ID válido para uso em anchors HTML
 */
function generateId(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .replace(/-+/g, '-') // Remove hífens múltiplos
        .replace(/^-|-$/g, '') // Remove hífens no início e fim
}

/**
 * Agrupa items do TOC por níveis para criar uma estrutura hierárquica
 */
export interface TocItemWithChildren extends TocItem {
    children: TocItemWithChildren[]
}

export function buildTocTree(items: TocItem[]): TocItemWithChildren[] {
    const tree: TocItemWithChildren[] = []
    const stack: TocItemWithChildren[] = []

    items.forEach((item) => {
        const newItem: TocItemWithChildren = { ...item, children: [] }

        // Remove items do stack que são de nível maior ou igual
        while (
            stack.length > 0 &&
            stack[stack.length - 1].level >= item.level
        ) {
            stack.pop()
        }

        // Se não há items no stack, adiciona à raiz
        if (stack.length === 0) {
            tree.push(newItem)
        } else {
            // Adiciona como filho do último item do stack
            stack[stack.length - 1].children.push(newItem)
        }

        stack.push(newItem)
    })

    return tree
}
