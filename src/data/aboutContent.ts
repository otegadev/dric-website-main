// ============================================================
// ABOUT US PAGE CONTENT — DRIC company profile, values,
// and products/services descriptions.
// ============================================================

export const aboutContent = {
  // Section 1 — Identity and values
  identity: {
    heading: 'Who we are',
    paragraph: 'We are an organization that specializes in the manufacturing, procurement and delivery of high-quality furniture products and interior decoration services at the best prices on the market. We are:',
    values: [
      {
        number: '01',
        title: 'Diligent',
        description: 'We take care at every stage of production, from choosing materials to the final finish, so each piece meets the quality we stand by.',
      },
      {
        number: '02',
        title: 'Resourceful',
        description: 'We make smart use of our materials, skills and time to find practical furniture solutions for any space or budget.',
      },
      {
        number: '03',
        title: 'Innovative',
        description: 'We keep exploring fresh designs, finishes and ways of building furniture so our pieces feel modern and last.',
      },
      {
        number: '04',
        title: 'Customer-Centric',
        description: 'We listen first, then make and supply furniture that fits each customer’s needs, space and budget.',
      },
    ],
    // Image from the images folder used beside the copy
    image: '/images/carousel/IMG_0804.webp',
    imageAlt: 'De Redeemed Interiors Company — our identity',
    imageWidth: 1600,
    imageHeight: 1200,
  },

  // Section 2 — Products and services
  productsAndServices: {
    heading: 'What we make and offer',
    paragraph: 'We offer a range of high-quality products for every space in homes and offices, and we are also committed to delivering satisfactory custom services with timely delivery.',
    // Real category names
    categories: [
      'Sofas',
      'Center Tables',
      'Dining Table',
      'Office Furniture',
      'Bed Frames',
    ],
    // Real service names
    services: [
      'Custom furniture production',
      'Interior decoration',
      'Furniture supply and dealership',
    ],
    buttonLabel: 'View the Product Gallery',
    buttonHref: '/product-gallery',
    image: '/images/carousel/IMG_0762.webp',
    imageAlt: 'DRIC products and services',
    imageWidth: 1600,
    imageHeight: 1200,
  },
}
