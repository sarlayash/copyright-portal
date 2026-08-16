"use client";

import { useState } from "react";
import { Award, CheckCircle2, ShieldCheck } from "lucide-react";

export default function IssuePage() {
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("SarlaYash Mission");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    if (!recipient.trim() || !title.trim()) {
      setMessage("⚠️ Please enter both recipient name and credential title.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
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
          `✅ Certificate issued successfully! ID: ${data.certificateId}`
        );
      } else {
        setMessage("❌ Failed to issue certificate.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessage("❌ Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f7f4ec]">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9a227]/40 bg-[#0b0b0b] text-[#d4af37]">
              <Award size={22} />
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
                DIGITAL TRUST PLATFORM
              </p>

              <h1 className="mt-1 text-2xl font-semibold">
                Issue Digital Credential
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#8f8a80]">
            Create a secure, verifiable digital certificate with a unique
            certificate ID and QR verification code.
          </p>
        </div>

        {/* Main Card */}
        <section className="overflow-hidden rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] shadow-[0_25px_80px_rgba(0,0,0,0.4)]">

          {/* Card Header */}
          <div className="border-b border-[#34312b] bg-[#0d0d0c] px-6 py-6 sm:px-8">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={19}
                className="text-[#d4af37]"
              />

              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
                  CREDENTIAL MANAGEMENT
                </p>

                <h2 className="mt-1 text-lg font-semibold text-[#f7f4ec]">
                  Certificate Information
                </h2>
              </div>
            </div>

            <p className="mt-3 text-sm text-[#8f8a80]">
              Enter the details below to issue a new credential.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-7 px-6 py-8 sm:px-8">

            {/* Recipient */}
            <div>
              <label
                htmlFor="recipient"
                className="mb-2 block text-xs font-semibold tracking-wide text-[#b7b1a3]"
              >
                RECIPIENT NAME
              </label>

              <input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient name"
                className="w-full rounded-xl border border-[#34312b] bg-[#050505] px-4 py-3.5 text-sm text-[#f7f4ec] outline-none transition placeholder:text-[#625e56] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30"
              />
            </div>

            {/* Credential Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-xs font-semibold tracking-wide text-[#b7b1a3]"
              >
                CREDENTIAL TITLE
              </label>

              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Java Programming Certification"
                className="w-full rounded-xl border border-[#34312b] bg-[#050505] px-4 py-3.5 text-sm text-[#f7f4ec] outline-none transition placeholder:text-[#625e56] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30"
              />
            </div>

            {/* Issuer */}
            <div>
              <label
                htmlFor="issuer"
                className="mb-2 block text-xs font-semibold tracking-wide text-[#b7b1a3]"
              >
                ISSUING ORGANIZATION
              </label>

              <select
                id="issuer"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className="w-full rounded-xl border border-[#34312b] bg-[#050505] px-4 py-3.5 text-sm text-[#f7f4ec] outline-none transition focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30"
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

            {/* Generate */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c9a227] px-6 py-3.5 text-sm font-semibold text-[#050505] transition hover:bg-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#c9a227]/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#050505]/30 border-t-[#050505]" />
                  Generating Credential...
                </>
              ) : (
                <>
                  <Award size={17} />
                  Generate Credential
                </>
              )}
            </button>

            {/* Message */}
            {message && (
              <div
                className={`rounded-xl border px-4 py-4 text-sm font-medium ${
                  message.startsWith("✅")
                    ? "border-[#c9a227]/30 bg-[#11100d] text-[#d4af37]"
                    : message.startsWith("⚠️")
                      ? "border-amber-500/30 bg-amber-950/20 text-amber-300"
                      : "border-red-500/30 bg-red-950/20 text-red-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.startsWith("✅") && (
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#d4af37]"
                    />
                  )}

                  <span>{message}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#625e56]">
          <ShieldCheck size={13} />
          <span>
            Each credential receives a unique ID and QR-based verification
            link.
          </span>
        </div>
      </div>
    </main>
  );
}