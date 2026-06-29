import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getReportById } from "@/lib/data/reports";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = getReportById(params.id);
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  return NextResponse.json({ report });
}
