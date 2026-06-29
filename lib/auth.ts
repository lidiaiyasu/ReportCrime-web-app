import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SessionUser } from "@/lib/types";

export const SESSION_COOKIE = "efp_session";

const secretKey =
  process.env.SESSION_SECRET ||
  "dev-only-insecure-secret-change-me-in-production";
const encodedKey = new TextEncoder().encode(secretKey);

// Demo officer directory. In a real system this would be a database
// lookup with hashed passwords (bcrypt/argon2) — kept simple here since
// this is a portfolio/demo project, not a production credential store.
const DEMO_USERS: Array<{ password: string; user: SessionUser }> = [
  {
    password: "police123",
    user: {
      username: "officer.doe",
      name: "Officer John Doe",
      role: "officer",
      badgeNumber: "10234",
    },
  },
  {
    password: "investigate123",
    user: {
      username: "inv.tesfaye",
      name: "Investigator Sara Tesfaye",
      role: "investigator",
      badgeNumber: "55821",
    },
  },
];

export function findUser(
  username: string,
  password: string
): SessionUser | null {
  const match = DEMO_USERS.find(
    (entry) =>
      entry.user.username.toLowerCase() === username.toLowerCase() &&
      entry.password === password
  );
  return match ? match.user : null;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(encodedKey);
}

export async function verifySessionToken(
  token: string
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return (payload.user as SessionUser) ?? null;
  } catch {
    return null;
  }
}

/** Server Component / Route Handler helper to read the current session. */
export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
