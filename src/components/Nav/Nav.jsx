import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  function closeMenu() {
    setMenuOpen(false)
  }

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${hidden ? styles.hiddenNav : ''}`}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          KEMI TAIWO
        </NavLink>
        <nav className={styles.nav}>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? styles.active : styles.link}
          >
            About
          </NavLink>
          <NavLink
            to="/print-shop"
            className={({ isActive }) => isActive ? styles.active : styles.link}
          >
            Print-Shop
          </NavLink>
        </nav>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
      {menuOpen && (
        <nav className={styles.mobileNav}>
          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) => isActive ? styles.mobileActive : styles.mobileLink}
          >
            About
          </NavLink>
          <NavLink
            to="/print-shop"
            onClick={closeMenu}
            className={({ isActive }) => isActive ? styles.mobileActive : styles.mobileLink}
          >
            Print-Shop
          </NavLink>
        </nav>
      )}
      <div className={styles.rule} />
    </header>
  )
}