import { useState } from "react";
import styles from "./About.module.css";

export default function About() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubscribe() {
    if (!email) return;
    setStatus("loading");
    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.VITE_BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          listIds: [2],
          updateEnabled: true,
        }),
      });
      if (response.ok || response.status === 204) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.imageCol}>
          <img
            src="/images/kemi-potrait.webp"
            alt="Kemi Taiwo"
            className={styles.portrait}
          />
        </div>
        <div className={styles.textCol}>
          <span className={styles.label}>About</span>
          <h1 className={styles.name}>Kemi Taiwo</h1>
          <div className={styles.rule} />
          <div className={styles.statement}>
            <p>
              Kemi Taiwo (b. 1996) is a photographer and digital artist based in
              Lagos, Nigeria, who utilizes visual storytelling as a profound
              medium for self-expression. Historically drawn to the poetic depth
              and nostalgia of black-and-white portraiture, Taiwo has recently
              expanded her practice into mixed-media digital collage and
              photo-illustration.
            </p>
            <p>
              By merging her original photography with graphic elements, she
              creates layered, symbolic works that bridge the gap between
              reality and imagination. Her recent practice often features
              high-contrast monochromatic subjects set against vibrant,
              celestial backdrops, employing visual metaphors to explore themes
              of identity, memory, liberation, and the relationship between
              people and their environment.
            </p>
            <p>
              Taiwo's work has been exhibited at the 3rd and 5th editions of the
              Photocarrefour Artist Meet and Exhibit in Abuja, Nigeria (2021 and
              2023). In 2023, she was shortlisted for the{" "}
              <a
                href="https://www.instagram.com/p/Co-HsCcoK7M/"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                Fotografia Europea Open Call Exhibition
              </a>{" "}
              in Reggio Emilia, Italy, received an Editor's Pick in the{" "}
              <a
                href="https://www.instagram.com/p/CyLxCCaInCI/"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                LensCulture Black & White Photography Awards 2023
              </a>
              , and had her portfolio featured on{" "}
              <a
                href="https://www.vogue.com/photovogue/photographers/213387"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                PhotoVogue
              </a>
              . She is also a member of Black Women Photographers.
            </p>
            <p>
              As an emerging voice in the Nigerian art scene, Taiwo continues to
              develop personal projects rooted in her lived experiences and
              evolving artistic vision. Through photography, digital collage,
              and photo-illustration, she remains committed to creating work
              that is both visually compelling and socially resonant, using her
              practice to engage with themes of identity, environmental
              consciousness, and the shared human experience.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.connect}>
        <div className={styles.connectInner}>
          <div className={styles.newsletter}>
            <span className={styles.label}>Stay Connected</span>
            <h2 className={styles.connectHeading}>Join the Newsletter</h2>
            <p className={styles.connectText}>
              New work, upcoming prints, and behind the scenes — straight to
              your inbox.
            </p>
            <div className={styles.form}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className={styles.button} onClick={handleSubscribe}>
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {status === "success" && (
              <p className={styles.successMsg}>You're subscribed!</p>
            )}
            {status === "error" && (
              <p className={styles.errorMsg}>
                Something went wrong. Try again.
              </p>
            )}
          </div>

          <div className={styles.socials}>
            <span className={styles.label}>Follow</span>
            <div className={styles.socialLinks}>
              <a
                href="https://www.instagram.com/shotbyktaiwo/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.behance.net/kemitaiwo"
                target="_blank"
                rel="noreferrer"
              >
                Behance
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
