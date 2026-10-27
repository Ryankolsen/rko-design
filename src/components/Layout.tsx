import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { projects } from '../data/projects'
import { Starfield } from './Starfield'
import '../styles/base.css'

// Panda Jump is listed on Google Play for all ages, and Play holds the pages its
// store listing links to under Families policy. Those pages must not link to the
// 18+ projects, so they render without the site-wide project nav.
const NAVLESS_PATH_PREFIXES = ['/panda-jump']

export function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  const showNav = !NAVLESS_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(() => window.scrollY > 60)

  useEffect(() => {
    if (!menuOpen) return

    // Matches the nav CSS, which collapses the menu at max-width: 899.98px.
    const mql = window.matchMedia('(min-width: 900px)')
    function onChange(e: MediaQueryListEvent) {
      if (e.matches) setMenuOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }

    function onPointerDown(e: PointerEvent) {
      if (navRef.current?.contains(e.target as Node)) return
      setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Delegated so a link to the current page (no location change) still closes the menu.
  function handleLinkClick(event: MouseEvent<HTMLUListElement>) {
    if ((event.target as Element).closest('a')) setMenuOpen(false)
  }

  const navClassName = [scrolled && 'scrolled', menuOpen && 'menu-open'].filter(Boolean).join(' ')

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <Starfield />

      {showNav && (
        <nav id="nav" aria-label="Primary" ref={navRef} className={navClassName || undefined}>
          <Link to="/" className="nav-logo">
            <img src="/rko-logo.png" alt="RKO" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-icon" aria-hidden="true" />
          </button>
          <ul id="nav-links" onClick={handleLinkClick}>
            <li><Link to="/" activeOptions={{ exact: true }}>Home</Link></li>
            <li><Link to="/" hash="projects">Projects</Link></li>
            <li><Link to="/" hash="about">About</Link></li>
            <li className="nav-divider" aria-hidden="true" />
            {projects.map((project) => (
              <li key={project.href}>
                <Link to={project.href}>{project.navLabel}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <main id="main" tabIndex={-1}>{children}</main>
    </>
  )
}
