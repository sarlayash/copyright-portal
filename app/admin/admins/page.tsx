"use client";

import { useEffect, useState } from "react";
import { Shield, UserPlus, Users } from "lucide-react";

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
    try {
      const res = await fetch("/api/admins", {
        cache: "no-store",
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setAdmins(data);
      } else {
        setAdmins([]);
      }
    } catch (error) {
      console.error(error);
      setAdmins([]);
    }
  }

  async function createAdmin() {
    setMessage("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("❌ Please complete all fields.");
      return;
    }

    try {
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
        setMessage("Admin created successfully.");
        await loadAdmins();
      } else {
        setMessage("❌ Failed to create admin.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create admin.");
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f7f4ec]">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9a227]/40 bg-[#0b0b0b] text-[#d4af37]">
              <Shield size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">
                Admin Management
              </h1>

              <p className="mt-1 text-sm text-[#8f8a80]">
                Manage administrators and platform access.
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

          {/* Create Admin */}
          <section className="h-fit rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">

            <div className="mb-6">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
                ACCESS MANAGEMENT
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Create New Admin
              </h2>
            </div>

            {/* Name */}
            <label className="mb-2 block text-xs font-semibold tracking-wide text-[#b7b1a3]">
              FULL NAME
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="mb-5 w-full rounded-lg border border-[#34312b] bg-[#050505] px-4 py-3 text-sm text-[#f7f4ec] outline-none placeholder:text-[#625e56] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30"
            />

            {/* Email */}
            <label className="mb-2 block text-xs font-semibold tracking-wide text-[#b7b1a3]">
              EMAIL ADDRESS
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="mb-5 w-full rounded-lg border border-[#34312b] bg-[#050505] px-4 py-3 text-sm text-[#f7f4ec] outline-none placeholder:text-[#625e56] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30"
            />

            {/* Password */}
            <label className="mb-2 block text-xs font-semibold tracking-wide text-[#b7b1a3]">
              PASSWORD
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mb-6 w-full rounded-lg border border-[#34312b] bg-[#050505] px-4 py-3 text-sm text-[#f7f4ec] outline-none placeholder:text-[#625e56] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30"
            />

            <button
              onClick={createAdmin}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#c9a227] px-6 py-3 text-sm font-semibold text-[#050505] transition hover:bg-[#d4af37]"
            >
              <UserPlus size={16} />
              Create Admin
            </button>

            {message && (
              <div className="mt-5 rounded-lg border border-[#c9a227]/15 bg-[#11100d] p-3 text-sm text-[#d4af37]">
                {message}
              </div>
            )}
          </section>

          {/* Existing Admins */}
          <section className="rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
                  ADMIN DIRECTORY
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Existing Administrators
                </h2>
              </div>

              <span className="flex items-center gap-2 rounded-full border border-[#c9a227]/25 bg-[#11100d] px-3 py-1 text-xs text-[#b7b1a3]">
                <Users size={13} />
                {admins.length}
              </span>
            </div>

            {admins.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#34312b] bg-[#050505] p-8 text-center text-sm text-[#8f8a80]">
                No admins found.
              </div>
            ) : (
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div
                    key={admin.id}
                    className="rounded-xl border border-[#34312b] bg-[#050505] p-5 transition hover:border-[#c9a227]/30"
                  >
                    <div className="flex items-start gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#c9a227]/25 bg-[#11100d] text-[#d4af37]">
                        <Shield size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-[#f7f4ec]">
                          {admin.name}
                        </div>

                        <div className="mt-1 text-sm text-[#8f8a80]">
                          {admin.email}
                        </div>

                        <div className="mt-3 inline-flex rounded-full border border-[#c9a227]/25 bg-[#11100d] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#d4af37]">
                          {admin.role}
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}