import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Product Gallery', href: '/product-gallery' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Trap focus inside mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable?.[0]
    const last = focusable?.[focusable.length - 1]
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [menuOpen])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A] border-b-2 border-[#0A0A0A]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo + slogan */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
            aria-label="De Redeemed Interiors Company — Home"
          >
            {siteConfig.logoImage ? (
              <img
                src={siteConfig.logoImage}
                alt="De Redeemed Interiors Company logo"
                width={56}
                height={56}
                className="h-11 sm:h-12 w-auto max-w-[56px] object-contain flex-shrink-0"
              />
            ) : (
              /* Text wordmark — replace with <img> when logo.svg is ready */
              <span
                className="inline-flex items-center justify-center w-12 h-12 bg-white text-[#0A0A0A] font-syne font-bold text-xl select-none"
                aria-hidden="true"
              >
                DRIC
              </span>
            )}
            <div className="flex flex-col">
              <span className="font-syne font-bold text-white text-lg leading-tight hidden sm:block">
                De Redeemed Interiors Company
              </span>
              <span className="font-syne font-bold text-white text-base leading-tight sm:hidden">
                DRIC
              </span>
              <span className="font-inter text-[10px] sm:text-xs text-white/70 leading-tight max-w-[200px] sm:max-w-xs">
                {siteConfig.slogan}
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`
                    relative font-inter text-sm font-normal px-4 py-2
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                    ${active
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    }
                  `}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {/* Green active indicator */}
                  {active && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#1F9D55]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile hamburger button */}
          <button
            ref={toggleRef}
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-200 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}
        aria-hidden={!menuOpen}
      >
        <nav
          aria-label="Mobile navigation"
          className="bg-[#0A0A0A] border-t-2 border-white/10 px-4 py-4 flex flex-col gap-1"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                to={link.href}
                tabIndex={menuOpen ? 0 : -1}
                className={`
                  font-inter text-base px-4 py-3 border-l-2
                  transition-colors duration-150
                  focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                  ${active
                    ? 'text-white border-[#1F9D55]'
                    : 'text-white/70 border-transparent hover:text-white hover:border-white/40'
                  }
                `}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
