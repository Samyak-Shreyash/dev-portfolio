import { Url } from "url"

export interface BlogPost {
    _id: string
    title: string
    excerpt?: string
    slug: string
    content: string
    readingTime: string
    coverImage?: string
    published: boolean
    createdAt: string
    updatedAt: string
}
export interface Project {
    _id: string
    title: string
    excerpt?: string
    link: Url
    github: Url
    specs: Array<string>
    coverImage?: string
    online: boolean
    createdAt: string
    updatedAt: string
}

export interface ACTONTYPES {
    ADD_TOAST: string,
    UPDATE_TOAST: string,
    DISMISS_TOAST: string,
    REMOVE_TOAST: string,
  }