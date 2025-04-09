"use client";

import { BlogPost } from "@/lib/types";
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
import { z } from "zod";
import { postSchema, slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toast } from "./ui/toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { ImageUpload } from "./image-upload";
import { Button } from "./ui/button";
import { MarkdownEditor } from "./markdown-editor";
import { BlogApiService } from "@/lib/api-services";

interface BlogPostFormProps {
  post?: BlogPost;
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof postSchema>>({
    // resolver: zodResolver(postSchema),
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt ?? "",
          coverImage: post.coverImage ?? "",
          published: post.published ?? false,
        }
      : {
          title: "",
          slug: "",
          content: "",
          excerpt: "",
          coverImage: "",
          published: false,
        },
  });

  async function onSubmit(values: z.infer<typeof postSchema>) {
    try {
      setIsSubmitting(true);

      // Ensure content is properly formatted as markdown
      const formData = {
        ...values,
        content: values.content.trim(), // Trim any extra whitespace but preserve markdown formatting
      };

      if (post) {
        // Update existing post
        await BlogApiService.updateBlog(post._id, post)

        Toast({
          title: "Post updated",
          content: "Your post has been updated successfully.",
        });
      } else {
        // Create new post
        const response = BlogApiService.createBlog(formData)

        if (!response) {
          throw new Error(response || "Failed to create post");
        }

        Toast({
          title: "Post created",
          content: "Your post has been created successfully.",
        });
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error("Error submitting post:", error);
      Toast({
        title: "Error",
        content: error instanceof Error ? error.message : "An error occurred",
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
                        // Auto-generate slug if slug is empty
                        form.setValue("slug", slugify(e.target.value));
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
                <FormItem className="flex flex-row-reverse justify-between rounded-lg p-4">
                    <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0.5 px-4">
                    {!field.value? <FormDescription>Make this post visible to visitors</FormDescription>:<></>}
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
