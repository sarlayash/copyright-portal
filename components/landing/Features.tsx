import {
  QrCode,
  Building2,
 FileSpreadsheet,
  FileCheck2,
  Download,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "QR Code Verification",
    description:
      "Every certificate includes a unique QR code that instantly verifies authenticity through the public verification portal.",
  },
  {
    icon: Building2,
    title: "Multi-Organization Support",
    description:
      "Manage multiple organizations from a single dashboard with dedicated logos, signatures and official seals.",
  },
  {
    icon: FileCheck2,
    title: "Professional Certificates",
    description:
      "Generate beautifully branded digital certificates with organization identity, issue details and secure verification.",
  },
  {
    icon: FileSpreadsheet,
    title: "Bulk Certificate Issuance",
    description:
      "Upload Excel or CSV files to issue hundreds of certificates quickly with automatic processing and QR generation.",
  },
  {
    icon: Download,
    title: "PDF Downloads",
    description:
      "Recipients can download professionally formatted PDF certificates and verification documents at any time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Administration",
    description:
      "Role-based administration, centralized certificate management and secure verification help maintain digital trust.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            SarlaYash Digital Trust Platform
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            Everything Needed for Trusted Digital Certification
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Built for educational institutions, companies, NGOs,
            training providers and organizations that require secure,
            verifiable and professionally branded digital certificates.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-800">
                  <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
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