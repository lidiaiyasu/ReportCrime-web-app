import { z } from "zod";

export const reportCrimeSchema = z.object({
  reporterName: z.string().trim().max(120).optional().or(z.literal("")),
  contact: z
    .string()
    .trim()
    .min(3, "Please provide a phone number or email so we can reach you.")
    .max(150),
  role: z.enum(["citizen", "police", "investigator"]),
  city: z.string().min(1, "Please select a region."),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  date: z.string().min(1, "Date of incident is required."),
  time: z.string().min(1, "Time of incident is required."),
  crimeType: z.string().min(1, "Please select the type of crime."),
  description: z
    .string()
    .trim()
    .min(20, "Please provide at least 20 characters describing what happened.")
    .max(4000),
  suspectInfo: z.string().trim().max(2000).optional().or(z.literal("")),
  confidentiality: z.literal(true, {
    errorMap: () => ({
      message: "You must confirm the information provided is accurate.",
    }),
  }),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "You must consent to data processing to submit a report.",
    }),
  }),
});

export type ReportCrimeInput = z.infer<typeof reportCrimeSchema>;
