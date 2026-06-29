import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listReports, createReport } from "@/lib/data/reports";
import { registerCrimeSchema } from "@/lib/validation/registerCrime";
import { reportCrimeSchema } from "@/lib/validation/reportCrime";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const reports = listReports({
    query: searchParams.get("query") ?? undefined,
    crimeType: searchParams.get("crimeType") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    startDate: searchParams.get("startDate") ?? undefined,
    endDate: searchParams.get("endDate") ?? undefined,
  });

  return NextResponse.json({ reports });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  const body = await request.json().catch(() => null);

  // Officer-submitted ("Register Crime") vs. public ("Report a Crime") share
  // this endpoint but have different required fields, so try the stricter
  // officer schema first when there's an active session.
  if (session) {
    const parsed = registerCrimeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const d = parsed.data;
    const report = createReport({
      crimeTitle: d.crimeTitle,
      crimeType: d.crimeType as any,
      region: "",
      address: d.crimeLocation,
      date: d.crimeDate.slice(0, 10),
      time: d.crimeDate.slice(11, 16),
      description: d.crimeDescription,
      suspectName: d.suspectName || undefined,
      suspectAge: d.suspectAge === "" ? undefined : Number(d.suspectAge),
      suspectGender: (d.suspectGender || "") as any,
      suspectId: d.suspectID || undefined,
      suspectAddress: d.suspectAddress || undefined,
      victimName: d.victimName,
      victimAge: d.victimAge === "" ? undefined : Number(d.victimAge),
      victimGender: (d.victimGender || "") as any,
      victimContact: d.victimContact,
      officerName: d.officerName,
      badgeNumber: d.badgeNumber,
      status: "open",
    });
    return NextResponse.json({ report }, { status: 201 });
  }

  const parsed = reportCrimeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const d = parsed.data;
  const report = createReport({
    crimeTitle: `${d.crimeType} report - ${d.city}`,
    crimeType: d.crimeType as any,
    region: d.city,
    address: d.address || undefined,
    date: d.date,
    time: d.time,
    description: d.description,
    suspectInfo: d.suspectInfo || undefined,
    reporterName: d.reporterName || undefined,
    reporterContact: d.contact,
    reporterRole: d.role,
    status: "open",
  });

  return NextResponse.json({ report }, { status: 201 });
}
