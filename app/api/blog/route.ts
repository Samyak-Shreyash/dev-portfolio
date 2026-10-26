import { isAdmin } from "@/lib/auth";
import { BlogDBService } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// This is a route handler for the /api/blog endpoint
export async function GET() {
    // Connect to the database
    try {
      const blog = await BlogDBService.getPublishedBlogs()
      return NextResponse.json(blog)
    } catch (error) {
      console.error("Error fetching posts:", error)
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}

// POST a new blog post (admin only)
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = blogSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
  }

  try {
    if (await BlogDBService.getBlogBySlug(parsed.data.slug)) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 })
    }

    const result = await BlogDBService.addNewBlog(parsed.data);
    return NextResponse.json(
      {
        message: "BlogPost Saved successfully",
        blogId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 })
  }
}
