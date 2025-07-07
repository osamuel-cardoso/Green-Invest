import { gql } from 'graphql-request'

export const GET_POST_BY_SLUG = gql`
    query GetPostBySlug($slug: String!) {
        post(where: { slug: $slug }) {
            id
            title
            slug
            excerpt
            content {
                markdown
            }
            category {
                title
            }
            coverImage {
                url
                width
                height
            }
            publishedAt
            timeSpentReading
            author {
                name
                picture {
                    url
                    height
                    width
                }
            }
        }
    }
`

export const GET_POSTS = gql`
    query GetPosts {
        posts(orderBy: publishedAt_DESC, where: { publishedAt_not: null }) {
            id
            title
            slug
            excerpt
            category {
                title
            }
            coverImage {
                url
                width
                height
            }
            publishedAt
            timeSpentReading
            author {
                name
                picture {
                    url
                    height
                    width
                }
            }
        }
    }
`
