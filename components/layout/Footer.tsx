import Link from "next/link";
import {
  ShieldCheck,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}

          <div>
            <div className="mb-4 flex items-center gap-3">

              <div className="rounded-xl bg-blue-600 p-3 text-white">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  SarlaYash
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Digital Trust Platform
                </p>
              </div>

            </div>

            <p className="leading-7 text-slate-600 dark:text-slate-400">
              Secure issuance, verification and lifecycle management of
              digital certificates, credentials and copyright acknowledgements
              with QR-based authentication.
            </p>
          </div>

          {/* Platform */}

          <div>
            <h4 className="mb-5 font-semibold text-slate-900 dark:text-white">
              Platform
            </h4>

            <div className="space-y-3">

              <Link
                href="/"
                className="block text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
              >
                Home
              </Link>

              <Link
                href="/verify"
                className="block text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
              >
                Verify Certificate
              </Link>

              <Link
                href="/admin"
                className="block text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
              >
                Admin Dashboard
              </Link>

            </div>
          </div>

          {/* SarlaYash Ecosystem */}

          <div>
            <h4 className="mb-5 font-semibold text-slate-900 dark:text-white">
              SarlaYash Ecosystem
            </h4>

            <div className="space-y-3">

              <a
                href="https://www.sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
              >
                <Globe size={16} />
                www.sarlayash.com
                <ExternalLink size={14} />
              </a>

              <a
                href="https://sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
              >
                <Globe size={16} />
                sarlayash.com
                <ExternalLink size={14} />
              </a>

              <a
                href="https://hackathons.sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
              >
                <Globe size={16} />
                hackathons.sarlayash.com
                <ExternalLink size={14} />
              </a>

              <a
                href="https://dawk.sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
              >
                <Globe size={16} />
                dawk.sarlayash.com
                <ExternalLink size={14} />
              </a>

              <a
                href="https://syaaas.sarlayash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 transition hover:text-blue-600 dark:text-slate-400"
              >
                <Globe size={16} />
                syaaas.sarlayash.com
                <ExternalLink size={14} />
              </a>

            </div>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} SarlaYash Technologies. All Rights Reserved.
          </p>

          <p>
            Built with ❤️ in India • Digital Trust Platform
          </p>

        </div>

      </div>
    </footer>
  );
}