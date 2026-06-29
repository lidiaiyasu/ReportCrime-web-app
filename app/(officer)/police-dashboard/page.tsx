import { getSession } from "@/lib/auth";
import { getDashboardStats, listReports } from "@/lib/data/reports";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

export const metadata = {
  title: "Police Portal Dashboard",
};

export const dynamic = "force-dynamic";

export default async function PoliceDashboardPage() {
  const user = await getSession();
  const stats = getDashboardStats();
  const recent = listReports().slice(0, 5);

  return (
    <main className="dashboard" id="main-content">
      <section className="welcome">
        <h2>Hello, {user?.name ?? "Officer"}</h2>
        <p>Here is a summary of your current cases and alerts.</p>
      </section>

      <section className="stats-grid">
        <div className="stat-card blue">
          <h3>Total Cases</h3>
          <p>{stats.totalCases}</p>
        </div>

        <div className="stat-card orange">
          <h3>Open Investigations</h3>
          <p>{stats.openInvestigations}</p>
        </div>

        <div className="stat-card green">
          <h3>Closed Cases</h3>
          <p>{stats.closedCases}</p>
        </div>

        <div className="stat-card red">
          <h3>New Alerts</h3>
          <p>{stats.newAlerts}</p>
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h3 style={{ color: "var(--color-navy-800)", marginBottom: 12 }}>
          Recent Reports
        </h3>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {recent.map((r) => (
            <Link
              key={r.id}
              href={`/view-crime/${r.id}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 18px",
                borderBottom: "1px solid #eee",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span>
                <strong>{r.id}</strong> — {r.crimeTitle}
              </span>
              <StatusBadge status={r.status} />
            </Link>
          ))}
          {recent.length === 0 && (
            <p style={{ padding: 18, color: "#777" }}>No reports yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
