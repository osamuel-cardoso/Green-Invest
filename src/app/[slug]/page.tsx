import { Article } from '@/components/Layout/Blog/Article/index.layout'

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    return <Article params={params} />
}
