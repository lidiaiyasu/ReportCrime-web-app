import { notFound } from "next/navigation";
import { getReportById } from "@/lib/data/reports";
import { StatusBadge } from "@/components/ui/StatusBadge";
import ViewCrimeActions from "./ViewCrimeActions";
import "./view-crime.css";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const report = getReportById(params.id);
  return {
    title: report
      ? `${report.id} — ${report.crimeTitle} | Police Portal`
      : "Report not found | Police Portal",
  };
}

export default function ViewCrimePage({
  params,
}: {
  params: { id: string };
}) {
  const report = getReportById(params.id);

  if (!report) {
    notFound();
  }

  return (
    <div className="container" id="main-content">
      <h1>
        Crime Report Details <StatusBadge status={report.status} />
      </h1>

      <section className="report-section">
        <h2>Crime Details</h2>
        <p>
          <strong>ID:</strong> {report.id}
        </p>
        <p>
          <strong>Title:</strong> {report.crimeTitle}
        </p>
        <p>
          <strong>Type:</strong> {report.crimeType}
        </p>
        <p>
          <strong>Date &amp; Time:</strong> {report.date} {report.time ?? ""}
        </p>
        <p>
          <strong>Location:</strong> {report.address || report.region || "—"}
        </p>
        <p>
          <strong>Description:</strong> {report.description}
        </p>
      </section>

      {(report.suspectName || report.suspectInfo) && (
        <section className="report-section">
          <h2>Suspect Information</h2>
          {report.suspectName && (
            <p>
              <strong>Name:</strong> {report.suspectName}
            </p>
          )}
          {report.suspectAge != null && (
            <p>
              <strong>Age:</strong> {report.suspectAge}
            </p>
          )}
          {report.suspectGender && (
            <p>
              <strong>Gender:</strong> {report.suspectGender}
            </p>
          )}
          {report.suspectId && (
            <p>
              <strong>National ID:</strong> {report.suspectId}
            </p>
          )}
          {report.suspectAddress && (
            <p>
              <strong>Address:</strong> {report.suspectAddress}
            </p>
          )}
          {report.suspectInfo && (
            <p>
              <strong>Notes:</strong> {report.suspectInfo}
            </p>
          )}
        </section>
      )}

      {report.victimName && (
        <section className="report-section">
          <h2>Victim Information</h2>
          <p>
            <strong>Name:</strong> {report.victimName}
          </p>
          {report.victimAge != null && (
            <p>
              <strong>Age:</strong> {report.victimAge}
            </p>
          )}
          {report.victimGender && (
            <p>
              <strong>Gender:</strong> {report.victimGender}
            </p>
          )}
          {report.victimContact && (
            <p>
              <strong>Contact:</strong> {report.victimContact}
            </p>
          )}
        </section>
      )}

      <section className="report-section">
        <h2>Reporting Details</h2>
        {report.officerName && (
          <p>
            <strong>Officer:</strong> {report.officerName}
          </p>
        )}
        {report.badgeNumber && (
          <p>
            <strong>Badge Number:</strong> {report.badgeNumber}
          </p>
        )}
        {report.reporterName && (
          <p>
            <strong>Reported by:</strong> {report.reporterName} (
            {report.reporterRole})
          </p>
        )}
        {report.reporterContact && (
          <p>
            <strong>Reporter contact:</strong> {report.reporterContact}
          </p>
        )}
        <p>
          <strong>Logged:</strong> {new Date(report.createdAt).toLocaleString()}
        </p>
      </section>

      <ViewCrimeActions />
    </div>
  );
}
