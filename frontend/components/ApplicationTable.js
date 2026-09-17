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
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Job Applications
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Track and manage your job applications
        </p>
      </div>

      {/* Search + Filter */}
      <div className="border-b bg-gray-50 px-6 py-4">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">

          {/* Search */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search company or position..."
              className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-black"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-black"
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
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-gray-500">
            No job applications found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
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

            <tbody className="divide-y">

              {applications.map((application) => (
                <tr
                  key={application.id}
                  className="hover:bg-gray-50"
                >

                  {/* Company */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {application.company}
                  </td>

                  {/* Position */}
                  <td className="px-6 py-4 text-gray-700">
                    {application.position}
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-gray-600">
                    {application.location || "-"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={application.status}
                    />
                  </td>

                  {/* Applied Date */}
                  <td className="px-6 py-4 text-gray-600">
                    {application.appliedDate || "-"}
                  </td>

                  {/* Salary */}
                  <td className="px-6 py-4 text-gray-600">
                    {application.salary
                      ? `₹${Number(
                          application.salary
                        ).toLocaleString("en-IN")}`
                      : "-"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(application)
                        }
                        className="rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(application)
                        }
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
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