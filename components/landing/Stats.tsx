import { Award, Building2, Users } from "lucide-react";

const stats = [
  {
    value: "5",
    label: "Organizations",
    description: "Organizations using the platform",
    icon: Building2,
  },
  {
    value: "1,000+",
    label: "Certificates",
    description: "Digital certificates issued",
    icon: Award,
  },
  {
    value: "5,000+",
    label: "Students",
    description: "Students reached",
    icon: Users,
  },
];

export default function Stats() {
  return (
    <section className="border-y border-[#c9a227]/20 bg-[#0b0b0b] py-16 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid divide-y divide-[#c9a227]/15 md:grid-cols-3 md:divide-x md:divide-y-0">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group px-6 py-8 text-center md:px-10"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a227]/30 bg-[#c9a227]/5 text-[#d4af37] transition group-hover:border-[#d4af37]">
                  <Icon size={20} strokeWidth={1.7} />
                </div>

                <p className="mt-5 text-4xl font-semibold tracking-tight text-[#d4af37]">
                  {stat.value}
                </p>

                <h3 className="mt-2 text-sm font-semibold tracking-wide text-[#f7f4ec]">
                  {stat.label}
                </h3>

                <p className="mt-2 text-xs text-[#8f8a80]">
                  {stat.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}