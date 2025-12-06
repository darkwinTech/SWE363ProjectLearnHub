const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function apiGetApplications() {
  const res = await fetch(`${BASE}/api/applications`, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  });
  if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
  const data = await res.json();
  return data.applications;
}

async function apiUpdateApplicationStatus(id, status) {
  const res = await fetch(`${BASE}/api/applications/status/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Update failed: ${res.status}`);
  }
  return res.json();
}