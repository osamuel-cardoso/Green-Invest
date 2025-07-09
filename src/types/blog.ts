import { Post } from "@/gql/generated"


// Interfaces para as responses da API - sem data wrapper
export interface GetPostResponse {
    post: Post
}

export interface GetPostsResponse {
    posts: Post[]
}
