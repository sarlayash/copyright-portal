"use client";

import { useEffect, useRef, useState } from "react";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const [selectedOrg, setSelectedOrg] = useState<any>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const sealInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  async function loadOrganizations() {
    const res = await fetch("/api/organizations");
    const data = await res.json();
    setOrganizations(data);
  }

  async function createOrganization() {
    setMessage("");

    let logoPath = "";

    if (logo) {
      const formData = new FormData();
      formData.append("logo", logo);

      const uploadRes = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        setMessage("❌ Logo upload failed.");
        return;
      }

      const uploadData = await uploadRes.json();
      logoPath = uploadData.logo;
    }

    const res = await fetch("/api/organizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        logo: logoPath,
      }),
    });

    if (res.ok) {
      setName("");
      setLogo(null);
      setMessage("✅ Organization created.");
      loadOrganizations();
    } else {
      setMessage("❌ Failed to create organization.");
    }
  }

  async function updateBranding(
    field: "logo" | "signature" | "seal",
    file: File
  ) {
    if (!selectedOrg) return;

    const formData = new FormData();
    formData.append(field, file);

    const endpoint =
      field === "logo"
        ? "/api/upload-logo"
        : field === "signature"
        ? "/api/upload-signature"
        : "/api/upload-seal";

    const uploadRes = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) {
      setMessage(`❌ ${field} upload failed.`);
      return;
    }

    const upload = await uploadRes.json();

    const res = await fetch("/api/organizations/branding", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedOrg.id,
        logo:
          field === "logo"
            ? upload.logo
            : selectedOrg.logo,
        signature:
          field === "signature"
            ? upload.signature
            : selectedOrg.signature,
        seal:
          field === "seal"
            ? upload.seal
            : selectedOrg.seal,
      }),
    });

    if (res.ok) {
      setMessage(`✅ ${field} updated.`);
      loadOrganizations();
    } else {
      setMessage(`❌ Failed to update ${field}.`);
    }
  }

  async function deleteOrganization(id: string) {
    if (!confirm("Delete this organization?")) return;

    const res = await fetch("/api/organizations", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMessage("✅ Organization deleted.");
      loadOrganizations();
    } else {
      setMessage("❌ Delete failed.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Organizations
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Add Organization */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-bold">
            Add Organization
          </h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Organization Name"
            className="mb-4 w-full rounded-lg border p-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setLogo(e.target.files[0]);
              }
            }}
            className="mb-5 w-full rounded-lg border p-3"
          />

          <button
            onClick={createOrganization}
            className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
          >
            Add Organization
          </button>

          {message && (
            <div className="mt-5 rounded-lg bg-green-100 p-3">
              {message}
            </div>
          )}
        </div>

        {/* Organization List */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-bold">
            Existing Organizations
          </h2>

          {organizations.length === 0 ? (
            <p>No organizations found.</p>
          ) : (
            <div className="space-y-6">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex flex-1 gap-5">
                      <div>
                        {org.logo ? (
                          <img
                            src={org.logo}
                            alt={org.name}
                            className="h-20 w-20 rounded-lg border object-contain"
                          />
                        ) : (
                          <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-500">
                            No Logo
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold">
                          {org.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Created{" "}
                          {new Date(
                            org.createdAt
                          ).toLocaleDateString()}
                        </p>

                        <div className="mt-5 grid gap-6 md:grid-cols-2">
                          <div>
                            <p className="mb-2 text-sm font-semibold">
                              Signature
                            </p>

                            {org.signature ? (
                              <img
                                src={org.signature}
                                alt="Signature"
                                className="h-20 rounded border bg-white p-2"
                              />
                            ) : (
                              <div className="rounded border bg-gray-100 p-4 text-xs text-gray-500">
                                No Signature
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-semibold">
                              Seal
                            </p>

                            {org.seal ? (
                              <img
                                src={org.seal}
                                alt="Seal"
                                className="h-20 rounded border bg-white p-2"
                              />
                            ) : (
                              <div className="rounded border bg-gray-100 p-4 text-xs text-gray-500">
                                No Seal
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <button
                            onClick={() => {
                              setSelectedOrg(org);
                              logoInputRef.current?.click();
                            }}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                          >
                            Replace Logo
                          </button>

                          <button
                            onClick={() => {
                              setSelectedOrg(org);
                              signatureInputRef.current?.click();
                            }}
                            className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                          >
                            Replace Signature
                          </button>

                          <button
                            onClick={() => {
                              setSelectedOrg(org);
                              sealInputRef.current?.click();
                            }}
                            className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                          >
                            Replace Seal
                          </button>

                          <button
                            onClick={() =>
                              deleteOrganization(org.id)
                            }
                            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <input
        ref={logoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            updateBranding("logo", file);
            e.target.value = "";
          }
        }}
      />

      <input
        ref={signatureInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            updateBranding("signature", file);
            e.target.value = "";
          }
        }}
      />

      <input
        ref={sealInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            updateBranding("seal", file);
            e.target.value = "";
          }
        }}
      />
    </main>
  );
}