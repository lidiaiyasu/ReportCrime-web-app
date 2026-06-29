import { reportCrimeSchema } from "@/lib/validation/reportCrime";

const validBase = {
  reporterName: "Jane Doe",
  contact: "jane@example.com",
  role: "citizen" as const,
  city: "addis",
  address: "Bole Road",
  date: "2025-08-15",
  time: "14:30",
  crimeType: "theft",
  description: "Someone broke into my shop and stole electronics overnight.",
  suspectInfo: "",
  confidentiality: true as const,
  consent: true as const,
};

describe("reportCrimeSchema", () => {
  it("accepts a fully valid report", () => {
    const result = reportCrimeSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it("rejects a description that is too short", () => {
    const result = reportCrimeSchema.safeParse({
      ...validBase,
      description: "too short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when region is not selected", () => {
    const result = reportCrimeSchema.safeParse({ ...validBase, city: "" });
    expect(result.success).toBe(false);
  });

  it("rejects when confidentiality is not confirmed", () => {
    const result = reportCrimeSchema.safeParse({
      ...validBase,
      confidentiality: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing contact method", () => {
    const result = reportCrimeSchema.safeParse({ ...validBase, contact: "a" });
    expect(result.success).toBe(false);
  });
});
