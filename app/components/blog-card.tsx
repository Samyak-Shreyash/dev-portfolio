import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={post.coverImage?.toString() || "/placeholder.svg?height=192&width=384/placeholder.svg?height=192&width=384"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">{format(new Date(post.createdAt), "MMM d, yyyy")}</div>
          {!post.published && <Badge variant="outline">Draft</Badge>}
        </div>
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          <h3 className="text-xl font-bold tracking-tight">{post.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{post.excerpt?.toString() || post.content.substring(0, 150)}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
          Read More
        </Link>
      </CardFooter>
    </Card>
  )
}

