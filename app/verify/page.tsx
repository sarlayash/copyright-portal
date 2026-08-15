"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow">
        <h1 className="text-3xl font-bold">
          Verify Digital Credential
        </h1>

        <input
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          placeholder="Enter Credential ID"
          className="mt-8 w-full rounded-lg border p-3"
        />

        <button
          onClick={handleVerify}
          className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Verify
        </button>
      </div>
    </main>
  );
}