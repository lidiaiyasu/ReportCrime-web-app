"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  reportCrimeSchema,
  ReportCrimeInput,
} from "@/lib/validation/reportCrime";
import Header from "@/components/layout/Header";
import {
  TextInput,
  SelectField,
  TextareaField,
  CheckboxField,
} from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import "./report.css";

export default function ReportPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReportCrimeInput>({
    resolver: zodResolver(reportCrimeSchema),
    defaultValues: { role: "citizen" },
  });

  const onSubmit = async (data: ReportCrimeInput) => {
    setServerError(null);
    setSuccessRef(null);

    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setServerError(
        body.error || "We couldn't submit your report. Please try again."
      );
      return;
    }

    const { report } = await res.json();
    setSuccessRef(report.id);
    reset({ role: "citizen" });
  };

  return (
    <>
      <Header active="report" />

      <main id="main-content">
        <section className="report-header">
          <h1 style={{ color: "#003366", fontSize: "2.1rem", marginBottom: 8 }}>
            Report a Crime
          </h1>
          <p
            className="instructions"
            style={{ color: "#444", fontSize: "1.1rem" }}
          >
            Use this secure form to report criminal activity. All reports are
            confidential.
            <br />
            <span style={{ color: "#b30000" }}>
              <strong>False reports are punishable by law.</strong>
            </span>
          </p>
        </section>

        <div className="report-form-container">
          {successRef && (
            <Alert type="success">
              Thank you. Your report has been received and assigned reference{" "}
              <strong>{successRef}</strong>. Please keep this for your
              records.
            </Alert>
          )}
          {serverError && <Alert type="error">{serverError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className="report-form" noValidate>
            <fieldset>
              <legend>Reporter Information</legend>
              <TextInput
                label="Full Name (optional for citizens)"
                placeholder="Enter your name"
                {...register("reporterName")}
              />
              <TextInput
                label="Contact Number / Email"
                placeholder="Phone or Email"
                required
                error={errors.contact?.message}
                {...register("contact")}
              />
              <SelectField label="Your Role" {...register("role")}>
                <option value="citizen">Citizen</option>
                <option value="police">Police Officer</option>
                <option value="investigator">Investigator</option>
              </SelectField>
            </fieldset>

            <fieldset>
              <legend>Crime Location</legend>
              <SelectField
                label="Region"
                required
                defaultValue=""
                error={errors.city?.message}
                {...register("city")}
              >
                <option value="">-- Select Location --</option>
                <option value="addis">Addis Ababa</option>
                <option value="oromia">Oromia</option>
                <option value="amhara">Amhara</option>
                <option value="tigray">Tigray</option>
                <option value="somali">Somali</option>
                <option value="afar">Afar</option>
                <option value="central Ethiopia">Central Ethiopia</option>
                <option value="Sidama">Sidama</option>
                <option value="South West Ethiopia">
                  South West Ethiopia
                </option>
                <option value="south Ethiopia">South Ethiopia</option>
                <option value="Dire Dawa">Dire Dawa</option>
              </SelectField>
              <TextInput
                label="Specific Address"
                placeholder="Specify the Address"
                {...register("address")}
              />
              <TextInput
                label="Date of Incident"
                type="date"
                required
                error={errors.date?.message}
                {...register("date")}
              />
              <TextInput
                label="Time of Incident"
                type="time"
                required
                error={errors.time?.message}
                {...register("time")}
              />
            </fieldset>

            <fieldset>
              <legend>Crime Details</legend>
              <SelectField
                label="Type of Crime"
                required
                defaultValue=""
                error={errors.crimeType?.message}
                {...register("crimeType")}
              >
                <option value="">-- Select Crime Type --</option>
                <option value="theft">Theft</option>
                <option value="assault">Assault</option>
                <option value="fraud">Fraud</option>
                <option value="murder">Murder</option>
                <option value="drug">Drug-Related</option>
                <option value="cyber">Cybercrime</option>
                <option value="humanTrafficking">Human Trafficking</option>
                <option value="other">Other</option>
              </SelectField>
              <TextareaField
                label="Detailed Description of the Incident"
                rows={6}
                placeholder="Describe what happened..."
                required
                error={errors.description?.message}
                {...register("description")}
              />
              <TextareaField
                label="Suspect Information (if known)"
                rows={4}
                placeholder="Describe suspect appearance, name, etc."
                {...register("suspectInfo")}
              />
              <div className="field">
                <label htmlFor="evidence">
                  Upload Evidence (images, documents, videos)
                </label>
                <input
                  type="file"
                  id="evidence"
                  multiple
                  accept="image/*,video/*,application/pdf"
                />
                <span className="field-hint">
                  File upload storage isn&apos;t wired to a backend in this
                  demo — the form still validates and submits without it.
                </span>
              </div>
            </fieldset>

            <fieldset>
              <legend>Submit Your Report</legend>
              <CheckboxField
                label="I confirm that the information provided is accurate to the best of my knowledge and understand that false reporting is a criminal offense."
                error={errors.confidentiality?.message}
                {...register("confidentiality")}
              />
              <CheckboxField
                label="I consent to the Ethiopian Federal Police processing my data in accordance with national data protection laws."
                error={errors.consent?.message}
                {...register("consent")}
              />
              <div style={{ marginTop: 16 }}>
                <Button type="submit" isLoading={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </fieldset>
          </form>

          <div className="security-disclaimer">
            <h3>🔒 Confidentiality &amp; Security</h3>
            <p>
              All reports submitted through this system are encrypted and
              accessible only to authorized Ethiopian Federal Police
              personnel. Your personal details will remain confidential
              unless disclosure is required by law for investigation or
              prosecution purposes.
            </p>
            <p>
              For emergencies, please call <strong>991</strong> or visit your
              nearest police station immediately.
            </p>
          </div>
        </div>
      </main>

      <footer>
        <div
          className="footer-copy"
          style={{ marginTop: 10, fontSize: "0.95rem" }}
        >
          &copy; {new Date().getFullYear()} Ethiopian Federal Police - All
          Rights Reserved
        </div>
      </footer>
    </>
  );
}
