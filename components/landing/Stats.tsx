import { Award, Building2, ShieldCheck, Users } from "lucide-react";

const stats = [
  {
    title: "50,000+",
    subtitle: "Certificates Issued",
    icon: Award,
    color: "text-blue-600",
  },
  {
    title: "120+",
    subtitle: "Organizations",
    icon: Building2,
    color: "text-emerald-600",
  },
  {
    title: "99.99%",
    subtitle: "Verification Success",
    icon: ShieldCheck,
    color: "text-violet-600",
  },
  {
    title: "1 Million+",
    subtitle: "Recipients",
    icon: Users,
    color: "text-orange-600",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100">
                  <Icon className={`h-7 w-7 ${item.color}`} />
                </div>

                <h3 className="text-4xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-slate-600">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}