"use client";

import jsPDF from "jspdf";

type Certificate = {
  certificateId: string;
  recipient: string;
  title: string;
  issuer: string;
  issuedAt: string | Date;
  status: string;
  qrCode: string | null;
  organization: {
    name: string;
    website: string | null;
    logo: string | null;
  } | null;
};

export default function CertificateCard({
  certificate,
}: {
  certificate: Certificate;
}) {
  async function downloadPDF() {
    try {
      const pdf = new jsPDF("p", "mm", "a4");

      pdf.setDrawColor(120);
      pdf.setLineWidth(1.5);
      pdf.rect(10, 10, 190, 277);

      pdf.setDrawColor(180);
      pdf.setLineWidth(0.5);
      pdf.rect(15, 15, 180, 267);

      let y = 20;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.text("Certificate Verification", 20, y);

      y += 15;

      if (certificate.organization?.name) {
        pdf.setFontSize(14);
        pdf.text(
          `Organization: ${certificate.organization.name}`,
          20,
          y
        );
        y += 10;
      }

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);

      pdf.text(`Certificate ID: ${certificate.certificateId}`, 20, y);
      y += 10;

      pdf.text(`Recipient: ${certificate.recipient}`, 20, y);
      y += 10;

      pdf.text(`Title: ${certificate.title}`, 20, y);
      y += 10;

      pdf.text(`Issuer: ${certificate.issuer}`, 20, y);
      y += 10;

      pdf.text(
        `Issued On: ${new Date(certificate.issuedAt).toLocaleDateString()}`,
        20,
        y
      );
      y += 10;

      pdf.text(`Status: ${certificate.status}`, 20, y);
      y += 10;

      if (certificate.organization?.website) {
        pdf.text(
          `Website: ${certificate.organization.website}`,
          20,
          y
        );
        y += 15;
      }

      if (certificate.qrCode) {
        pdf.text("Verification QR Code", 20, y);
        y += 5;

        pdf.addImage(certificate.qrCode, "PNG", 20, y, 50, 50);
      }

      pdf.save(`${certificate.certificateId}.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed.");
    }
  }

  return (
    <>
      <div
        id="certificate-card"
        className="w-full max-w-4xl rounded-3xl border-8 border-gray-400 bg-white p-12 shadow-2xl"
      >
        {certificate.organization?.logo && (
          <div className="mb-8 flex justify-center">
            <img
              src={certificate.organization.logo}
              alt={certificate.organization.name}
              className="h-24 object-contain"
            />
          </div>
        )}

        <h1 className="mb-2 text-center text-5xl font-bold text-green-700">
          ✅ Certificate Verified
        </h1>

        {certificate.organization?.name && (
          <h2 className="mb-8 text-center text-2xl font-semibold text-gray-700">
            {certificate.organization.name}
          </h2>
        )}

        <div className="space-y-5 text-lg">
          <div>
            <strong>Certificate ID</strong>
            <br />
            {certificate.certificateId}
          </div>

          <div>
            <strong>Recipient</strong>
            <br />
            {certificate.recipient}
          </div>

          <div>
            <strong>Title</strong>
            <br />
            {certificate.title}
          </div>

          <div>
            <strong>Issued By</strong>
            <br />
            {certificate.issuer}
          </div>

          <div>
            <strong>Issued On</strong>
            <br />
            {new Date(certificate.issuedAt).toLocaleDateString()}
          </div>

          {certificate.organization?.website && (
            <div>
              <strong>Website</strong>
              <br />
              {certificate.organization.website}
            </div>
          )}

          <div>
            <strong>Status</strong>
            <br />
            <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
              {certificate.status}
            </span>
          </div>

          {certificate.qrCode && (
            <div className="pt-8 text-center">
              <h3 className="mb-4 text-xl font-bold">
                Verification QR Code
              </h3>

              <img
                src={certificate.qrCode}
                alt="QR Code"
                className="mx-auto h-52 w-52 rounded-xl border-4 border-gray-300 p-2"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={downloadPDF}
          className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </>
  );
}