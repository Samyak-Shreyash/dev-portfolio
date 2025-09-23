import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb";
import { BlogPost, ContactMsg, Project } from "./types";

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

async function DBCollection(collection: string) {
    const { db } = await connectToDatabase();
    return db.collection(collection);
  }

  const BlogCollection = await DBCollection('posts');
  const ProjectCollection = await DBCollection('project');
  const MessageCollection = await DBCollection('messages');
  const UserCollection = await DBCollection('userOne');
  
export const BlogDBService = {

  async getBlogCount()
  {
    // return BlogCollection.countDocuments({}); 
    
    return 0;
  },
  
  async getAllBlogs()
  { 
    return BlogCollection.find({}).sort({ createdAt: -1 }).toArray();
  },

  async getBlogById(id: string)
  {
    return await BlogCollection.findOne({ _id: new ObjectId(id) });
  },

  async getBlogBySlug(slug: string)
  {
    return await BlogCollection.findOne({ slug: slug })
  },

  async updateBlog(blogData: Omit<BlogPost,  "updatedAt">)
  {
    
    const existingBlog = await BlogCollection.findOne({ _id: new ObjectId(blogData._id) })
    if(!existingBlog)
      return await BlogCollection.findOneAndUpdate(
        { _id: new ObjectId(blogData._id) }, // Filter to locate the document
        { ...blogData, updatedAt: new Date() }, // Update object with changes
        { upsert: true } // Options: upsert if not found
      )
    else
      return null;
  },

  async addNewBlog(blogData: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">) {
    
    return await BlogCollection.insertOne(
        {  ...blogData, createdAt: new Date(), updatedAt: new Date() }, // Update object with changes
      )
  },

  async deleteBlog(id: string) {
    const existingBlog = await BlogCollection.findOne({ _id: new ObjectId(id) })
    return existingBlog && BlogCollection.deleteOne({_id: new ObjectId(id)});
  }
  

};

export const ProjectDBService = {

  async getProjectCount()
  {
    // return ProjectCollection.countDocuments({}) || 0; 
    return 0;
  },
  
  async getAllProjects()
  { 
    return await ProjectCollection.find({}).sort({ createdAt: -1 }).toArray()
  },

  async getProjectById(id: string)
  {
    return await ProjectCollection.findOne({ _id: new ObjectId(id) });
  },

  async updateProject(project: Omit<Project,  "updatedAt">)
  {
    
    const existingBlog = await ProjectCollection.findOne({ _id: new ObjectId(project._id) })
    if(!existingBlog)
      return await ProjectCollection.findOneAndUpdate(
        { _id: new ObjectId(project._id) }, // Filter to locate the document
        { ...project, updatedAt: new Date() }, // Update object with changes
        { returnDocument: "after", upsert: true } // Options: return updated document and upsert if not found
      )
    else
      return null;
  },

  async addNewProject(project: Omit<Project, "_id" | "createdAt" | "updatedAt">) {
    
   return await ProjectCollection.insertOne(
        { ...project, createdAt: new Date(), updatedAt: new Date() } // Update object with changes
   );
  },

  async deleteProject(id: string) {
    return ProjectCollection.deleteOne({_id: new ObjectId(id)});
  }

};


export const MessageDBService = {
  
  async getAllMessages()
  { 
    return await MessageCollection.find({}).sort({ createdAt: -1 }).toArray()
  },
  
  async getMessageById(id: string)
  {
    return await MessageCollection.findOne({ _id: new ObjectId(id) });
  },

  async pushMessage(project: Omit<ContactMsg, "_id" | "createdAt" >) {
    return await MessageCollection.insertOne(
         { ...project, _id: new ObjectId(), createdAt: new Date() }, // Update object with changes
    );
   },

  async deleteMessage(id: string) {
    return MessageCollection.deleteOne({_id: new ObjectId(id)});
  }

};


export const UserDBService = {
  
  async getUserByEmail(email: string)
  {
    return await UserCollection.findOne({ email: email})
  }
};