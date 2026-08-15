"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Building2,
  Users,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "5",
    subtitle: "Organizations",
    icon: Building2,
    color: "text-blue-600",
  },
  {
    title: "1000+",
    subtitle: "Certificates Issued",
    icon: Award,
    color: "text-emerald-600",
  },
  {
    title: "5000+",
    subtitle: "Students Certified",
    icon: Users,
    color: "text-violet-600",
  },
  {
    title: "LIVE",
    subtitle: "Platform Status",
    icon: Activity,
    color: "text-green-600",
  },
];

export default function Stats() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    function updateClock() {
      setCurrentTime(
        new Date().toLocaleString("en-IN", {
          dateStyle: "full",
          timeStyle: "medium",
        })
      );
    }

    updateClock();

    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row">

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Platform Status
            </h2>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Current Server Time
            </p>

            <p className="mt-1 font-mono text-lg text-blue-600 dark:text-blue-400">
              {currentTime}
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-full bg-green-100 px-5 py-3 dark:bg-green-900/30">
            <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

            <span className="font-semibold text-green-700 dark:text-green-400">
              LIVE
            </span>
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.subtitle}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Icon className={`h-7 w-7 ${item.color}`} />
                </div>

                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-slate-600 dark:text-slate-400">
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