import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold">
          Digital Trust Platform
        </h1>

        <p className="mt-2 text-slate-600">
          Administration Console
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-4">

          {[
            ["Credentials", "124"],
            ["Organizations", "8"],
            ["Verified Today", "32"],
            ["Revoked", "0"],
          ].map(([title, value]) => (
            <div
              key={title}
              className="rounded-2xl bg-white p-6 shadow"
            >
              <p className="text-slate-500">{title}</p>

              <h2 className="mt-2 text-4xl font-bold">
                {value}
              </h2>
            </div>
          ))}

        </div>

        <div className="mt-10 flex gap-4">

          <Link
            href="/admin/issue"
            className="rounded-xl bg-blue-600 px-6 py-3 text-white"
          >
            Issue Credential
          </Link>

          <Link
            href="/verify"
            className="rounded-xl border px-6 py-3"
          >
            Verify
          </Link>

        </div>

      </div>
    </main>
  );
}