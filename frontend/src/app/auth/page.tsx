"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const url = isLogin ? `${API}/auth/login` : `${API}/auth/register`;
    const body = isLogin ? { email, password } : { name, email, password };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Something went wrong");
      login(data.user, data.token);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[85vh] px-gutter bg-surface">
      <div className="w-full" style={{ maxWidth: "480px" }}>
        {/* Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-md overflow-hidden">
          {/* Top accent bar */}
          <div className="h-2 bg-secondary w-full" />

          <div className="p-xl flex flex-col gap-lg">
            {/* Header */}
            <div>
              <h1 className="font-h2 text-h2 text-primary">
                {isLogin ? "Welcome back" : "Create account"}
              </h1>
              <p className="font-body-sm text-on-surface-variant mt-xs">
                {isLogin ? "Sign in to access your saved colleges and more." : "Join EduPredict to save and compare colleges."}
              </p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-md">
              {!isLogin && (
                <div className="flex flex-col gap-xs">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              )}
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface bg-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 font-body-sm px-md py-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-[48px] bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>

            <p className="text-center font-body-sm text-on-surface-variant">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => { setIsLogin(!isLogin); setError(""); }}
                className="text-secondary font-semibold hover:underline"
              >
                {isLogin ? "Register" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}