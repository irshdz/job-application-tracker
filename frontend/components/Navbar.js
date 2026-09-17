"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* JobTracker Logo */}
        <Link
          href="/"
          className="flex items-center"
        >
          <img
            src="/jobtracker-logo.png"
            alt="JobTracker"
            className="h-16 w-16 object-contain"
          />
        </Link>


        {/* Navigation */}
        <div className="flex items-center gap-3">

          {/* Dashboard */}
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Dashboard
          </Link>


          {/* Login */}
          <Link
            href="/login"
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Login
          </Link>


          {/* Register */}
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Register
          </Link>


          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}