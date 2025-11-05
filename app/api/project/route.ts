import { ProjectDBService } from "@/lib/mongodb";
import { projectSchema } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod"

// This is a route handler for the /api/project endpoint
export async function GET() {
    // Connect to the database
    try {
      const project = await ProjectDBService.getAllProjects()
      return NextResponse.json(project)
    } catch (error) {
      console.error("Error fetching posts:", error)
      return NextResponse.json({ error: error }, { status: 500 })
    }
}