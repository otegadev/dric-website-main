// ============================================================
// SITE CONFIG — edit this file to update company details,
// social links, enquiry channel and site URL.
// ============================================================

export const siteConfig = {
  // Company identity
  name: 'De Redeemed Interiors Company',
  shortName: 'DRIC',
  slogan: 'If The Quality Is Not In It, We Don\'t Stock It',
  description: 'Furniture production, dealership and interior decoration in Oghara, Delta State.',

  // Contact details
  address: 'No. 5 Otorho Road, Opposite INEC office, Ogharefe, Oghara, Delta State',
  email: 'Deredeemedinteriorcompany9@gmail.com',
  phone: '07071604223',
  phoneIntl: '+2347071604223',

  // Enquiry channel — change channel to 'sms' or 'email' if needed
  enquiry: {
    channel: 'whatsapp' as 'whatsapp',
    number: '2347071604223',  // WhatsApp number without leading +
  },

  // Social media — leave empty string to hide the link
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },

  // Site URL — overridden by the VITE_SITE_URL environment variable
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://example.com',

  // Logo
  logoImage: '/images/DE REDEEMED INTERIOR LOGO 2.png',
}

// Build a WhatsApp enquiry URL for a product
export function buildEnquiryUrl(productName: string, productId: string, price?: string): string {
  const { enquiry, siteUrl, name } = siteConfig
  const link = `${siteUrl}/product-gallery#${productId}`

  let message: string
  if (price) {
    message = `Hello ${name}, I am interested in the ${productName} (${price}). Here is the link: ${link}. Please send me more details.`
  } else {
    message = `Hello ${name}, I am interested in the ${productName}. Here is the link: ${link}. Please send me more details.`
  }

  if (enquiry.channel === 'whatsapp') {
    return `https://wa.me/${enquiry.number}?text=${encodeURIComponent(message)}`
  }
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Enquiry: ${productName}`)}&body=${encodeURIComponent(message)}`
}

// Build a WhatsApp enquiry URL for a service (the same wording with service name, link, and no price)
export function buildServiceEnquiryUrl(serviceName: string, serviceId?: string): string {
  const { enquiry, name, email, siteUrl } = siteConfig
  const link = serviceId ? `${siteUrl}/product-gallery#${serviceId}` : `${siteUrl}/product-gallery#services`
  const message = `Hello ${name}, I am interested in the ${serviceName}. Here is the link: ${link}. Please send me more details.`

  if (enquiry.channel === 'whatsapp') {
    return `https://wa.me/${enquiry.number}?text=${encodeURIComponent(message)}`
  }
  return `mailto:${email}?subject=${encodeURIComponent(`Enquiry: ${serviceName}`)}&body=${encodeURIComponent(message)}`
}

// Generic WhatsApp greeting (for Contact page)
export function buildGenericEnquiryUrl(): string {
  const { enquiry, name, email } = siteConfig
  const message = `Hello ${name}, I would like to make an enquiry.`
  if (enquiry.channel === 'whatsapp') {
    return `https://wa.me/${enquiry.number}?text=${encodeURIComponent(message)}`
  }
  return `mailto:${email}`
}
