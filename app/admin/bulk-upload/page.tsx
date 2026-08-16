"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet, Upload, Eye, CheckCircle2 } from "lucide-react";

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
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f7f4ec]">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9a227]/40 bg-[#0b0b0b] text-[#d4af37]">
              <FileSpreadsheet size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">
                Bulk Certificate Upload
              </h1>

              <p className="mt-1 text-sm text-[#8f8a80]">
                Issue multiple digital credentials from a CSV or Excel file.
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <section className="rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)] sm:p-8">

          {/* Section Header */}
          <div className="mb-7">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
              BULK CREDENTIAL MANAGEMENT
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Upload Certificate Data
            </h2>

            <p className="mt-1 text-sm text-[#8f8a80]">
              Maximum 100 certificates can be issued in a single upload.
            </p>
          </div>

          {/* File Upload */}
          <div className="rounded-xl border border-dashed border-[#c9a227]/30 bg-[#050505] p-6">

            <div className="flex flex-col items-center justify-center text-center">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-[#c9a227]/30 bg-[#11100d] text-[#d4af37]">
                <Upload size={24} />
              </div>

              <h3 className="text-sm font-semibold text-[#f7f4ec]">
                Select CSV or Excel File
              </h3>

              <p className="mt-1 text-xs text-[#625e56]">
                Supported formats: .csv, .xlsx, .xls
              </p>

              <label className="mt-5 cursor-pointer rounded-lg border border-[#c9a227]/30 bg-[#11100d] px-5 py-2.5 text-xs font-semibold text-[#d4af37] transition hover:border-[#c9a227] hover:bg-[#171510]">
                Choose File

                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0]);
                      setPreview([]);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Selected File */}
          {file && (
            <div className="mt-6 rounded-xl border border-[#c9a227]/20 bg-[#11100d] p-5">
              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c9a227] text-[#050505]">
                  <FileSpreadsheet size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#f7f4ec]">
                    Selected File
                  </p>

                  <p className="mt-1 break-all text-sm text-[#d4af37]">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-[#8f8a80]">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={previewFile}
              disabled={!file}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#c9a227]/30 bg-[#11100d] px-6 py-3 text-sm font-semibold text-[#d4af37] transition hover:border-[#c9a227] hover:bg-[#171510] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Eye size={16} />
              Preview File
            </button>

            <button
              onClick={uploadCertificates}
              disabled={preview.length === 0}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#c9a227] px-6 py-3 text-sm font-semibold text-[#050505] transition hover:bg-[#d4af37] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCircle2 size={16} />
              Issue Certificates
            </button>

          </div>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="mt-8">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
                    DATA PREVIEW
                  </p>

                  <h2 className="mt-2 text-lg font-semibold">
                    Certificate Records
                  </h2>
                </div>

                <span className="rounded-full border border-[#c9a227]/25 bg-[#11100d] px-3 py-1 text-xs text-[#b7b1a3]">
                  {preview.length} Records
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#34312b] bg-[#050505]">
                <pre className="max-h-[500px] overflow-auto p-5 text-xs leading-6 text-[#b7b1a3]">
                  {JSON.stringify(preview.slice(0, 10), null, 2)}
                </pre>
              </div>

              {preview.length > 10 && (
                <p className="mt-3 text-xs text-[#625e56]">
                  Showing the first 10 records. All {preview.length} records
                  will be processed when you issue the certificates.
                </p>
              )}

            </div>
          )}

        </section>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-[#625e56]">
          Digital Trust Platform • Secure Bulk Credential Issuance
        </p>

      </div>
    </main>
  );
}