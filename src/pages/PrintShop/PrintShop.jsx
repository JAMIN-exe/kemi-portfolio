import { useState, useRef } from "react";
import styles from "./PrintShop.module.css";
import prints, { sizes } from "../../data/prints";
import { useCart } from "../../context/CartContext";
import Cart from "../../components/Cart/Cart";

export default function PrintShop() {
  const { addItem, count, setIsOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState({});
  const [toast, setToast] = useState(false);
  const cartRef = useRef(null);

  function handleAddToCart(print) {
    addItem({ ...print, size: selectedSize[print.id] });
    setToast(true);
    setTimeout(() => setToast(false), 6000);
    cartRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src="/images/16p.webp" alt="Featured Print" />
        </div>
        <div className={styles.heroText}>
          <span className={styles.label}>Print Shop</span>
          <h1 className={styles.heading}>Own a Piece</h1>
          <p className={styles.subtext}>
            Photography print on quality Fine Art Paper with Certificate of
            Authenticity signed by the artist
          </p>
          <p className={styles.subtext}>
            <em>
              Please note: Framed prints are available exclusively for
              collectors within Nigeria. Orders from outside Nigeria are shipped
              unframed and carefully rolled in a protective tube.
            </em>
          </p>
          <a href="#collection" className={styles.browseBtn}>
            Browse Collection
          </a>
        </div>
      </section>

      {/* Print Gallery */}
      <section className={styles.gallery} id="collection">
        <div className={styles.galleryHeader}>
          <span className={styles.label}>Collection</span>
          <div className={styles.galleryTitle}>
            <h2 className={styles.galleryHeading}>Available Prints</h2>
            <button
              ref={cartRef}
              className={styles.cartBtn}
              onClick={() => setIsOpen(true)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {count > 0 && <span className={styles.cartCount}>{count}</span>}
            </button>
          </div>
        </div>
        <div className={styles.grid}>
          {prints.map((print) => (
            <div key={print.id} className={styles.card}>
              <div
                className={`${styles.cardImage} ${print.orientation === "landscape" ? styles.landscapeImg : styles.portraitImg}`}
              >
                <img src={print.image} alt={print.title} />
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}><strong>{print.title}</strong></h3>
                <p className={styles.cardPrice}>{print.price}</p>
                <select
                  className={styles.sizeSelect}
                  value={selectedSize[print.id] || ""}
                  onChange={(e) =>
                    setSelectedSize((prev) => ({
                      ...prev,
                      [print.id]: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    Select size
                  </option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <button
                  className={styles.addBtn}
                  disabled={!selectedSize[print.id]}
                  onClick={() => handleAddToCart(print)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {toast && <div className={styles.toast}>Added to cart</div>}

      <Cart />
    </main>
  );
}
