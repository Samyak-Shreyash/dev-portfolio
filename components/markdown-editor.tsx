"use client";

import type React from "react";

import { useRef, useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link,
  Code,
  Quote,
  Strikethrough,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Toast } from "./ui/toast";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const insertMarkdown = useCallback(
    (before: string, after = "") => {
      if (!textareaRef.current) return;

      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      const selectedText = textarea.value.substring(
        selectionStart,
        selectionEnd
      );

      const beforeText = textarea.value.substring(0, selectionStart);
      const afterText = textarea.value.substring(selectionEnd);

      const newText = beforeText + before + selectedText + after + afterText;
      onChange(newText);

      // Set cursor position after the operation
      const newCursorPosition =
        selectionStart + before.length + selectedText.length + after.length;

      // Need to wait for React to update the DOM
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          selectedText ? selectionStart + before.length : newCursorPosition,
          selectedText ? selectionEnd + before.length : newCursorPosition
        );
      }, 0);
    },
    [onChange]
  );

  const handleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("**", "**");
  };

  const handleItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("*", "*");
  };

  const handleStrikethrough = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("~~", "~~");
  };

  const handleH1 = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("# ");
  };

  const handleH2 = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("## ");
  };

  const handleH3 = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("### ");
  };

  const handleUnorderedList = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("- ");
  };

  const handleOrderedList = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("1. ");
  };

  const handleLink = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("[", "](https://example.com)");
  };

  const handleCode = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("`", "`");
  };

  const handleCodeBlock = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("```\n", "\n```");
  };

  const handleBlockquote = (e: React.MouseEvent) => {
    e.preventDefault();
    insertMarkdown("> ");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload image");
      }

      const data = await response.json();
      setImageUrl(data.url);
      setImageAlt(file.name.split(".")[0]); // Use filename as default alt text

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      Toast({
        title: "Image uploaded",
        content: "Your image has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      Toast({
        title: "Upload failed",
        content:
          error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleInsertImage = () => {
    if (imageUrl) {
      insertMarkdown(`![${imageAlt || "image"}](${imageUrl})`);
      setImageUrl("");
      setImageAlt("");
    }
    setIsImageDialogOpen(false);
  };

  return (
    <div className="border border-[hsl(var(--muted-foreground))]/30 rounded-lg shadow-sm">
      <div className="p-2 bg-[hsl(var(--muted))]">
        <div className="flex flex-wrap gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleBold}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleItalic}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleStrikethrough}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleH1}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleH2}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleH3}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleUnorderedList}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleOrderedList}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleLink}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Link"
          >
            <Link className="h-4 w-4" />
          </Button>
          <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="ghost" className="hover:bg-[hsl(var(--muted-foreground))]/30" size="icon" title="Image">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Image</DialogTitle>
                <DialogDescription>
                  Upload an image or enter an image URL to insert into your
                  post.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="hover:bg-[hsl(var(--muted-foreground))]/30"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image-alt">Alt Text</Label>
                  <Input
                    id="image-alt"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Description of the image"
                    className="hover:bg-[hsl(var(--muted-foreground))]/30"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image-upload">Or upload an image</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      ref={fileInputRef}
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                    {isUploading && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsImageDialogOpen(false)}
                  className="hover:bg-[hsl(var(--muted-foreground))]/30"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleInsertImage}
                  className="hover:bg-[hsl(var(--muted-foreground))]/30"    
                  disabled={!imageUrl}
                >
                  Insert Image
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            type="button"
            variant="ghost"
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            size="icon"
            onClick={handleCode}
            title="Inline Code"
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="px=2 text-xs hover:bg-[hsl(var(--muted-foreground))]/30"
            onClick={handleCodeBlock}
            title="Code Block"
          >
            <Code className="h-4 w-4 mr-1" />
            Block
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleBlockquote}
            className="hover:bg-[hsl(var(--muted-foreground))]/30"
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="write">
        <div className="border-b border-b-[hsl(var(--muted-foreground))]/40 px-3">
          <TabsList className="h-9 w-full justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="write"
              className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-medium text-foreground shadow-none transition-none data-[state=active]:border-b-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--foreground))] data-[state=active]:shadow-none"
            >
              Write
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-medium text-foreground shadow-none transition-none data-[state=active]:border-b-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--foreground))] data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="p-0 mt-0">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[400px] p-4 font-mono text-sm resize-y focus:outline-none"
            placeholder="Type your markdown here..."
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="p-4 min-h-[400px] prose prose-sm max-w-none dark:prose-invert overflow-auto">
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <div className="text-muted-foreground text-center py-12">
                Nothing to preview
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
