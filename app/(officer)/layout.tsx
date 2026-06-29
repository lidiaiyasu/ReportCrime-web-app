import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import PoliceHeader from "@/components/layout/PoliceHeader";
import "./police-dashboard/police-dashboard.css";

export default async function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  // Defense in depth: middleware already redirects unauthenticated requests,
  // but a layout shouldn't assume that holds in every render path (e.g. a
  // stale/expired cookie that middleware accepted moments before expiry).
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <PoliceHeader user={user} />
      {children}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Ethiopian Federal Police. All rights reserved.</p>
      </footer>
    </>
  );
}
