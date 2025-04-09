"use client";

import { Project } from "@/lib/types";
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
import { projectSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toast } from "./ui/toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { ImageUpload } from "./image-upload";
import { Button } from "./ui/button";

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof projectSchema>>({
    // resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          title: project.title,
          excerpt: project.excerpt ?? "",
          coverImage: project.coverImage ?? "",
          online: project.online ?? false,
          link: project.link?.toString() || "",
          github: project.github?.toString() || ""
        }
      : {
          title: "",
          excerpt: "",
          coverImage: "",
          online: false,
          link:"",
          github:""
        },
  });

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    try {
      setIsSubmitting(true);

      if (project) {
        // Update existing project
        const response = await fetch(`/api/projects/${project._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to update project");
        }

        Toast({
          title: "project updated",
          content: "Your project has been updated successfully.",
        });
      } else {
        // Create new project
        const response = await fetch("/api/projects", {
          method: "project",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create project");
        }

        Toast({
          title: "project created",
          content: "Your project has been created successfully.",
        });
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error submitting project:", error);
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
                      placeholder="My Awesome Blog project"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="my-awesome-blog-project" {...field} />
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
                      placeholder="A brief summary of your blog project"
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
              name="online"
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse items-right rounded-lg p-4">
                    <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0.5 px-4">
                    {field.value? <FormLabel className="text-base">Published</FormLabel> :
                    <FormDescription>
                      Make this project visible to visitors
                    </FormDescription>}
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
        {

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : project ? "Update project" : "Create project"}
          </Button>
        </div>
        }
      </form>
    </Form>
  );
}
