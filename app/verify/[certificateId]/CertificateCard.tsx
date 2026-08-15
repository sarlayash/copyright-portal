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
};

export default function CertificateCard({
  certificate,
}: {
  certificate: Certificate;
}) {
  async function downloadPDF() {
  try {
    const pdf = new jsPDF("p", "mm", "a4");

    let y = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("Certificate Verification", 20, y);

    y += 15;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

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
    y += 20;

    if (certificate.qrCode) {
      pdf.text("Verification QR Code", 20, y);
      y += 5;

      pdf.addImage(
        certificate.qrCode,
        "PNG",
        20,
        y,
        50,
        50
      );
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
        style={{
          background: "#ffffff",
          color: "#000000",
          padding: "40px",
          borderRadius: "16px",
        }}
        className="w-full max-w-2xl mx-auto shadow-lg"
      >
        <h1 className="mb-6 text-4xl font-bold text-green-600">
          ✅ Certificate Verified
        </h1>

        <div className="space-y-4">
          <div>
            <strong>Certificate ID:</strong>
            <br />
            {certificate.certificateId}
          </div>

          <div>
            <strong>Recipient:</strong>
            <br />
            {certificate.recipient}
          </div>

          <div>
            <strong>Title:</strong>
            <br />
            {certificate.title}
          </div>

          <div>
            <strong>Issuer:</strong>
            <br />
            {certificate.issuer}
          </div>

          <div>
            <strong>Issued On:</strong>
            <br />
            {new Date(certificate.issuedAt).toLocaleDateString()}
          </div>

          <div>
            <strong>Status:</strong>
            <br />
            <span className="rounded bg-green-100 px-3 py-1 text-green-700">
              {certificate.status}
            </span>
          </div>

          {certificate.qrCode && (
            <div className="mt-8 text-center">
              <h2 className="mb-3 text-lg font-semibold">
                Verification QR Code
              </h2>

              <img
                src={certificate.qrCode}
                alt="QR Code"
                className="mx-auto h-48 w-48 border rounded"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={downloadPDF}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </>
  );
}