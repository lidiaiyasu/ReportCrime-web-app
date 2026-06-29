export type UserRole = "citizen" | "officer" | "investigator" | "admin";

export interface SessionUser {
  username: string;
  name: string;
  role: UserRole;
  badgeNumber?: string;
}

export type CrimeType =
  | "theft"
  | "assault"
  | "fraud"
  | "murder"
  | "drug"
  | "cyber"
  | "humanTrafficking"
  | "other";

export type CaseStatus = "open" | "investigating" | "closed" | "pendingTrial";

export interface CrimeReport {
  id: string;
  crimeTitle: string;
  crimeType: CrimeType;
  region: string;
  address?: string;
  date: string;
  time?: string;
  description: string;
  suspectInfo?: string;
  suspectName?: string;
  suspectAge?: number;
  suspectGender?: "male" | "female" | "";
  suspectId?: string;
  suspectAddress?: string;
  victimName?: string;
  victimAge?: number;
  victimGender?: "male" | "female" | "";
  victimContact?: string;
  reporterName?: string;
  reporterContact?: string;
  reporterRole?: "citizen" | "police" | "investigator";
  officerName?: string;
  badgeNumber?: string;
  status: CaseStatus;
  createdAt: string;
}

export interface DashboardStats {
  totalCases: number;
  openInvestigations: number;
  closedCases: number;
  newAlerts: number;
}
