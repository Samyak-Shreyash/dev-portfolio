import { revalidatePath, revalidateTag, unstable_cache } from "next/cache"
import { BlogDBService, ProjectDBService } from "./mongodb"

// Matches the home page's revalidate window; admin edits purge it sooner via revalidateBlogs
const CACHE_SECONDS = 3600

export const getCachedPublishedBlogs = unstable_cache(
  () => BlogDBService.getPublishedBlogs(),
  ["published-blogs"],
  { revalidate: CACHE_SECONDS, tags: ["blogs"] },
)

export const getCachedProjects = unstable_cache(
  () => ProjectDBService.getAllProjects(),
  ["projects"],
  { revalidate: CACHE_SECONDS, tags: ["projects"] },
)

export function revalidateBlogs() {
  revalidateTag("blogs", { expire: 0 })
  revalidatePath("/")
}

export function revalidateProjects() {
  revalidateTag("projects", { expire: 0 })
  revalidatePath("/")
}
