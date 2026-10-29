import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import SEO from '../components/SEO'
import { carouselSlides, heroContent } from '../data/homeContent'
import { categories } from '../data/products'

// Service tiles — use carousel images as stand-ins
const serviceTiles = [
  {
    id: 'custom-furniture-production',
    label: 'Custom Furniture Production',
    image: '/images/carousel/IMG_0780.webp',
    imageWidth: 1600,
    imageHeight: 1200,
    href: '/product-gallery#services',
  },
  {
    id: 'interior-decoration',
    label: 'Interior Decoration',
    image: '/images/carousel/IMG_0784.webp',
    imageWidth: 1600,
    imageHeight: 1200,
    href: '/product-gallery#services',
  },
  {
    id: 'furniture-supply-and-dealership',
    label: 'Furniture Supply and Dealership',
    image: '/images/carousel/IMG_0788.webp',
    imageWidth: 1600,
    imageHeight: 1200,
    href: '/product-gallery#services',
  },
]

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="De Redeemed Interiors Company — furniture production, dealership and interior decoration in Oghara, Delta State. Browse our sofas, bed frames, dining tables, center tables and office furniture."
        path="/"
      />
      <Navbar />

      <main>
        {/* 1. Carousel */}
        <Carousel slides={carouselSlides} autoAdvanceMs={6000} />

        {/* 2. Who we are hero */}
        <section className="bg-[#0A0A0A] py-16 sm:py-24" aria-labelledby="hero-heading">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1
                id="hero-heading"
                className="font-syne font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              >
                {heroContent.heading.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>
              <p className="font-inter text-base sm:text-lg text-white/80 leading-relaxed mb-4">
                {heroContent.paragraph1}
              </p>
              <p className="font-inter text-base sm:text-lg text-white/80 leading-relaxed mb-10">
                {heroContent.paragraph2}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/about-us"
                  className="
                    inline-block font-inter text-sm font-normal
                    bg-white text-[#0A0A0A] border-2 border-white
                    px-6 py-3
                    hover:bg-[#0A0A0A] hover:text-white
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                  "
                >
                  About Us
                </Link>
                <Link
                  to="/product-gallery"
                  className="
                    inline-block font-inter text-sm font-normal
                    bg-transparent text-white border-2 border-white/40
                    px-6 py-3
                    hover:border-white
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                  "
                >
                  Product Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Category grid */}
        <section className="bg-white py-16 sm:py-24 border-t-2 border-[#0A0A0A]" aria-labelledby="categories-heading">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between mb-8 border-b-2 border-[#0A0A0A] pb-4">
              <h2
                id="categories-heading"
                className="font-syne font-bold text-[#0A0A0A] text-2xl sm:text-3xl"
              >
                Browse by Category
              </h2>
              <Link
                to="/product-gallery"
                className="font-inter text-sm text-[#1D4ED8] hover:underline focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
              >
                View all &rarr;
              </Link>
            </div>

            {/* Product category tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/product-gallery#category-${cat.slug}`}
                  className="
                    group relative overflow-hidden block border-2 border-[#0A0A0A]
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                  "
                  aria-label={`Browse ${cat.label}`}
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
                  <div className="bg-[#0A0A0A] px-4 py-3">
                    <span className="font-syne font-bold text-white text-sm sm:text-base">
                      {cat.label}
                    </span>
                  </div>
                </Link>
              ))}

              {/* Service tiles */}
              {serviceTiles.map((svc) => (
                <Link
                  key={svc.id}
                  to={svc.href}
                  className="
                    group relative overflow-hidden block border-2 border-[#0A0A0A]
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                  "
                  aria-label={`View ${svc.label} service`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.label}
                      width={svc.imageWidth}
                      height={svc.imageHeight}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-white border-t-2 border-[#0A0A0A] px-4 py-3">
                    <span className="font-syne font-bold text-[#0A0A0A] text-sm sm:text-base">
                      {svc.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
