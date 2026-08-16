"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ImagePlus,
  PenLine,
  Shield,
  Trash2,
} from "lucide-react";

export default function OrganizationsPage() {
  const router = useRouter();

  const [organizations, setOrganizations] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const sealInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  async function loadOrganizations() {
    try {
      setLoading(true);

      const res = await fetch("/api/organizations", {
        cache: "no-store",
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await res.json();

      if (!res.ok || !Array.isArray(data)) {
        setOrganizations([]);
        setMessage("❌ Unable to load organizations.");
        return;
      }

      setOrganizations(data);
    } catch (error) {
      console.error(error);
      setOrganizations([]);
      setMessage("❌ Unable to connect to the organization service.");
    } finally {
      setLoading(false);
    }
  }

  async function createOrganization() {
    setMessage("");

    if (!name.trim()) {
      setMessage("❌ Organization name is required.");
      return;
    }

    let logoPath = "";

    try {
      if (logo) {
        const formData = new FormData();
        formData.append("logo", logo);

        const uploadRes = await fetch("/api/upload-logo", {
          method: "POST",
          body: formData,
        });

        if (uploadRes.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (!uploadRes.ok) {
          setMessage("❌ Logo upload failed.");
          return;
        }

        const uploadData = await uploadRes.json();
        logoPath = uploadData.logo || "";
      }

      const res = await fetch("/api/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          logo: logoPath,
        }),
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (res.ok) {
        setName("");
        setLogo(null);
        setMessage("Organization created successfully.");
        await loadOrganizations();
      } else {
        setMessage("❌ Failed to create organization.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Organization creation failed.");
    }
  }

  async function updateBranding(
    field: "logo" | "signature" | "seal",
    file: File
  ) {
    if (!selectedOrg) return;

    setMessage("");

    try {
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

      if (uploadRes.status === 401) {
        router.replace("/admin/login");
        return;
      }

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

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (res.ok) {
        setMessage(`${field} updated successfully.`);
        await loadOrganizations();
      } else {
        setMessage(`❌ Failed to update ${field}.`);
      }
    } catch (error) {
      console.error(error);
      setMessage(`❌ Failed to update ${field}.`);
    }
  }

  async function deleteOrganization(id: string) {
    if (!confirm("Delete this organization?")) return;

    setMessage("");

    try {
      const res = await fetch("/api/organizations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (res.ok) {
        setMessage("Organization deleted successfully.");
        await loadOrganizations();
      } else {
        setMessage("❌ Delete failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Delete failed.");
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f7f4ec]">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9a227]/40 bg-[#0b0b0b] text-[#d4af37]">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">
                Organizations
              </h1>

              <p className="mt-1 text-sm text-[#8f8a80]">
                Manage organizations, logos, signatures and seals.
              </p>
            </div>

          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

          {/* Add Organization */}
          <section className="h-fit rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">

            <div className="mb-6">

              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
                ORGANIZATION MANAGEMENT
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Add Organization
              </h2>

            </div>

            <label className="mb-2 block text-xs font-semibold tracking-wide text-[#b7b1a3]">
              ORGANIZATION NAME
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Organization Name"
              className="mb-5 w-full rounded-lg border border-[#34312b] bg-[#050505] px-4 py-3 text-sm text-[#f7f4ec] outline-none placeholder:text-[#625e56] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30"
            />

            <label className="mb-2 block text-xs font-semibold tracking-wide text-[#b7b1a3]">
              ORGANIZATION LOGO
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setLogo(e.target.files[0]);
                }
              }}
              className="mb-5 w-full rounded-lg border border-[#34312b] bg-[#050505] p-3 text-sm text-[#b7b1a3] file:mr-4 file:rounded-md file:border-0 file:bg-[#c9a227] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#050505]"
            />

            <button
              onClick={createOrganization}
              className="w-full rounded-lg bg-[#c9a227] px-6 py-3 text-sm font-semibold text-[#050505] transition hover:bg-[#d4af37]"
            >
              Add Organization
            </button>

            {message && (
              <div className="mt-5 rounded-lg border border-[#c9a227]/15 bg-[#11100d] p-3 text-sm text-[#d4af37]">
                {message}
              </div>
            )}

          </section>

          {/* Organization List */}
          <section className="rounded-2xl border border-[#c9a227]/20 bg-[#0b0b0b] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
                  ORGANIZATION DIRECTORY
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Existing Organizations
                </h2>
              </div>

              <span className="rounded-full border border-[#c9a227]/25 bg-[#11100d] px-3 py-1 text-xs text-[#b7b1a3]">
                {organizations.length}
              </span>

            </div>

            {loading ? (
              <div className="rounded-xl border border-[#34312b] bg-[#050505] p-8 text-center text-sm text-[#8f8a80]">
                Loading organizations...
              </div>
            ) : organizations.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#34312b] bg-[#050505] p-8 text-center text-sm text-[#8f8a80]">
                No organizations found.
              </div>
            ) : (
              <div className="space-y-6">

                {organizations.map((org) => (

                  <div
                    key={org.id}
                    className="rounded-xl border border-[#34312b] bg-[#050505] p-5"
                  >

                    <div className="flex flex-col gap-6 xl:flex-row">

                      {/* Logo */}
                      <div className="shrink-0">

                        {org.logo ? (
                          <img
                            src={org.logo}
                            alt={org.name}
                            className="h-20 w-20 rounded-lg border border-[#34312b] bg-white object-contain"
                          />
                        ) : (
                          <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-[#34312b] bg-[#11100d] text-xs text-[#625e56]">
                            No Logo
                          </div>
                        )}

                      </div>

                      <div className="flex-1">

                        <h3 className="text-lg font-semibold text-[#f7f4ec]">
                          {org.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#625e56]">
                          Created{" "}
                          {new Date(
                            org.createdAt
                          ).toLocaleDateString()}
                        </p>

                        {/* Branding */}
                        <div className="mt-6 grid gap-5 md:grid-cols-2">

                          <div>
                            <p className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-[#b7b1a3]">
                              <PenLine size={14} />
                              SIGNATURE
                            </p>

                            {org.signature ? (
                              <img
                                src={org.signature}
                                alt="Signature"
                                className="h-20 rounded-lg border border-[#34312b] bg-white p-2"
                              />
                            ) : (
                              <div className="rounded-lg border border-[#34312b] bg-[#11100d] p-4 text-xs text-[#625e56]">
                                No Signature
                              </div>
                            )}

                          </div>

                          <div>
                            <p className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-[#b7b1a3]">
                              <Shield size={14} />
                              SEAL
                            </p>

                            {org.seal ? (
                              <img
                                src={org.seal}
                                alt="Seal"
                                className="h-20 rounded-lg border border-[#34312b] bg-white p-2"
                              />
                            ) : (
                              <div className="rounded-lg border border-[#34312b] bg-[#11100d] p-4 text-xs text-[#625e56]">
                                No Seal
                              </div>
                            )}

                          </div>

                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-wrap gap-3">

                          <button
                            onClick={() => {
                              setSelectedOrg(org);
                              logoInputRef.current?.click();
                            }}
                            className="flex items-center gap-2 rounded-lg border border-[#c9a227]/30 bg-[#11100d] px-4 py-2 text-xs font-semibold text-[#d4af37] transition hover:border-[#c9a227] hover:bg-[#171510]"
                          >
                            <ImagePlus size={14} />
                            Replace Logo
                          </button>

                          <button
                            onClick={() => {
                              setSelectedOrg(org);
                              signatureInputRef.current?.click();
                            }}
                            className="flex items-center gap-2 rounded-lg border border-[#c9a227]/30 bg-[#11100d] px-4 py-2 text-xs font-semibold text-[#d4af37] transition hover:border-[#c9a227] hover:bg-[#171510]"
                          >
                            <PenLine size={14} />
                            Replace Signature
                          </button>

                          <button
                            onClick={() => {
                              setSelectedOrg(org);
                              sealInputRef.current?.click();
                            }}
                            className="flex items-center gap-2 rounded-lg border border-[#c9a227]/30 bg-[#11100d] px-4 py-2 text-xs font-semibold text-[#d4af37] transition hover:border-[#c9a227] hover:bg-[#171510]"
                          >
                            <Shield size={14} />
                            Replace Seal
                          </button>

                          <button
                            onClick={() =>
                              deleteOrganization(org.id)
                            }
                            className="flex items-center gap-2 rounded-lg border border-red-900/50 bg-red-950/20 px-4 py-2 text-xs font-semibold text-red-300 transition hover:border-red-700 hover:bg-red-950/40"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </section>

        </div>

        {/* Hidden upload inputs */}

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

      </div>

    </main>
  );
}