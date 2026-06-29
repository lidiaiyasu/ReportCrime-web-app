import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <Header active="home" />

      <main id="main-content">
        <section className="main">
          <div className="main-text">
            <h1>Ethiopian Federal Police Criminal Recording System</h1>
            <p className="motto">በጀንነት መጠበቅ በሰብአዊነት ማገልገል</p>
            <Link href="/report" className="cta-button">
              Report a Crime
            </Link>
          </div>
          <div className="main-image">
            <Image
              src="/images/policeproffessionals.jpg"
              alt="Ethiopian Federal Police officers on duty"
              width={500}
              height={350}
              priority
              style={{
                maxWidth: 500,
                width: "100%",
                height: "auto",
                borderRadius: 10,
              }}
            />
          </div>
        </section>

        <section className="features">
          <h2 style={{ color: "#003366", fontSize: "2rem" }}>Our Services</h2>
          <p style={{ color: "#444", fontSize: "1.1rem", marginBottom: 24 }}>
            How We Serve the Public
          </p>
          <div className="feature-cards">
            <Link
              href="/report"
              className="feature-card"
              style={{ textDecoration: "none" }}
            >
              <i
                className="fas fa-file-alt"
                aria-hidden="true"
                style={{ fontSize: "2.2rem", color: "#003366" }}
              ></i>
              <h3>Crime Registration</h3>
              <p>
                Quickly report crimes with essential details. Your report
                helps keep our community safe and enables swift police
                response.
              </p>
              <span className="service-btn">Report Now</span>
            </Link>

            <Link
              href="/login"
              className="feature-card"
              style={{ textDecoration: "none" }}
            >
              <i
                className="fas fa-search"
                aria-hidden="true"
                style={{ fontSize: "2.2rem", color: "#003366" }}
              ></i>
              <h3>Search / Case Lookup</h3>
              <p>
                Authorized personnel can find and review crime cases
                securely, by location, type, or status.
              </p>
              <span className="service-btn">Police Sign In</span>
            </Link>

            <Link
              href="/police-dashboard"
              className="feature-card"
              style={{ textDecoration: "none" }}
            >
              <i
                className="fas fa-chart-bar"
                aria-hidden="true"
                style={{ fontSize: "2.2rem", color: "#003366" }}
              ></i>
              <h3>Reporting & Analytics</h3>
              <p>
                Crime trends and statistics for better understanding and
                decision-making, available to signed-in officers.
              </p>
              <span className="service-btn">View Dashboard</span>
            </Link>

            <Link
              href="/about"
              className="feature-card"
              style={{ textDecoration: "none" }}
            >
              <i
                className="fas fa-shield-alt"
                aria-hidden="true"
                style={{ fontSize: "2.2rem", color: "#003366" }}
              ></i>
              <h3>Security & Confidentiality</h3>
              <p>
                All data is protected with professional standards. Your
                information is handled securely and confidentially.
              </p>
              <span className="service-btn">Learn More</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
