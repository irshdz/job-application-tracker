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
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900"
        >
          JobTracker
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Dashboard
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Register
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}