"use client";

import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";

export default function ApplicationTable({
  applications = [],
  onSearch,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;

    setStatus(value);

    if (onStatusChange) {
      onStatusChange(value);
    }
  };

  const handleEdit = (application) => {
    if (onEdit) {
      onEdit(application);
    }
  };

  const handleDelete = (application) => {
    if (onDelete) {
      onDelete(application);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">

      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-5">

        <div className="mb-2 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
          Applications
        </div>

        <h2 className="text-lg font-semibold text-white">
          Job Applications
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Track and manage your job applications
        </p>

      </div>


      {/* Search + Filter */}
      <div className="border-b border-slate-800 bg-slate-950 px-6 py-5">

        <div className="grid gap-4 md:grid-cols-[1fr_220px]">

          {/* Search */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search company or position..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

          </div>


          {/* Status Filter */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Status
            </label>

            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="APPLIED">Applied</option>
              <option value="SCREENING">Screening</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>

          </div>

        </div>

      </div>


      {/* Applications */}
      {applications.length === 0 ? (

        <div className="px-6 py-14 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-blue-500">
            📋
          </div>

          <p className="mt-4 text-sm font-medium text-slate-300">
            No job applications found.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Add a job application to start tracking your progress.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            {/* Table Header */}
            <thead className="border-b border-slate-800 bg-slate-950 text-xs uppercase text-slate-500">

              <tr>

                <th className="px-6 py-3">
                  Company
                </th>

                <th className="px-6 py-3">
                  Position
                </th>

                <th className="px-6 py-3">
                  Location
                </th>

                <th className="px-6 py-3">
                  Status
                </th>

                <th className="px-6 py-3">
                  Applied Date
                </th>

                <th className="px-6 py-3">
                  Salary
                </th>

                <th className="px-6 py-3">
                  Actions
                </th>

              </tr>

            </thead>


            {/* Table Body */}
            <tbody className="divide-y divide-slate-800">

              {applications.map((application) => (

                <tr
                  key={application.id}
                  className="transition hover:bg-slate-800/50"
                >

                  {/* Company */}
                  <td className="px-6 py-4 font-medium text-white">
                    {application.company}
                  </td>


                  {/* Position */}
                  <td className="px-6 py-4 text-slate-300">
                    {application.position}
                  </td>


                  {/* Location */}
                  <td className="px-6 py-4 text-slate-400">
                    {application.location || "-"}
                  </td>


                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={application.status}
                    />
                  </td>


                  {/* Applied Date */}
                  <td className="px-6 py-4 text-slate-400">
                    {application.appliedDate || "-"}
                  </td>


                  {/* Salary */}
                  <td className="px-6 py-4 text-slate-400">
                    {application.salary
                      ? `₹${Number(
                          application.salary
                        ).toLocaleString("en-IN")}`
                      : "-"}
                  </td>


                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(application)
                        }
                        className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                      >
                        Edit
                      </button>


                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(application)
                        }
                        className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}