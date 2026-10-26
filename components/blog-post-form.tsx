"use client";

import { Blog } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { blogSchema, slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImageUpload } from "./image-upload";
import { Button } from "./ui/button";
import { MarkdownEditor } from "./markdown-editor";
import { BlogApiService } from "@/lib/api-services";

interface BlogPostFormProps {
  post?: Blog;
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      tags: post?.tags ?? [],
      content: post?.content ?? "",
      excerpt: post?.excerpt ?? "",
      coverImage: post?.coverImage ?? "",
      published: post?.published ?? false,
    },
  });

  async function onSubmit(values: z.output<typeof blogSchema>) {
    try {
      setIsSubmitting(true);

      if (post) {
        await BlogApiService.updateBlog(post._id, values);
        toast({
          title: "Post updated",
          description: "Your post has been updated successfully.",
        });
      } else {
        await BlogApiService.createBlog(values);
        toast({
          title: "Post created",
          description: "Your post has been created successfully.",
        });
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error("Error submitting post:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Awesome Blog Post"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        // Auto-generate slug only for new posts: changing it later breaks existing links
                        if (!post) form.setValue("slug", slugify(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="my-awesome-blog-post" {...field} />
                  </FormControl>
                  <FormDescription>
                    The URL-friendly version of the title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nextjs, mongodb, career"
                      defaultValue={field.value.join(", ")}
                      onChange={(e) =>
                        field.onChange(e.target.value.split(",").map((t) => t.trim()).filter(Boolean))
                      }
                    />
                  </FormControl>
                  <FormDescription>Comma-separated</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief summary of your blog post"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional short description for previews
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 rounded-lg border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-primary"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel>Published</FormLabel>
                    <FormDescription>Make this post visible to visitors</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="py-4 md:py-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Content</FormLabel>
              <FormControl>
                <MarkdownEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blogs")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
