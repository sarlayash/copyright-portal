import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CertificateCard from "./CertificateCard";

type Props = {
  params: Promise<{
    certificateId: string;
  }>;
};

export default async function VerifyPage({ params }: Props) {
  const { certificateId } = await params;

  const certificate = await prisma.certificate.findUnique({
    where: {
      certificateId,
    },
  });

  if (!certificate) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-10">
      <CertificateCard certificate={certificate} />
    </main>
  );
}