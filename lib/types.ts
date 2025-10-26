export interface Blog {
    _id: string
    title: string
    tags: Array<string>
    excerpt?: string
    slug: string
    content: string
    coverImage?: string
    published: boolean
    createdAt: string
    updatedAt: string
}
export interface Project {
    _id: string
    title: string
    description: string
    demoUrl?: string
    repoUrl: string
    technologies: Array<string>
    image?: string
    category: string
    online: boolean
    createdAt: string
    updatedAt: string
}

export interface ContactMsg {
    _id?: string,
    name: string,
    email: string,
    subject: string
    message: string
    createdAt: string
}