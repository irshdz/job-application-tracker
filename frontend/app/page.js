import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            JobTracker
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium hover:bg-slate-800"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            Smart Job Application Management
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Manage Your Job Search
            <span className="block text-blue-500">
              All in One Place.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            JobTracker helps you organize job applications, track interview
            progress, manage application statuses, and stay on top of your
            career journey.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Start Tracking
            </Link>

            <Link
              href="/register"
              className="rounded-lg border border-slate-600 px-6 py-3 font-semibold transition hover:bg-slate-800"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center text-3xl font-bold">
            Everything You Need
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="text-xl font-semibold">Track Applications</h3>
              <p className="mt-3 text-slate-400">
                Keep all your job applications organized in one place.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="text-xl font-semibold">Monitor Progress</h3>
              <p className="mt-3 text-slate-400">
                Track applications from Applied to Interview, Offer, or
                Rejected.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="text-xl font-semibold">Dashboard Insights</h3>
              <p className="mt-3 text-slate-400">
                Get a quick overview of your job search with useful statistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-500">
        © 2026 JobTracker. Built with Next.js & Spring Boot.
      </footer>
    </main>
  );
}