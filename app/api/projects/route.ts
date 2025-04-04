import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/lib/types";
import { sortBlogs } from "@/lib/utils";
import { Document, ObjectId, WithId } from "mongodb"
import { NextResponse } from "next/server";

// This is a route handler for the /api/blog endpoint
// It fetches blog posts from the database and returns them as a JSON response
export async function GET() {
    // Connect to the database
    const { db } = await connectToDatabase("blog");
    // Get the collection of blog posts
    const collection = db.collection("projects");
    return collection.find({}).sort({ createdAt: -1 }).toArray()
        .then((projects) => {
            // Map the posts to the BlogPost type
            const mappedProjects = projects.map((post) => postMapper(post)).filter((post): post is Project => post !== null);
            // Return the posts as a JSON response
            return NextResponse.json(mappedProjects);
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

function postMapper(project: WithId<Document> | null): Project | null {
  if (!project)
    return null;
  return {
    _id: project._id.toString(),
    title: project.title,
    slug: project.slug,
    excerpt: project.excerpt,
    link: project.online? project.link : project.github,
    github: project.github,
    specs : project.specs,
    coverImage: project.coverImage.toString(),
    online: project.online,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  } as Project; 
}


