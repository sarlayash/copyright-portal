"use client";

import { useState } from "react";

export default function IssuePage() {
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("Digital Trust Platform");

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
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
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

          <input
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            placeholder="Issuer"
            className="w-full rounded-lg border p-3"
          />

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