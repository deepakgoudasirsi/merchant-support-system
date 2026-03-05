import StatusBadge from "./StatusBadge";

const STATUSES = ["NEW", "INVESTIGATING", "RESOLVED"];

function formatDate(value) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function TicketList({ tickets, onStatusChange }) {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b p-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Tickets</h2>
          <p className="mt-1 text-sm text-slate-600">Newest tickets appear first.</p>
        </div>
        <div className="text-sm text-slate-600">Total: {tickets.length}</div>
      </div>

      {tickets.length === 0 ? (
        <div className="px-4 py-10 text-center text-sm text-slate-600">No tickets yet. Create one to get started.</div>
      ) : (
        <>
          <div className="grid gap-3 p-4 sm:hidden">
            {tickets.map((t) => (
              <div key={t.id} className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{t.subject}</div>
                    <div className="mt-1 text-sm text-slate-600">{t.message}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge type="priority" value={t.priority} />
                    <StatusBadge type="status" value={t.status} />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">{formatDate(t.createdAt)}</div>
                  <select
                    value={t.status}
                    onChange={(e) => onStatusChange(t.id, e.target.value)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none shadow-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    aria-label="Update ticket status"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto sm:block">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="sticky top-0 z-10 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.map((t, idx) => (
                  <tr key={t.id} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-slate-50/40 hover:bg-slate-50"}>
                    <td className="px-4 py-3 align-top">
                      <div className="max-w-xl">
                        <div className="truncate text-sm font-medium text-slate-900">{t.subject}</div>
                        <div className="mt-1 max-h-10 overflow-hidden text-sm text-slate-600">{t.message}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <StatusBadge type="priority" value={t.priority} />
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge type="status" value={t.status} />
                        <select
                          value={t.status}
                          onChange={(e) => onStatusChange(t.id, e.target.value)}
                          className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none shadow-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                          aria-label="Update ticket status"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 align-top text-sm text-slate-600">
                      {formatDate(t.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

