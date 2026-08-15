"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function BulkUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);

  async function previewFile() {
    if (!file) return;

    const data = await file.arrayBuffer();

    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    if (rows.length > 100) {
      alert("Maximum 100 certificates per upload.");
      return;
    }

    setPreview(rows);
  }

  async function uploadCertificates() {
    if (preview.length === 0) {
      alert("Please preview a file first.");
      return;
    }

    const res = await fetch("/api/bulk-certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preview),
    });

    const data = await res.json();

    if (data.success) {
      alert(`Successfully issued ${data.inserted} certificates.`);
      setFile(null);
      setPreview([]);
    } else {
      alert(data.message || "Upload failed.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Bulk Certificate Upload
      </h1>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">
          Upload CSV or Excel File
        </h2>

        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
              setPreview([]);
            }
          }}
          className="mb-5 w-full rounded-lg border p-3"
        />

        {file && (
          <div className="mb-5 rounded-lg bg-blue-50 p-4">
            <p>
              <strong>Selected File:</strong> {file.name}
            </p>

            <p>
              <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={previewFile}
            disabled={!file}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            Preview File
          </button>

          <button
            onClick={uploadCertificates}
            disabled={preview.length === 0}
            className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 disabled:bg-gray-400"
          >
            Issue Certificates
          </button>
        </div>

        {preview.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">
              Preview ({Math.min(preview.length, 10)} Records)
            </h2>

            <pre className="overflow-auto rounded-lg bg-gray-100 p-4 text-sm">
              {JSON.stringify(preview.slice(0, 10), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}