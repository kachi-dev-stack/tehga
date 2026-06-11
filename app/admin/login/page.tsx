"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "@/app/components/Logo";
import { Field, TextInput, PrimaryButton } from "@/lib/admin/forms";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/admin");
    } else {
      setError(
        "Invalid email or password. Check your credentials and try again.",
      );
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-deep px-4">
      <div className="w-full max-w-sm rounded-sm bg-background p-8 shadow-xl">
        <div className="text-foreground">
          <Logo />
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Admin Console
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Field label="Email">
            <TextInput
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@tehgaconsulting.com"
              required
            />
          </Field>
          <Field label="Password">
            <div className="relative">
              <TextInput
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>
          {error && (
            <p className="rounded-sm bg-destructive/10 border border-destructive/20 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}
          <PrimaryButton type="submit" disabled={busy} className="w-full">
            {busy ? "Signing in…" : "Sign in"}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
