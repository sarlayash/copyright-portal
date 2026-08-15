"use client";

import { useEffect, useState } from "react";

export default function AdminManagement() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    const res = await fetch("/api/admins");
    const data = await res.json();
    setAdmins(data);
  }

  async function createAdmin() {
    setMessage("");

    const res = await fetch("/api/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setMessage("✅ Admin created successfully.");
      loadAdmins();
    } else {
      setMessage("❌ Failed to create admin.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Admin Management
      </h1>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-bold">
            Create New Admin
          </h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3 w-full rounded-lg border p-3"
            placeholder="Full Name"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-full rounded-lg border p-3"
            placeholder="Email Address"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 w-full rounded-lg border p-3"
            placeholder="Password"
          />

          <button
            onClick={createAdmin}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Create Admin
          </button>

          {message && (
            <div className="mt-4 rounded bg-green-100 p-3">
              {message}
            </div>
          )}
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-bold">
            Existing Admins
          </h2>

          {admins.length === 0 ? (
            <p className="text-gray-500">
              No admins found.
            </p>
          ) : (
            <div className="space-y-3">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="rounded-lg border p-3"
                >
                  <div className="font-semibold">
                    {admin.name}
                  </div>

                  <div className="text-gray-600">
                    {admin.email}
                  </div>

                  <div className="text-sm text-blue-600">
                    {admin.role}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}