"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const emptyForm = {
  company: "",
  position: "",
  location: "",
  status: "APPLIED",
  jobType: "FULL_TIME",
  appliedDate: "",
  salary: "",
  jobUrl: "",
  notes: "",
};

export default function ApplicationForm({
  onApplicationCreated,
  editingApplication,
  onApplicationUpdated,
  onCancelEdit,
}) {
  const router = useRouter();

  const [formData, setFormData] = useState(emptyForm);
  const [loadedApplicationId, setLoadedApplicationId] =
    useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
   * Load selected application when edit mode changes.
   */
  if (
    editingApplication &&
    editingApplication.id !== loadedApplicationId
  ) {
    setLoadedApplicationId(editingApplication.id);

    setFormData({
      company: editingApplication.company || "",
      position: editingApplication.position || "",
      location: editingApplication.location || "",
      status: editingApplication.status || "APPLIED",
      jobType: editingApplication.jobType || "FULL_TIME",
      appliedDate: editingApplication.appliedDate || "",
      salary:
        editingApplication.salary !== null &&
        editingApplication.salary !== undefined
          ? editingApplication.salary
          : "",
      jobUrl: editingApplication.jobUrl || "",
      notes: editingApplication.notes || "",
    });

    setError("");
  }

  /*
   * Reset edit marker when edit mode is cancelled.
   */
  if (
    !editingApplication &&
    loadedApplicationId !== null
  ) {
    setLoadedApplicationId(null);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setLoadedApplicationId(null);
    setError("");
  };

  const handleCancel = () => {
    resetForm();

    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const requestData = {
        ...formData,
        salary: formData.salary
          ? Number(formData.salary)
          : null,
      };

      let response;

      /*
       * EDIT MODE
       */
      if (editingApplication) {
        response = await api.put(
          `/applications/${editingApplication.id}`,
          requestData,
          config
        );

        if (onApplicationUpdated) {
          await onApplicationUpdated(response.data);
        }

        resetForm();

        if (onCancelEdit) {
          onCancelEdit();
        }
      }

      /*
       * ADD MODE
       */
      else {
        response = await api.post(
          "/applications",
          requestData,
          config
        );

        if (onApplicationCreated) {
          await onApplicationCreated(response.data);
        }

        resetForm();
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      setError(
        err.response?.data?.message ||
          (editingApplication
            ? "Failed to update application"
            : "Failed to create application")
      );
    } finally {
      setLoading(false);
    }
  };

  const isEditMode = Boolean(editingApplication);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      {/* Header */}
      <div className="mb-6">

        <div className="mb-2 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
          {isEditMode
            ? "Edit Application"
            : "New Application"}
        </div>

        <h2 className="text-xl font-semibold text-white">
          {isEditMode
            ? "Edit Job Application"
            : "Add Job Application"}
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          {isEditMode
            ? "Update your job application details."
            : "Add a new job application to your tracker."}
        </p>

      </div>


      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >

        {/* Company */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Company
          </label>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. TCS"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>


        {/* Position */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Position
          </label>

          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g. Java Full Stack Developer"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>


        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Kochi"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>


        {/* Status + Job Type */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="APPLIED">Applied</option>
              <option value="SCREENING">Screening</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>


          {/* Job Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Job Type
            </label>

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>

        </div>


        {/* Applied Date + Salary */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* Applied Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Applied Date
            </label>

            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>


          {/* Salary */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Salary
            </label>

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. 600000"
              min="0"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

        </div>


        {/* Job URL */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Job URL
          </label>

          <input
            type="url"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleChange}
            placeholder="https://example.com/job"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>


        {/* Notes */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Notes
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add notes about this application..."
            rows="4"
            className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>


        {/* Buttons */}
        <div className="flex gap-3">

          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? isEditMode
                ? "Updating Application..."
                : "Adding Application..."
              : isEditMode
                ? "Update Application"
                : "Add Application"}
          </button>


          {isEditMode && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
}