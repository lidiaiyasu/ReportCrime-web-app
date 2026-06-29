"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { CrimeReport } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import "./search-reports.css";

export default function SearchReportsPage() {
  const [query, setQuery] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [reports, setReports] = useState<CrimeReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runSearch = async () => {
    setIsLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (crimeType) params.set("crimeType", crimeType);
    if (status) params.set("status", status);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    try {
      const res = await fetch(`/api/reports?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load reports.");
      const body = await res.json();
      setReports(body.reports);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runSearch();
  };

  const handleReset = () => {
    setQuery("");
    setCrimeType("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setTimeout(runSearch, 0);
  };

  return (
    <div className="container" id="main-content">
      <h1>Search Crime Reports</h1>

      <form onSubmit={handleSubmit}>
        <div className="filters">
          <input
            type="text"
            aria-label="Search by title, suspect, or victim"
            placeholder="Search by title, suspect, or victim..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            aria-label="Filter by crime type"
            value={crimeType}
            onChange={(e) => setCrimeType(e.target.value)}
          >
            <option value="">All Crime Types</option>
            <option value="theft">Theft</option>
            <option value="assault">Assault</option>
            <option value="fraud">Fraud</option>
            <option value="other">Other</option>
          </select>

          <input
            type="date"
            aria-label="Start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            aria-label="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="closed">Closed</option>
            <option value="pendingTrial">Pending Trial</option>
          </select>

          <Button type="submit" isLoading={isLoading}>
            Search
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      {error && (
        <p role="alert" style={{ color: "var(--color-danger-600)", marginTop: 12 }}>
          {error}
        </p>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Crime ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Date &amp; Time</th>
              <th>Status</th>
              <th>Officer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.crimeTitle}</td>
                <td style={{ textTransform: "capitalize" }}>{r.crimeType}</td>
                <td>
                  {r.date} {r.time ?? ""}
                </td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
                <td>{r.officerName ?? "Unassigned"}</td>
                <td>
                  <Link href={`/view-crime/${r.id}`} className="view-btn">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {!isLoading && reports.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 24 }}>
                  No reports match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
