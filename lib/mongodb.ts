import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb";
import { Blog, ContactMsg, Project } from "./types";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
// Fail fast instead of hanging a serverless function for minutes on a dead socket
const options = { serverSelectionTimeoutMS: 10000, connectTimeoutMS: 10000 }

// Cached on globalThis so dev HMR and warm serverless invocations reuse one client
const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>
}

// Connect lazily and drop a failed connection from the cache, so the next request
// reconnects instead of reusing a rejected promise (which also crashed the process
// as an unhandled rejection when a frozen Vercel instance thawed with a dead socket).
function getClient() {
  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect().catch((error) => {
      globalWithMongo._mongoClientPromise = undefined
      client.close().catch(() => {})
      throw error
    })
  }
  return globalWithMongo._mongoClientPromise
}

async function connectToDatabase() {
  // Connect to the database
  const client = await getClient();
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

  // Messages from this IP hash or email since `since`, used for rate limiting
  async countRecentMessages(ipHash: string, email: string, since: Date) {
    const collection  = await ContactDBCollection();
    const [byIp, byEmail] = await Promise.all([
      collection.countDocuments({ ipHash, createdAt: { $gte: since } }),
      collection.countDocuments({ email, createdAt: { $gte: since } }),
    ]);
    return { byIp, byEmail };
  },

  async pushMessage(project: Omit<ContactMsg, "_id" | "createdAt" > & { ipHash: string, userAgent: string }) {
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

export const LoginAttemptDBService = {

  async countRecentFailures(ipHash: string, since: Date)
  {
    const { db } = await connectToDatabase();
    return db.collection('loginAttempts').countDocuments({ ipHash, createdAt: { $gte: since } });
  },

  async recordFailure(ipHash: string)
  {
    const { db } = await connectToDatabase();
    return db.collection('loginAttempts').insertOne({ ipHash, createdAt: new Date() });
  }
};
