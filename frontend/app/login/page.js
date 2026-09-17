"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      router.push("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">

      {/* Top Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between">

        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          JobTracker
        </Link>

        {/* Register */}
        <Link
          href="/register"
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
        >
          Create Account
        </Link>

      </nav>


      {/* Login Section */}
      <div className="flex min-h-[80vh] items-center justify-center">

        <div className="w-full max-w-md">

          {/* Login Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

            {/* Header */}
            <div className="text-center">

              {/* JobTracker Logo */}
              <div className="mb-6 flex justify-center">

                <img
                  src="/jobtracker-logo.png"
                  alt="JobTracker"
                  className="h-28 w-auto object-contain"
                />

              </div>


              {/* Title */}
              <h1 className="text-3xl font-bold text-white">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Login to manage your job applications
              </p>

            </div>


            {/* Error Message */}
            {error && (
              <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}


            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

              </div>


              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

              </div>


              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>


            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-slate-400">

              Don&apos;t have an account?{" "}

              <Link
                href="/register"
                className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
              >
                Create an account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}