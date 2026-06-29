"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerCrimeSchema,
  RegisterCrimeInput,
} from "@/lib/validation/registerCrime";
import {
  TextInput,
  SelectField,
  TextareaField,
} from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import "./register-crime.css";

export default function RegisterCrimePage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCrimeInput>({
    resolver: zodResolver(registerCrimeSchema),
    defaultValues: {
      officerName: "Officer John Doe",
    },
  });

  const onSubmit = async (data: RegisterCrimeInput) => {
    setServerError(null);
    setSuccessId(null);

    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setServerError(body.error || "Failed to submit report. Please try again.");
      return;
    }

    const { report } = await res.json();
    setSuccessId(report.id);
    reset({ officerName: data.officerName });
  };

  return (
    <div className="container" id="main-content">
      <h1>Register Crime</h1>

      {successId && (
        <Alert type="success">
          Crime report <strong>{successId}</strong> was registered
          successfully.{" "}
          <button
            type="button"
            onClick={() => router.push(`/view-crime/${successId}`)}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 700,
              padding: 0,
            }}
          >
            View report
          </button>
        </Alert>
      )}
      {serverError && <Alert type="error">{serverError}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset>
          <legend>Crime Details</legend>
          <TextInput
            label="Crime Title"
            required
            error={errors.crimeTitle?.message}
            {...register("crimeTitle")}
          />
          <SelectField
            label="Type of Crime"
            required
            error={errors.crimeType?.message}
            defaultValue=""
            {...register("crimeType")}
          >
            <option value="">Select Type</option>
            <option value="theft">Theft</option>
            <option value="assault">Assault</option>
            <option value="fraud">Fraud</option>
            <option value="other">Other</option>
          </SelectField>
          <TextInput
            label="Date & Time"
            type="datetime-local"
            required
            error={errors.crimeDate?.message}
            {...register("crimeDate")}
          />
          <TextInput
            label="Location"
            required
            error={errors.crimeLocation?.message}
            {...register("crimeLocation")}
          />
          <TextareaField
            label="Description"
            rows={4}
            required
            error={errors.crimeDescription?.message}
            {...register("crimeDescription")}
          />
        </fieldset>

        <fieldset>
          <legend>Suspect Information</legend>
          <TextInput label="Name" {...register("suspectName")} />
          <TextInput
            label="Age"
            type="number"
            min={0}
            error={errors.suspectAge?.message as string | undefined}
            {...register("suspectAge")}
          />
          <SelectField
            label="Gender"
            defaultValue=""
            {...register("suspectGender")}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </SelectField>
          <TextInput
            label="National ID / Passport No."
            {...register("suspectID")}
          />
          <TextInput label="Known Address" {...register("suspectAddress")} />
          <div className="field">
            <label htmlFor="suspect-image">Upload Image (optional)</label>
            <input type="file" id="suspect-image" accept="image/*" />
            <span className="field-hint">
              File upload storage isn&apos;t wired to a backend in this demo —
              the form still validates and submits without it.
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>Victim Information</legend>
          <TextInput
            label="Name"
            required
            error={errors.victimName?.message}
            {...register("victimName")}
          />
          <TextInput
            label="Age"
            type="number"
            min={0}
            error={errors.victimAge?.message as string | undefined}
            {...register("victimAge")}
          />
          <SelectField
            label="Gender"
            defaultValue=""
            {...register("victimGender")}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </SelectField>
          <TextInput
            label="Contact Info"
            required
            error={errors.victimContact?.message}
            {...register("victimContact")}
          />
        </fieldset>

        <fieldset>
          <legend>Evidence Upload</legend>
          <div className="field">
            <label htmlFor="evidence-files">Upload Files</label>
            <input
              type="file"
              id="evidence-files"
              accept=".pdf,image/*,video/*"
              multiple
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Officer Details</legend>
          <TextInput
            label="Officer Name"
            readOnly
            {...register("officerName")}
          />
          <TextInput
            label="Badge Number"
            required
            error={errors.badgeNumber?.message}
            {...register("badgeNumber")}
          />
        </fieldset>

        <div className="form-buttons">
          <Button type="submit" isLoading={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
          <Button type="reset" variant="secondary" onClick={() => reset()}>
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
}
