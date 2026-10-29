import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { siteConfig, buildGenericEnquiryUrl } from '../data/siteConfig'

function ContactBlock({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="border-2 border-[#0A0A0A] p-6 sm:p-8 flex flex-col gap-3">
      <span className="font-syne font-bold text-[#0A0A0A] text-xs uppercase tracking-widest border-b-2 border-[#0A0A0A] pb-2">
        {label}
      </span>
      {children}
    </div>
  )
}

export default function ContactUs() {
  const enquiryUrl = buildGenericEnquiryUrl()

  // Filter out empty social links
  const socialLinks = [
    { label: 'Instagram', href: siteConfig.social.instagram },
    { label: 'Facebook', href: siteConfig.social.facebook },
    { label: 'TikTok', href: siteConfig.social.tiktok },
  ].filter((s) => s.href)

  // Google Maps search URL for the address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with De Redeemed Interiors Company. Find our address, email, telephone and WhatsApp details. No. 5 Otorho Road, Ogharefe, Oghara, Delta State."
        path="/contact-us"
      />
      <Navbar />

      <main>
        {/* Page heading */}
        <section className="bg-[#0A0A0A] py-16 sm:py-24" aria-labelledby="contact-heading">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              id="contact-heading"
              className="font-syne font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4"
            >
              Contact us
            </h1>
            <p className="font-inter text-white/70 text-base sm:text-lg max-w-xl">
              Reach out by phone, email, WhatsApp or visit us in person in Oghara, Delta State.
            </p>
          </div>
        </section>

        {/* Contact blocks */}
        <section className="bg-white py-16 sm:py-24 border-t-2 border-[#0A0A0A]" aria-label="Contact details">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Address */}
              <ContactBlock label="Address">
                <address className="not-italic font-inter text-[#0A0A0A] text-base leading-relaxed">
                  {siteConfig.address}
                </address>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block font-inter text-sm
                    border-2 border-[#0A0A0A] px-4 py-2.5 mt-2
                    bg-[#0A0A0A] text-white
                    hover:bg-white hover:text-[#0A0A0A]
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                    w-fit
                  "
                >
                  Get directions &rarr;
                </a>
              </ContactBlock>

              {/* Email */}
              <ContactBlock label="Email">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="
                    font-inter text-[#0A0A0A] text-base break-all
                    hover:text-[#1D4ED8]
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                  "
                >
                  {siteConfig.email}
                </a>
                <p className="font-inter text-[#0A0A0A]/50 text-xs">
                  We typically respond within one business day.
                </p>
              </ContactBlock>

              {/* Telephone */}
              <ContactBlock label="Telephone">
                <a
                  href={`tel:${siteConfig.phoneIntl}`}
                  className="
                    font-inter text-[#0A0A0A] text-2xl font-normal
                    hover:text-[#1D4ED8]
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                  "
                >
                  {siteConfig.phone}
                </a>
              </ContactBlock>

              {/* WhatsApp / Messaging */}
              <ContactBlock label="WhatsApp">
                <p className="font-inter text-[#0A0A0A]/70 text-sm">
                  Send us a message on WhatsApp for a quick response.
                </p>
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block font-inter text-sm
                    bg-[#0A0A0A] text-white border-2 border-[#0A0A0A]
                    px-4 py-2.5 mt-2
                    hover:bg-white hover:text-[#0A0A0A]
                    transition-colors duration-150
                    focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                    w-fit
                  "
                >
                  Message us on WhatsApp
                </a>
              </ContactBlock>

              {/* Social media — only renders if at least one link is set */}
              {socialLinks.length > 0 && (
                <ContactBlock label="Social Media">
                  <div className="flex flex-col gap-3">
                    {socialLinks.map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          font-inter text-[#0A0A0A] text-base
                          hover:text-[#1D4ED8]
                          transition-colors duration-150
                          focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
                        "
                        aria-label={`Follow us on ${label}`}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </ContactBlock>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
