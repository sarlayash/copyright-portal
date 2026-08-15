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
    include: {
      organization: true,
    },
  });

  if (!certificate) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-10">
      <CertificateCard certificate={certificate} />
    </main>
  );
}