export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow">

        <h1 className="text-3xl font-bold">
          Verify Digital Credential
        </h1>

        <input
          placeholder="Enter Credential ID"
          className="mt-8 w-full rounded-lg border p-3"
        />

        <button
          className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-white"
        >
          Verify
        </button>

      </div>

    </main>
  );
}