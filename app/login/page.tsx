"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserApiService } from "@/lib/api-services";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/admin"); // Redirect if already logged in
    }
    setMounted(true);
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  
  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
        const res = await UserApiService.getUserByEmail(data);

      if (res.ok) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
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
              autoComplete="email"
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
            {loading ? <span className="animate-pulse">Logging In...</span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
