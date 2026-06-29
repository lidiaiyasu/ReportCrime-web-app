"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validation/login";
import { TextInput } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/police-dashboard";
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setServerError(body.error || "Login failed. Please try again.");
      return;
    }

    router.push(from);
    router.refresh();
  };

  return (
    <main
      id="main-content"
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg)",
        padding: "var(--space-5)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
          padding: "var(--space-6)",
        }}
      >
        <h1 style={{ color: "var(--color-navy-700)", marginBottom: 6, fontSize: "1.6rem" }}>
          Police Portal Sign In
        </h1>
        <p style={{ color: "#555", marginBottom: "var(--space-5)", fontSize: "0.95rem" }}>
          Authorized personnel only. Use your officer credentials to continue.
        </p>

        {serverError && <Alert type="error">{serverError}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextInput
            label="Username"
            autoComplete="username"
            required
            error={errors.username?.message}
            {...register("username")}
          />
          <TextInput
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            error={errors.password?.message}
            {...register("password")}
          />

          <div style={{ marginTop: "var(--space-5)" }}>
            <Button type="submit" isLoading={isSubmitting} style={{ width: "100%" }}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>

        <p style={{ marginTop: "var(--space-5)", fontSize: "0.85rem", color: "#777" }}>
          Demo credentials — Officer: <code>officer.doe</code> /{" "}
          <code>police123</code>
          <br />
          Investigator: <code>inv.tesfaye</code> / <code>investigate123</code>
        </p>
      </div>
    </main>
  );
}
