"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck } from "lucide-react";

export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    if (!certificateId.trim()) {
      alert("Please enter a Certificate ID");
      return;
    }

    router.push(`/verify/${certificateId.trim()}`);
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f7f4ec]">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">

        <div className="w-full max-w-xl">

          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#c9a227]/40 bg-[#0b0b0b] text-[#d4af37] shadow-[0_15px_50px_rgba(0,0,0,0.4)]">
              <ShieldCheck size={30} />
            </div>

            <p className="mt-6 text-[10px] font-semibold tracking-[0.25em] text-[#d4af37]">
              DIGITAL TRUST PLATFORM
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Verify Digital Credential
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8f8a80]">
              Verify the authenticity of a digital certificate using its
              unique credential ID.
            </p>
          </div>

          {/* Verification Card */}
          <div className="rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-8">

            <div className="mb-6">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
                CREDENTIAL VERIFICATION
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Enter Certificate ID
              </h2>
            </div>

            <label
              htmlFor="certificateId"
              className="mb-2 block text-xs font-semibold tracking-wide text-[#b7b1a3]"
            >
              CERTIFICATE ID
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#625e56]"
              />

              <input
                id="certificateId"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleVerify();
                  }
                }}
                placeholder="e.g. DTP-1786776879731"
                className="w-full rounded-xl border border-[#34312b] bg-[#050505] py-3.5 pl-11 pr-4 text-sm text-[#f7f4ec] outline-none transition placeholder:text-[#625e56] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30"
              />
            </div>

            <button
              onClick={handleVerify}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c9a227] px-6 py-3.5 text-sm font-semibold text-[#050505] transition hover:bg-[#d4af37] focus:outline-none focus:ring-4 focus:ring-[#c9a227]/20"
            >
              <ShieldCheck size={17} />
              Verify Credential
            </button>

            <div className="mt-6 border-t border-[#34312b] pt-5 text-center">
              <p className="text-xs leading-5 text-[#625e56]">
                Enter the exact Certificate ID provided on the digital
                credential.
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-[#625e56]">
            Secure credential verification • Digital Trust Platform
          </p>
        </div>
      </div>
    </main>
  );
}