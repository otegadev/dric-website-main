import { buildEnquiryUrl, buildServiceEnquiryUrl } from '../data/siteConfig'

interface ProductEnquiryButtonProps {
  productId: string
  productName: string
  price: string
}

interface ServiceEnquiryButtonProps {
  serviceId?: string
  serviceName: string
}

export function ProductEnquiryButton({ productId, productName, price }: ProductEnquiryButtonProps) {
  const href = buildEnquiryUrl(productName, productId, price)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-block font-inter text-sm font-normal
        bg-[#0A0A0A] text-white border-2 border-[#0A0A0A]
        px-4 py-2.5
        hover:bg-white hover:text-[#0A0A0A]
        transition-colors duration-150
        focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
        whitespace-nowrap
      "
      aria-label={`Enquire about ${productName} on WhatsApp`}
    >
      Enquire about this
    </a>
  )
}

export function ServiceEnquiryButton({ serviceId, serviceName }: ServiceEnquiryButtonProps) {
  const href = buildServiceEnquiryUrl(serviceName, serviceId)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-block font-inter text-sm font-normal
        bg-[#0A0A0A] text-white border-2 border-[#0A0A0A]
        px-4 py-2.5
        hover:bg-white hover:text-[#0A0A0A]
        transition-colors duration-150
        focus-visible:outline-2 focus-visible:outline-[#1D4ED8]
        whitespace-nowrap
      "
      aria-label={`Enquire about ${serviceName} on WhatsApp`}
    >
      Enquire about this
    </a>
  )
}
