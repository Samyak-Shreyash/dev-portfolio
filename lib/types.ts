import { Url } from "url"

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
export interface Project {
    _id: string
    title: string
    excerpt?: string
    link: string
    github: string
    specs: Array<string>
    coverImage?: string
    online: boolean
    createdAt: string
    updatedAt: string
}

export interface ContactMsg {
    _id: string,
    name: string,
    email: string,
    subject: string
    message: string
    createdAt: string
}