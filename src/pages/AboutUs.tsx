import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { aboutContent } from '../data/aboutContent'

export default function AboutUs() {
  const { identity, productsAndServices } = aboutContent

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about De Redeemed Interiors Company — our identity, values, and the furniture products and interior decoration services we offer in Oghara, Delta State."
        path="/about-us"
      />
      <Navbar />

      <main>
        {/* ── 1. Identity and values hero (black) ── */}
        <section
          className="bg-[#0A0A0A] py-16 sm:py-24"
          aria-labelledby="identity-heading"
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Copy column */}
              <div>
                <h1
                  id="identity-heading"
                  className="font-syne font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8"
                >
                  {identity.heading}
                </h1>
                <p className="font-inter text-white/80 text-base sm:text-lg leading-relaxed mb-10">
                  {identity.paragraph}
                </p>

                {/* Values grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {identity.values.map((v) => (
                    <div key={v.number} className="border-t-2 border-[#1F9D55] pt-4">
                      <span className="font-syne font-bold text-[#1F9D55] text-3xl leading-none block mb-2">
                        {v.number}
                      </span>
                      <h2 className="font-syne font-bold text-white text-base mb-1">
                        {v.title}
                      </h2>
                      <p className="font-inter text-white/60 text-sm leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image column */}
              <div className="order-first lg:order-last">
                <div className="border-2 border-white/20 overflow-hidden">
                  <img
                    src={identity.image}
                    alt={identity.imageAlt}
                    width={identity.imageWidth}
                    height={identity.imageHeight}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Products and services hero (white) ── */}
        <section
          className="bg-white py-16 sm:py-24 border-t-2 border-[#0A0A0A]"
          aria-labelledby="products-heading"
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Image column */}
              <div>
                <div className="border-2 border-[#0A0A0A] overflow-hidden">
                  <img
                    src={productsAndServices.image}
                    alt={productsAndServices.imageAlt}
                    width={productsAndServices.imageWidth}
                    height={productsAndServices.imageHeight}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block object-cover"
                  />
                </div>
              </div>

              {/* Copy column */}
              <div>
                <h2
                  id="products-heading"
                  className="font-syne font-bold text-[#0A0A0A] text-4xl sm:text-5xl leading-tight mb-6"
                >
                  {productsAndServices.heading}
                </h2>
                <p className="font-inter text-[#0A0A0A]/70 text-base sm:text-lg leading-relaxed mb-8">
                  {productsAndServices.paragraph}
                </p>

                {/* Category list */}
                <div className="mb-8">
                  <h3 className="font-syne font-bold text-[#0A0A0A] text-sm uppercase tracking-widest mb-4 border-b-2 border-[#0A0A0A] pb-2">
                    Products
                  </h3>
                  <ul className="flex flex-col gap-2" role="list">
                    {productsAndServices.categories.map((cat) => (
                      <li
                        key={cat}
                        className="flex items-center gap-3 font-inter text-[#0A0A0A] text-sm"
                      >
                        <span
                          className="w-2 h-2 bg-[#1F9D55] flex-shrink-0"
                          aria-hidden="true"
                        />
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services list */}
                <div className="mb-10">
                  <h3 className="font-syne font-bold text-[#0A0A0A] text-sm uppercase tracking-widest mb-4 border-b-2 border-[#0A0A0A] pb-2">
                    Services
                  </h3>
                  <ul className="flex flex-col gap-2" role="list">
                    {productsAndServices.services.map((svc) => (
                      <li
                        key={svc}
                        className="flex items-center gap-3 font-inter text-[#0A0A0A] text-sm"
                      >
                        <span
                          className="w-2 h-2 bg-[#0A0A0A] flex-shrink-0"
                          aria-hidden="true"
                        />
                        {svc}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={productsAndServices.buttonHref}
                  className="
                    inline-block font-inter text-sm font-normal
                    bg-[#0A0A0A] text-white border-2 border-[#0A0A0A]
                    px-6 py-3
                    hover:bg-white hover:text-[#0A0A0A]
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                  "
                >
                  {productsAndServices.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
