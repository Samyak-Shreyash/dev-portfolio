"use client";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Toast } from "@/components/ui/toast";
import { redirect } from "next/navigation";
import { siteURL } from "@/lib/constants";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});


const apiUrl = process.env.NEXT_PUBLIC_API_URL?? siteURL+"/api";

export default function Login() {
  console.log("Login Page");

  const [mounted, setMounted] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (redirectPath) redirect(redirectPath);

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch(`$apiUrl/api/login`, {
        method: "POST",
        headers: { "Content-Types": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      
      console.log(result);
      
      if (result.success) {
        Toast({
          title: "User Authorised!",
          content: "Taking you to Admin Board",
        });
        setTimeout(() => setRedirectPath("/contact"), 1500);
      } else {
        Toast({
          title: "Credentials Invalid",
          content: "Are you sure you want to go this path!",
          variant: "destructive",
        });
      }
    } catch (error) {
      Toast({
        title: "Login Error",
        content: "Are you sure you want to go this path!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground ">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[hsl(var(--primary))]/60 text-foreground py-2 rounded-xl hover:bg-[hsl(var(--primary))] transition"
            disabled={loading}
          >
            {loading ? "Logging In" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
