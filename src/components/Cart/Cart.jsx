import styles from "./Cart.module.css";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQty, total, isOpen, setIsOpen, clearCart } =
    useCart();

  function handleWhatsApp() {
    if (items.length === 0) return;

    const lines = items.map((i) => `• ${i.title} — ${i.size} x${i.qty}`);
    const message = [
      "Hello Kemi, I'd like to order:",
      "",
      ...lines,
      "",
      "Please send me the exact pricing. Thank you!",
    ].join("\n");

    const url = `http://wa.me/2348182673003?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Your Cart</h2>
          <button className={styles.close} onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.thumb}
                  />
                  <div className={styles.info}>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.price}>{item.price}</p>
                    <div className={styles.qty}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <button className={styles.whatsapp} onClick={handleWhatsApp}>
                Checkout via WhatsApp
              </button>
              <button className={styles.clear} onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
