import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { ProductEnquiryButton, ServiceEnquiryButton } from '../components/EnquiryButton'
import { categories, allProducts, services } from '../data/products'
import type { Product } from '../data/products'

// Staggered two-column grid: one section per category
function CategorySection({ slug, label, products }: { slug: string; label: string; products: Product[] }) {
  return (
    <section
      id={`category-${slug}`}
      aria-labelledby={`heading-${slug}`}
      className="py-12 sm:py-16 border-b-2 border-[#0A0A0A] last:border-b-0"
    >
      <h2
        id={`heading-${slug}`}
        className="font-syne font-bold text-[#0A0A0A] text-2xl sm:text-3xl mb-8 pb-4 border-b-2 border-[#0A0A0A]"
      >
        {label}
      </h2>

      {/* Two-column staggered grid */}
      <div className="columns-1 sm:columns-2 gap-6 [column-fill:_balance]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      id={product.id}
      className="break-inside-avoid mb-6 border-2 border-[#0A0A0A] flex flex-col"
      style={{ transition: 'outline 0.2s' }}
    >
      {/* Product image */}
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.alt}
          width={product.imageWidth}
          height={product.imageHeight}
          loading="lazy"
          decoding="async"
          className="w-full h-auto block"
          style={{ aspectRatio: `${product.imageWidth} / ${product.imageHeight}` }}
        />
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col gap-3 bg-white flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-syne font-bold text-[#0A0A0A] text-sm sm:text-base leading-tight">
            {product.name}
          </h3>
          {/* Red price tag */}
          <span
            className="flex-shrink-0 font-inter text-xs font-normal text-white bg-[#DC2626] px-2 py-1 leading-none"
            title="Tentative price — contact us for a firm quote"
          >
            {product.price}
          </span>
        </div>
        <div className="flex justify-end mt-auto">
          <ProductEnquiryButton
            productId={product.id}
            productName={product.name}
            price={product.price}
          />
        </div>
      </div>
    </div>
  )
}

export default function ProductGallery() {
  // On mount and hash change, scroll to target element and highlight it with a green outline
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('product-card-highlighted')
        setTimeout(() => {
          el.classList.remove('product-card-highlighted')
        }, 3000)
      }
    }

    const t = setTimeout(handleHash, 150)
    window.addEventListener('hashchange', handleHash)
    return () => {
      clearTimeout(t)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  // Group products by category (maintain order)
  const grouped = categories.map((cat) => ({
    ...cat,
    products: allProducts.filter((p) => p.categorySlug === cat.slug),
  }))

  return (
    <>
      <SEO
        title="Product Gallery"
        description="Browse all furniture categories at De Redeemed Interiors Company — sofas, center tables, dining tables, office furniture and bed frames. Enquire directly on WhatsApp."
        path="/product-gallery"
      />
      <Navbar />

      <main>
        {/* Page heading */}
        <div className="bg-[#0A0A0A] py-10 sm:py-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-syne font-bold text-white text-4xl sm:text-5xl">
              Product Gallery
            </h1>
            <p className="font-inter text-white/70 text-sm sm:text-base mt-3 max-w-xl">
              Browse our range of furniture. Prices shown are tentative — contact us for a firm quote.
            </p>
          </div>
        </div>

        {/* Category quick-nav grid */}
        <section className="bg-white border-b-2 border-[#0A0A0A] py-8" aria-labelledby="cat-nav-heading">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="cat-nav-heading" className="sr-only">Browse by category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#category-${cat.slug}`}
                  className="
                    group relative block overflow-hidden border-2 border-[#0A0A0A]
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                  "
                  aria-label={`Jump to ${cat.label} section`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.alt}
                      width={cat.imageWidth}
                      height={cat.imageHeight}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-[#0A0A0A] px-3 py-2">
                    <span className="font-inter text-white text-xs sm:text-sm leading-tight">{cat.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Tentative price notice */}
        <div className="bg-white border-b border-[#0A0A0A]/20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <p className="font-inter text-xs text-[#0A0A0A]/60">
              <span className="inline-block bg-[#DC2626] text-white px-1.5 py-0.5 text-xs mr-2">Note</span>
              All prices shown are tentative. Contact us for a confirmed quote before ordering.
            </p>
          </div>
        </div>

        {/* Gallery sections */}
        <div className="bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            {grouped.map(({ slug, label, products }) => (
              <CategorySection key={slug} slug={slug} label={label} products={products} />
            ))}
          </div>
        </div>

        {/* Services section */}
        <section id="services" className="bg-[#0A0A0A] py-16 sm:py-24" aria-labelledby="services-heading">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="services-heading"
              className="font-syne font-bold text-white text-2xl sm:text-3xl mb-2"
            >
              Our Services
            </h2>
            <p className="font-inter text-white/60 text-sm mb-10">
              Beyond furniture supply, we also offer the following professional services.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div key={svc.id} id={svc.id} className="border-2 border-white/20 flex flex-col" style={{ transition: 'outline 0.2s' }}>
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      width={svc.imageWidth}
                      height={svc.imageHeight}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <h3 className="font-syne font-bold text-white text-base sm:text-lg">
                      {svc.name}
                    </h3>
                    <p className="font-inter text-white/70 text-sm leading-relaxed flex-1">
                      {svc.description}
                    </p>
                    <div className="flex justify-end mt-auto pt-2">
                      <ServiceEnquiryButton serviceId={svc.id} serviceName={svc.name} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
