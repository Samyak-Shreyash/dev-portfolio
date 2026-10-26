"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: { password: string }) => {
    setLoading(true);
    setError("");
    try {
      // Session is set as an HTTP-only cookie by the server; nothing is stored client-side
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/messages");
        router.refresh();
      } else {
        const body = await res.json().catch(() => null);
        setError(body?.message ?? "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>

          {error && <p role="alert" className="text-red-500 text-sm">{error}</p>}

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
