import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <Header active="about" />

      <main id="main-content" className="about-main">
        <section className="about-section">
          <h1>About Ethiopian Federal Police Criminal Recording System</h1>
          <p className="about-lead">
            The Ethiopian Federal Police is dedicated to maintaining peace,
            protecting citizens, and upholding the rule of law across
            Ethiopia. Our Criminal Recording System is a modern digital
            platform designed to streamline crime reporting, case management,
            and data analysis for both the public and police professionals.
          </p>
          <div className="about-details">
            <h2>Our Mission</h2>
            <p>
              To serve the Ethiopian people with integrity, professionalism,
              and respect for human rights, ensuring safety and justice for
              all.
            </p>
            <h2>About the System</h2>
            <ul>
              <li>
                <strong>Easy Crime Reporting:</strong> Citizens and officers
                can securely report crimes online, ensuring quick response
                and documentation.
              </li>
              <li>
                <strong>Case Management:</strong> Police professionals
                manage, track, and update cases efficiently, improving
                transparency and accountability.
              </li>
              <li>
                <strong>Data Security:</strong> All information is encrypted
                and handled with strict confidentiality, accessible only to
                authorized personnel.
              </li>
              <li>
                <strong>Analytics &amp; Insights:</strong> The system
                provides valuable statistics and trends to support crime
                prevention and resource allocation.
              </li>
            </ul>
            <h2>Contact &amp; Support</h2>
            <p>
              For emergencies, call <strong>991</strong>. For inquiries or
              support, email us at{" "}
              <a href="mailto:info@fedpolice.et">info@fedpolice.et</a> or
              visit your nearest police station.
            </p>
          </div>
        </section>
      </main>

      <Footer active="about" />
    </>
  );
}
