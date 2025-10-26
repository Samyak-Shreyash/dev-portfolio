import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb";
import { Blog, ContactMsg, Project } from "./types";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
const options = {}


let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}


async function connectToDatabase() {
  // Connect to the database
  const client = await clientPromise;
  const db = client.db("samyakShreyash");
  return {db, client};
}


  async function BlogDBCollection() {
    const { db } = await connectToDatabase();
    return db.collection('posts');
  }

  async function ProjectDBCollection() {
    const { db } = await connectToDatabase();
    return db.collection('projects');
  }

  async function ContactDBCollection() {
    const { db } = await connectToDatabase();
    return db.collection('messages');
  }

  async function UserDBCollection() {
    const { db } = await connectToDatabase();
    return db.collection('userOne');
  }



export const BlogDBService = {
  
  async getAllBlogs()
  { 
    const collection = await BlogDBCollection();
    const posts = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return posts as unknown as Blog[];
  },

  async getBlogById(id: string)
  {
    const collection = await BlogDBCollection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result as Blog | null;
  },

  async getBlogBySlug(slug: string)
  {
    const collection = await BlogDBCollection();
    const result =  await collection.findOne({ slug: slug })
    return result as Blog | null;
  },

  async updateBlog(blogData: Omit<Blog,  "updatedAt">)
  {
    
    const collection = await BlogDBCollection();
    const existingBlog = await collection.findOne({ _id: new ObjectId(blogData._id) })
    if(!existingBlog)
      return await collection.findOneAndUpdate(
        { _id: new ObjectId(blogData._id) }, // Filter to locate the document
        { ...blogData, updatedAt: new Date() }, // Update object with changes
        { upsert: true } // Options: upsert if not found
      )
    else
      return null;
  },

  async addNewBlog(blogData: Omit<Blog, "_id" | "createdAt" | "updatedAt">) {
    
    const collection = await BlogDBCollection();
    return await collection.insertOne(
        {  ...blogData, createdAt: new Date(), updatedAt: new Date() }, // Update object with changes
      )
  },

  async deleteBlog(id: string) {
    const collection = await BlogDBCollection();
    const existingBlog = await collection.findOne({ _id: new ObjectId(id) })

    return existingBlog && collection.deleteOne({_id: new ObjectId(id)});
  }
  

};


export const ProjectDBService = {
  
  async getAllProjects()
  { 
    const collection = await ProjectDBCollection();
    const projects = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return projects as unknown as Project[];
  },

  async getProjectById(id: string)
  {
    const collection = await ProjectDBCollection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result as Project | null;
  },

  async updateProject(project: Omit<Project,  "updatedAt">)
  {
    
    const collection = await ProjectDBCollection();
    const existingBlog = await collection.findOne({ _id: new ObjectId(project._id) })
    if(!existingBlog)
      return await collection.findOneAndUpdate(
        { _id: new ObjectId(project._id) }, // Filter to locate the document
        { ...project, updatedAt: new Date() }, // Update object with changes
        { returnDocument: "after", upsert: true } // Options: return updated document and upsert if not found
      )
    else
      return null;
  },

  async addNewProject(project: Omit<Project, "_id" | "createdAt" | "updatedAt">) {
    
    const collection = await ProjectDBCollection();
   return await collection.insertOne(
        { ...project, createdAt: new Date(), updatedAt: new Date() } // Update object with changes
   );
  },

  async deleteProject(id: string) {
    const collection = await ProjectDBCollection();
    return collection.deleteOne({_id: new ObjectId(id)});
  }

};


export const MessageDBService = {
  
  async getAllMessages()
  { 
    const collection  = await ContactDBCollection();
    return await collection.find({}).sort({ createdAt: -1 }).toArray()
  },
  
  async getMessageById(id: string)
  {
    const collection = await ContactDBCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  },

  async pushMessage(project: Omit<ContactMsg, "_id" | "createdAt" >) {
    const collection  = await ContactDBCollection();
    return await collection.insertOne(
         { ...project, _id: new ObjectId(), createdAt: new Date() }, // Update object with changes
    );
   },

  async deleteMessage(id: string) {
    const collection  = await ContactDBCollection();
    return collection.deleteOne({_id: new ObjectId(id)});
  }

};

// export const UserDBService = {
  
//   async getUserByEmail(email: string)
//   { 
//     const collection = await UserDBCollection();
//     return await collection.findOne({ email: email})
//   }
// };