import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>© {new Date().getFullYear()} Kemi Taiwo</p>
        <p className={styles.credit}>
          Designed & Developed by{' '}
          <a
            href="https://github.com/JAMIN-exe"
            target="_blank"
            rel="noreferrer"
            className={styles.creditLink}
          >
            Benjamin
          </a>
        </p>
        <div className={styles.socials}>
          <a href="https://www.instagram.com/shotbyktaiwo/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.behance.net/kemitaiwo" target="_blank" rel="noreferrer">Behance</a>
          <a href="mailto:kemitope1096@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}