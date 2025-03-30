export interface BlogPost {
    _id: string
    title: string
    excerpt?: string
    slug: string
    content: string
    coverImage?: string
    published: boolean
    createdAt: string
    updatedAt: string
}