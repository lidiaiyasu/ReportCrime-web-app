import { CrimeReport, DashboardStats } from "@/lib/types";

// In-memory store. Resets on server restart — this stands in for a real
// database (Postgres/Supabase/etc.) so the rest of the app can be built
// against a realistic data + API shape without provisioning infra.
declare global {
  // eslint-disable-next-line no-var
  var __crimeReportsStore: CrimeReport[] | undefined;
}

const seedReports: CrimeReport[] = [
  {
    id: "CR001",
    crimeTitle: "Theft at Market",
    crimeType: "theft",
    region: "addis",
    address: "Central Market",
    date: "2025-08-15",
    time: "14:30",
    description: "Suspect stole multiple items from stalls.",
    suspectName: "Abebe Kebede",
    suspectAge: 32,
    suspectGender: "male",
    suspectId: "AB123456",
    suspectAddress: "Addis Ababa",
    victimName: "Birke Alemu",
    victimAge: 28,
    victimGender: "female",
    victimContact: "+251 900 123456",
    officerName: "Officer Adefris Teka",
    badgeNumber: "12345",
    status: "open",
    createdAt: "2025-08-15T14:30:00.000Z",
  },
  {
    id: "CR002",
    crimeTitle: "Assault Case",
    crimeType: "assault",
    region: "oromia",
    address: "Bole Road",
    date: "2025-08-14",
    time: "10:00",
    description: "Altercation outside a cafe resulted in injury.",
    officerName: "Officer Sara Tesfaye",
    badgeNumber: "67890",
    status: "closed",
    createdAt: "2025-08-14T10:00:00.000Z",
  },
];

function getStore(): CrimeReport[] {
  if (!global.__crimeReportsStore) {
    global.__crimeReportsStore = [...seedReports];
  }
  return global.__crimeReportsStore;
}

export function listReports(filters?: {
  query?: string;
  crimeType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}): CrimeReport[] {
  let reports = getStore();

  if (filters) {
    const { query, crimeType, status, startDate, endDate } = filters;

    if (query) {
      const q = query.toLowerCase();
      reports = reports.filter(
        (r) =>
          r.crimeTitle.toLowerCase().includes(q) ||
          r.suspectName?.toLowerCase().includes(q) ||
          r.victimName?.toLowerCase().includes(q)
      );
    }
    if (crimeType) {
      reports = reports.filter((r) => r.crimeType === crimeType);
    }
    if (status) {
      reports = reports.filter((r) => r.status === status);
    }
    if (startDate) {
      reports = reports.filter((r) => r.date >= startDate);
    }
    if (endDate) {
      reports = reports.filter((r) => r.date <= endDate);
    }
  }

  return [...reports].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getReportById(id: string): CrimeReport | undefined {
  return getStore().find((r) => r.id.toLowerCase() === id.toLowerCase());
}

export function createReport(
  input: Omit<CrimeReport, "id" | "status" | "createdAt"> & {
    status?: CrimeReport["status"];
  }
): CrimeReport {
  const store = getStore();
  const nextNumber = store.length + 1;
  const id = `CR${String(nextNumber).padStart(3, "0")}`;
  const report: CrimeReport = {
    ...input,
    id,
    status: input.status ?? "open",
    createdAt: new Date().toISOString(),
  };
  store.unshift(report);
  return report;
}

export function getDashboardStats(): DashboardStats {
  const reports = getStore();
  return {
    totalCases: reports.length,
    openInvestigations: reports.filter((r) => r.status === "investigating" || r.status === "open")
      .length,
    closedCases: reports.filter((r) => r.status === "closed").length,
    newAlerts: reports.filter((r) => r.status === "open").length,
  };
}
