import {
  BadgeCheck,
  QrCode,
  FileSpreadsheet,
  Shield,
  Palette,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Professional Certificates",
    description:
      "Generate elegant, enterprise-grade certificates for training, internships, workshops and awards.",
  },
  {
    icon: QrCode,
    title: "QR Verification",
    description:
      "Every certificate includes a secure QR code for instant online verification.",
  },
  {
    icon: FileSpreadsheet,
    title: "Bulk Upload",
    description:
      "Issue hundreds of certificates at once using CSV or Excel uploads.",
  },
  {
    icon: Shield,
    title: "Revocation Support",
    description:
      "Instantly revoke certificates while preserving a complete audit trail.",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description:
      "Upload logos, signatures and templates for every organization.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track issued, verified and revoked certificates with a modern dashboard.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Enterprise Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Everything needed to issue trusted certificates
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Built for companies, universities, NGOs and training
            organizations that require secure digital certification.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                  <Icon className="h-7 w-7 text-blue-600" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}