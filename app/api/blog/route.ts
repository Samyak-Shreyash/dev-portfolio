import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/lib/types";
import { sortBlogs } from "@/lib/utils";
import { Document, ObjectId, WithId } from "mongodb"
import { NextResponse } from "next/server";
import readingTime from "reading-time";

// This is a route handler for the /api/blog endpoint
// It fetches blog posts from the database and returns them as a JSON response
export async function GET() {
    // Connect to the database
    const { db } = await connectToDatabase("blog");
    // Get the collection of blog posts
    const collection = db.collection("posts");
    return collection.find({}).sort({ createdAt: -1 }).toArray()
        .then((posts) => {
            // Map the posts to the BlogPost type
            const mappedPosts = posts.map((post) => postMapper(post)).filter((post): post is BlogPost => post !== null);
            // Return the posts as a JSON response
            return NextResponse.json(sortBlogs(mappedPosts));
        })
        .catch((error) => { 
            console.error("Error fetching posts:", error);
            return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
        }
    );
}

// POST a new blog
export async function POST(req: Request) {
  const { db } = await connectToDatabase("blog");
  const collection = db.collection("posts");
  const blog = await req.json();
  try {
  const result = await collection.insertOne(blog);
  return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("Error inserting post:", error);
    return NextResponse.json({ error: "Failed to insert post" }, { status: 500 });
  }
}

// UPDATE a blog
export async function PUT(req: Request) {
  const { db } = await connectToDatabase("blog");
  const collection = db.collection("posts");
  const { id, ...updateData } = await req.json();
try {
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  return NextResponse.json({ modifiedCount: result.modifiedCount });
} catch (error) {
  console.error("Error updating post:", error);
  return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
}
}

// DELETE a blog
export async function DELETE(req: Request) {
  const { db } = await connectToDatabase("blog");
  const collection = db.collection("posts");
  const { id } = await req.json();
  try {
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

function postMapper(Post: WithId<Document> | null): BlogPost | null {
  if (!Post)
    return null;
  return {
    _id: Post._id?.toString(),
    title: Post.title,
    slug: Post.slug,
    excerpt: Post.excerpt,
    content: Post.content,
    coverImage: Post.coverImage?.toString(),
    published: Post.published,
    createdAt: Post.createdAt,
    updatedAt: Post.updatedAt,
    readingTime: readingTime(Post.content).text
  } as BlogPost; 
}


