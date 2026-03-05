async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) {
    const message = data?.message || "Request failed.";
    const error = new Error(message);
    error.status = res.status;
    error.details = data;
    throw error;
  }

  return data;
}

export function getTickets() {
  return request("/api/tickets");
}

export function createTicket(payload) {
  return request("/api/tickets", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateTicketStatus(id, status) {
  return request(`/api/tickets/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

