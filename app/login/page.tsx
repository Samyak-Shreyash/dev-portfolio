"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});

const encoder = new TextEncoder();

async function hmac(key: BufferSource, message: BufferSource) {
  const hmacKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", hmacKey, message));
}

// Derives a single-use proof so the password itself is never sent to the server
async function createLoginProof(password: string, challenge: string, salt: string, iterations: number) {
  const passwordKey = await crypto.subtle.importKey("raw", encoder.encode(password.normalize("NFKC")), "PBKDF2", false, ["deriveBits"]);
  const saltBytes = Uint8Array.from(atob(salt), (char) => char.charCodeAt(0));
  const saltedPassword = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: saltBytes, iterations }, passwordKey, 256);

  const clientKey = await hmac(saltedPassword, encoder.encode("Client Key"));
  const storedKey = await crypto.subtle.digest("SHA-256", clientKey);
  const signature = await hmac(storedKey, encoder.encode(challenge));
  return btoa(String.fromCharCode(...clientKey.map((byte, i) => byte ^ signature[i])));
}

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
      const challengeRes = await fetch("/api/login/challenge", { method: "POST" });
      if (!challengeRes.ok) {
        setError("Login failed");
        return;
      }
      const { challenge, salt, iterations } = await challengeRes.json();
      const proof = await createLoginProof(data.password, challenge, salt, iterations);

      // Session is set as an HTTP-only cookie by the server; nothing is stored client-side
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge, proof }),
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
              Password <span aria-hidden="true">*</span>
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={errors.password || error ? true : undefined}
              aria-describedby={errors.password ? "password-error" : error ? "login-error" : undefined}
              {...register("password")}
              className="w-full px-4 py-2 border rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
            />
            {errors.password && (
              <p id="password-error" className="text-destructive text-sm">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>

          {error && <p id="login-error" role="alert" className="text-destructive text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[hsl(var(--primary))]/60 text-foreground py-2 rounded-xl hover:bg-[hsl(var(--primary))] transition"
            disabled={loading}
          >
            {loading ? <span className="motion-safe:animate-pulse">Logging In...</span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
