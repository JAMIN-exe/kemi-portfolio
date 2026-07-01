import { useState, useEffect } from "react";
import styles from "./Home.module.css";

const allImages = [
  "1",
  "2",
  "3",
  "4p",
  "5p",
  "6",
  "7",
  "8p",
  "9",
  "10p",
  "11",
  "12p",
  "13p",
  "14p",
  "15",
  "16p",
  "17p",
  "18",
  "19",
  "20p",
  "21p",
  "22p",
  "23",
  "24p",
  "25",
  "26",
  "27p",
  "28",
  "29p",
  "30p",
  "31",
  "32p",
  "33p",
  "34p",
  "35p",
  "36",
  "37p",
  "38p",
  "39p",
  "40",
  "41p",
  "42p",
  "43p",
  "44p",
  "45",
  "46p",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54p",
  "57",
  "58",
  "59",
  "60",
  "61p",
  "62p",
  "63p",
  "64",
  "65p",
  "66p",
  "67p",
  "68",
  "69p",
  "70",
  "71",
  "72p",
  "73p",
];

const BATCH = 20;

export default function Home() {
  const [visible, setVisible] = useState(BATCH);
  const [showArrow, setShowArrow] = useState(false);
  const allLoaded = visible >= allImages.length;

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function loadMore() {
    setVisible((prev) => Math.min(prev + BATCH, allImages.length));
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={styles.main}>
      <section className={styles.gallery}>
        {allImages.slice(0, visible).map((name) => {
          const isPortrait = name.includes("p");
          return (
            <div
              key={name}
              className={`${styles.item} ${isPortrait ? styles.portrait : styles.landscape}`}
            >
              <img
                src={`/images/${name}.webp`}
                alt="Kemi Taiwo — Lagos photographer and digital artist, fine art portrait and collage work"
                loading="lazy"
              />
            </div>
          );
        })}
      </section>

      {!allLoaded && (
        <div className={styles.loadMore}>
          <button onClick={loadMore} className={styles.loadBtn}>
            Load More
          </button>
        </div>
      )}

      {allLoaded && showArrow && (
        <button className={styles.scrollTop} onClick={scrollToTop}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
      {allLoaded && (
        <section className={styles.videoSection}>
          <video
            src="/public/images/Video-Project-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            className={styles.video}
          />
          <p className={styles.videoCaption}>
            A foggy morning (December, 2022) — At the NYSC Permanent Orientation
            Camp, Sagamu, Ogun State
          </p>
        </section>
      )}
    </main>
  );
}
