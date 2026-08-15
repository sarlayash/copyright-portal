"use client";

import { useState } from "react";

export default function IssuePage() {
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("SarlaYash Mission");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient,
        title,
        issuer,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      setRecipient("");
      setTitle("");

      setMessage(
        `✅ Certificate Issued Successfully! ID: ${data.certificateId}`
      );
    } else {
      setMessage("❌ Failed to issue certificate");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-4xl rounded-3xl border-4 border-gray-300 bg-white p-10 shadow-2xl">
        <h1 className="text-3xl font-bold">
          Issue Digital Credential
        </h1>

        <div className="mt-8 space-y-5">
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient Name"
            className="w-full rounded-lg border p-3"
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Credential Title"
            className="w-full rounded-lg border p-3"
          />

          <div>
  <label className="mb-2 block font-medium">
    Issuer
  </label>

  <select
    value={issuer}
    onChange={(e) => setIssuer(e.target.value)}
    className="w-full rounded-lg border p-3"
  >
    <option value="SarlaYash Mission">
      SarlaYash Mission
    </option>

    <option value="SarlaYash Learning Solutions LLP">
      SarlaYash Learning Solutions LLP
    </option>

    <option value="Hadwik Data Solutions Pvt Ltd">
      Hadwik Data Solutions Pvt Ltd
    </option>

    <option value="Mentorship Powered By Kapil">
      Mentorship Powered By Kapil
    </option>

    <option value="Digital Trust Platform">
      Digital Trust Platform
    </option>
  </select>
</div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            {loading ? "Generating..." : "Generate Credential"}
          </button>

          {message && (
            <div className="rounded-lg bg-green-100 p-3">
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}