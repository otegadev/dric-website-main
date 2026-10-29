import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { CarouselSlide } from '../data/homeContent'

interface CarouselProps {
  slides: CarouselSlide[]
  autoAdvanceMs?: number
}

export default function Carousel({ slides, autoAdvanceMs = 6000 }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const go = useCallback((index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length)
  }, [slides.length])

  const next = useCallback(() => go(current + 1), [current, go])
  const prev = useCallback(() => go(current - 1), [current, go])

  // Auto-advance
  useEffect(() => {
    if (paused || prefersReduced) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(next, autoAdvanceMs)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, prefersReduced, next, autoAdvanceMs])

  // Touch swipe support (differentiates horizontal swipe from vertical page scrolling)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    // Only swipe if horizontal motion exceeds vertical motion significantly
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      deltaX < 0 ? next() : prev()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  // Keyboard navigation on the carousel container
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  }

  return (
    <section
      aria-label="Featured products carousel"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden bg-[#0A0A0A] h-[560px] sm:h-[500px] md:h-[540px] lg:h-[600px]"
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Slides track */}
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: prefersReduced ? 'none' : 'transform 0.5s ease-in-out',
        }}
      >
        {slides.map((s, i) => (
          <div
            key={s.image}
            className="relative flex-shrink-0 w-full h-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${slides.length}: ${s.headline}`}
            aria-hidden={i !== current}
          >
            {/* Slide Background Image */}
            <img
              src={s.image}
              alt={s.alt}
              width={s.imageWidth}
              height={s.imageHeight}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Solid black content block at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] border-t-2 border-white/10 px-4 sm:px-8 py-4 sm:py-5 z-10">
              <div className="max-w-screen-xl mx-auto flex flex-col gap-3">
                {/* Headline & Action button */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div className="pr-2">
                    <h2 className="font-syne font-bold text-white text-xl sm:text-2xl lg:text-3xl leading-tight">
                      {s.headline}
                    </h2>
                    <p className="font-inter text-xs sm:text-sm text-white/80 mt-1 max-w-xl line-clamp-2 sm:line-clamp-none">
                      {s.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      to={s.buttonHref}
                      tabIndex={i !== current ? -1 : 0}
                      className="
                        inline-block font-inter text-xs sm:text-sm font-normal
                        bg-white text-[#0A0A0A] border-2 border-white
                        px-4 sm:px-5 py-2 sm:py-2.5
                        hover:bg-[#0A0A0A] hover:text-white
                        transition-colors duration-150
                        focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                        whitespace-nowrap
                      "
                    >
                      {s.buttonLabel}
                    </Link>
                  </div>
                </div>

                {/* Controls row: clickable dot indicators, slide counter, and pause toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div
                    className="flex items-center gap-1.5 overflow-x-auto max-w-[220px] sm:max-w-none py-1 scrollbar-none"
                    aria-label="Carousel navigation dots"
                  >
                    {slides.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => go(dotIdx)}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                        aria-current={dotIdx === current ? 'true' : undefined}
                        tabIndex={i !== current ? -1 : 0}
                        className={`
                          h-1.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                          ${dotIdx === current ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'}
                        `}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-inter text-xs text-white/60 font-light select-none">
                      {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPaused((p) => !p)}
                      aria-label={paused ? 'Resume auto-advance' : 'Pause auto-advance'}
                      aria-pressed={paused}
                      tabIndex={i !== current ? -1 : 0}
                      className="
                        w-7 h-7 flex items-center justify-center
                        bg-white/10 text-white border border-white/20
                        hover:bg-white/20 hover:border-white/60
                        transition-colors duration-150
                        focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                      "
                    >
                      {paused ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Red progress bar */}
      {!prefersReduced && !paused && (
        <div
          key={current}
          className="absolute top-0 left-0 h-1 bg-[#DC2626] z-20"
          style={{
            animation: `progress ${autoAdvanceMs}ms linear`,
            width: '100%',
            transformOrigin: 'left',
          }}
        />
      )}

      {/* Prev / Next arrows placed squarely in the visible image portion */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="
          absolute left-2 sm:left-4 top-[28%] sm:top-[33%] -translate-y-1/2
          w-10 h-10 sm:w-12 sm:h-12
          bg-[#0A0A0A]/75 text-white border-2 border-white/20
          flex items-center justify-center
          hover:bg-[#0A0A0A] hover:border-white
          transition-colors duration-150
          focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
          z-20
        "
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="
          absolute right-2 sm:right-4 top-[28%] sm:top-[33%] -translate-y-1/2
          w-10 h-10 sm:w-12 sm:h-12
          bg-[#0A0A0A]/75 text-white border-2 border-white/20
          flex items-center justify-center
          hover:bg-[#0A0A0A] hover:border-white
          transition-colors duration-150
          focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
          z-20
        "
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  )
}
