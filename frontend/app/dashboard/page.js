"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import ApplicationTable from "@/components/ApplicationTable";
import ApplicationForm from "@/components/ApplicationForm";

export default function DashboardPage() {
  const router = useRouter();

  const [dashboard, setDashboard] = useState({
    total: 0,
    applied: 0,
    screening: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  });

  const [applications, setApplications] = useState([]);

  const [editingApplication, setEditingApplication] =
    useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Authentication config
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return null;
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Load dashboard statistics
  const loadDashboard = async () => {
    try {
      const config = getAuthConfig();

      if (!config) {
        return;
      }

      const response = await api.get(
        "/dashboard",
        config
      );

      setDashboard(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard"
      );
    }
  };

  // Load applications
  const loadApplications = async (
    searchValue = search,
    statusValue = status
  ) => {
    try {
      const config = getAuthConfig();

      if (!config) {
        return;
      }

      const response = await api.get(
        "/applications",
        {
          ...config,
          params: {
            search: searchValue || undefined,
            status: statusValue || undefined,
          },
        }
      );

      setApplications(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      setError(
        err.response?.data?.message ||
          "Failed to load applications"
      );
    }
  };

  // Load everything
  const loadAllData = async () => {
    setLoading(true);
    setError("");

    await Promise.all([
      loadDashboard(),
      loadApplications("", ""),
    ]);

    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      loadAllData();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Search
  const handleSearch = (value) => {
    setSearch(value);

    loadApplications(value, status);
  };

  // Status filter
  const handleStatusChange = (value) => {
    setStatus(value);

    loadApplications(search, value);
  };

  // After creating application
  const handleApplicationCreated = async () => {
    await loadDashboard();
    await loadApplications(search, status);
  };

  // Edit application
  const handleEdit = (application) => {
    console.log("EDIT CLICKED:", application);

    setEditingApplication(application);

    setTimeout(() => {
      document
        .getElementById("application-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 0);
  };

  // After updating application
  const handleApplicationUpdated = async () => {
    setEditingApplication(null);

    await loadDashboard();
    await loadApplications(search, status);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingApplication(null);
  };

  // Delete application
  const handleDelete = async (application) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the application at ${application.company}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const config = getAuthConfig();

      if (!config) {
        return;
      }

      await api.delete(
        `/applications/${application.id}`,
        config
      );

      if (
        editingApplication?.id === application.id
      ) {
        setEditingApplication(null);
      }

      await loadDashboard();
      await loadApplications(search, status);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      setError(
        err.response?.data?.message ||
          "Failed to delete application"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950">

        <Navbar />

        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-24">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500"></div>

            <p className="mt-4 text-slate-400">
              Loading dashboard...
            </p>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>

            <div className="mb-2 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              Job Application Management
            </div>

            <h1 className="text-3xl font-bold text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Track and manage all your job applications.
            </p>

          </div>


          <Link
            href="/"
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Home
          </Link>

        </div>


        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}


        {/* Statistics */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <StatCard
            title="Total Applications"
            value={dashboard.total}
            description="All job applications"
          />

          <StatCard
            title="Applied"
            value={dashboard.applied}
            description="Applications submitted"
          />

          <StatCard
            title="Screening"
            value={dashboard.screening}
            description="Currently screening"
          />

          <StatCard
            title="Interviews"
            value={dashboard.interview}
            description="Interview stage"
          />

          <StatCard
            title="Offers"
            value={dashboard.offer}
            description="Offers received"
          />

          <StatCard
            title="Rejected"
            value={dashboard.rejected}
            description="Rejected applications"
          />

        </div>


        {/* Application Form */}
        <div
          id="application-form"
          className="mt-10"
        >

          <ApplicationForm
            onApplicationCreated={
              handleApplicationCreated
            }
            editingApplication={
              editingApplication
            }
            onApplicationUpdated={
              handleApplicationUpdated
            }
            onCancelEdit={
              handleCancelEdit
            }
          />

        </div>


        {/* Applications Table */}
        <div className="mt-10">

          <ApplicationTable
            applications={applications}
            onSearch={handleSearch}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>

      </div>

    </main>
  );
}