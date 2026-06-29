import { z } from "zod";

export const registerCrimeSchema = z.object({
  crimeTitle: z.string().trim().min(3, "Title must be at least 3 characters."),
  crimeType: z.string().min(1, "Please select a crime type."),
  crimeDate: z.string().min(1, "Date & time is required."),
  crimeLocation: z.string().trim().min(2, "Location is required."),
  crimeDescription: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters."),

  suspectName: z.string().trim().optional().or(z.literal("")),
  suspectAge: z
    .union([z.coerce.number().int().min(0).max(130), z.literal("")])
    .optional(),
  suspectGender: z.enum(["male", "female", ""]).optional(),
  suspectID: z.string().trim().optional().or(z.literal("")),
  suspectAddress: z.string().trim().optional().or(z.literal("")),

  victimName: z.string().trim().min(2, "Victim name is required."),
  victimAge: z
    .union([z.coerce.number().int().min(0).max(130), z.literal("")])
    .optional(),
  victimGender: z.enum(["male", "female", ""]).optional(),
  victimContact: z.string().trim().min(3, "Victim contact info is required."),

  officerName: z.string().trim().min(1),
  badgeNumber: z.string().trim().min(1, "Badge number is required."),
});

export type RegisterCrimeInput = z.infer<typeof registerCrimeSchema>;
