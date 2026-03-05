import { useState } from "react";
import { createTicket } from "../services/ticketApi";

const PRIORITIES = ["LOW", "MEDIUM", "HIGH"];

export default function TicketForm({ onCreated }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = subject.trim().length > 0 && message.trim().length > 0 && !submitting;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      await createTicket({ subject, message, priority });
      setSubject("");
      setMessage("");
      setPriority("MEDIUM");
      onCreated?.();
    } catch (err) {
      setError(err?.message || "Failed to create ticket.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Create Ticket</h2>
          <p className="mt-1 text-sm text-slate-600">Add a subject, details, and priority.</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4">
        <label className="block">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-700">
              Subject <span className="text-red-600">*</span>
            </span>
            <span className="text-xs text-slate-500">Short summary</span>
          </div>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="e.g. Webhook signature failing"
            autoComplete="off"
            required
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="block sm:col-span-1">
            <span className="text-sm font-medium text-slate-700">Priority</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none shadow-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-700">
                Message <span className="text-red-600">*</span>
              </span>
              <span className="text-xs text-slate-500">{message.trim().length}/5000</span>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 5000))}
              rows={6}
              className="mt-1 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="Include reproduction steps, logs, and any relevant IDs."
              required
            />
          </label>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="text-xs text-slate-500">
          Fields marked <span className="text-red-600">*</span> are required.
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create Ticket"}
        </button>
      </div>
    </form>
  );
}

