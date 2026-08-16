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
      "Create polished digital certificates for training, internships, workshops, achievements and awards.",
  },
  {
    icon: QrCode,
    title: "QR Verification",
    description:
      "Every certificate can be verified through a dedicated QR-powered verification experience.",
  },
  {
    icon: FileSpreadsheet,
    title: "Bulk Certificate Issuance",
    description:
      "Process large certificate batches through structured CSV or spreadsheet-based workflows.",
  },
  {
    icon: Shield,
    title: "Certificate Management",
    description:
      "Manage issued credentials and support certificate status and verification workflows.",
  },
  {
    icon: Palette,
    title: "Organization Branding",
    description:
      "Support organization identity through logos, authorized signatures, seals and certificate presentation.",
  },
  {
    icon: BarChart3,
    title: "Administration",
    description:
      "Provide authorized staff with tools for certificate issuance, organizations and operational management.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#f7f4ec] py-20 dark:bg-[#050505]"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

          <span className="inline-flex rounded-full border border-[#c9a227]/35 bg-[#c9a227]/5 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-[#8a6d12] dark:text-[#d4af37]">
            PLATFORM CAPABILITIES
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#171717] dark:text-[#f7f4ec] md:text-4xl">
            Digital credentials built around trust
          </h2>

          <p className="mt-4 text-base leading-7 text-[#6b675d] dark:text-[#a8a294]">
            A focused platform for organizations that need to issue,
            manage and verify digital credentials with confidence.
          </p>

        </div>

        {/* Feature Grid */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-[#d8d1c0] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c9a227]/50 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:border-[#2a2a2a] dark:bg-[#0b0b0b] dark:hover:border-[#c9a227]/50 dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c9a227]/30 bg-[#c9a227]/5 text-[#b28d18] transition group-hover:border-[#d4af37] group-hover:text-[#d4af37] dark:text-[#d4af37]">
                  <Icon
                    size={22}
                    strokeWidth={1.7}
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-[#171717] dark:text-[#f7f4ec]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6b675d] dark:text-[#a8a294]">
                  {feature.description}
                </p>

                <div className="mt-6 h-px w-10 bg-[#c9a227]/50 transition-all duration-300 group-hover:w-16 group-hover:bg-[#d4af37]" />

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}