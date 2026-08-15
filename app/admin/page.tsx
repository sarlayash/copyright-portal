"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");

    if (auth !== "true") {
      router.replace("/admin/login");
      return;
    }

    loadCertificates();
  }, [router]);

  async function loadCertificates() {
    const res = await fetch("/api/certificates");
    const data = await res.json();
    setCertificates(data);
  }

  function logout() {
    localStorage.removeItem("admin-auth");
    router.replace("/admin/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Digital Trust Platform
        </h1>

        <button
          onClick={logout}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Logout
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Certificates</p>
          <h2 className="text-4xl font-bold">
            {certificates.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Verified</p>
          <h2 className="text-4xl font-bold text-green-600">
            {
              certificates.filter(
                (c) => c.status === "VERIFIED"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Issued</p>
          <h2 className="text-4xl font-bold text-blue-600">
            {certificates.length}
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-4">Certificate ID</th>
              <th className="text-left p-4">Recipient</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {certificates.map((cert) => (

              <tr key={cert.id} className="border-b">

                <td className="p-4">{cert.certificateId}</td>

                <td className="p-4">{cert.recipient}</td>

                <td className="p-4">{cert.title}</td>

                <td className="p-4">

                  <span className="rounded bg-green-100 px-3 py-1 text-green-700">
                    {cert.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}