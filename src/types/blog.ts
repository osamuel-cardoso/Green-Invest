export interface AuthorPicture {
    url: string
    height: number
    width: number
}

export interface Author {
    name: string
    picture?: AuthorPicture
}

export interface Category {
    title: string
}

export interface CoverImage {
    url: string
    width: number
    height: number
}

export interface Content {
    markdown: string
}

export interface Post {
    id: string
    title: string
    slug: string
    excerpt: string
    content?: Content
    category?: Category[]
    coverImage?: CoverImage
    publishedAt: string | null
    timeSpentReading?: number
    author: Author
}

// Interfaces para as responses da API - sem data wrapper
export interface GetPostResponse {
    post: Post
}

export interface GetPostsResponse {
    posts: Post[]
}
