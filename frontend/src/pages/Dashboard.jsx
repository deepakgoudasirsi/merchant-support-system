import { useEffect, useMemo, useState } from "react";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import { getTickets, updateTicketStatus } from "../services/ticketApi";

function countBy(list, key) {
  return list.reduce((acc, item) => {
    const value = item?.[key] ?? "UNKNOWN";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [tickets]);

  const counts = useMemo(() => {
    const byStatus = countBy(tickets, "status");
    const byPriority = countBy(tickets, "priority");
    return {
      total: tickets.length,
      byStatus,
      byPriority,
    };
  }, [tickets]);

  async function refresh() {
    setError("");
    setLoading(true);
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      setError(err?.message || "Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleStatusChange(id, status) {
    setError("");
    setUpdatingId(id);
    try {
      const updated = await updateTicketStatus(id, status);
      setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err?.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Support Dashboard</h1>
              <p className="mt-1 text-sm text-slate-600">
                Create tickets, track progress, and update status in one place.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={refresh}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border bg-white px-4 py-3">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Total</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{counts.total}</div>
            </div>
            <div className="rounded-lg border bg-white px-4 py-3">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">New</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{counts.byStatus.NEW || 0}</div>
            </div>
            <div className="rounded-lg border bg-white px-4 py-3">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Investigating</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {counts.byStatus.INVESTIGATING || 0}
              </div>
            </div>
            <div className="rounded-lg border bg-white px-4 py-3">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">High priority</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{counts.byPriority.HIGH || 0}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <TicketForm onCreated={refresh} />
          </div>

          <div className="lg:col-span-8">
            {error ? (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            ) : null}

            {loading ? (
              <div className="rounded-lg border bg-white p-6 text-sm text-slate-600">Loading tickets...</div>
            ) : (
              <div className={updatingId ? "opacity-95" : ""}>
                <TicketList tickets={sortedTickets} onStatusChange={handleStatusChange} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

