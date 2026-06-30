// Navigation links
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// Site metadata
export const SITE = {
  name: 'digitalAka',
  tagline: 'We create digital experiences that matter',
  url: 'https://digitalaka.com',
  description:
    'digitalAka is a full-service digital agency specialising in web design, development, SEO, and digital marketing.',
  logo: '/images/logo.svg', // you can use an SVG or PNG
  contactEmail: 'hello@digitalaka.com',
  social: {
    twitter: 'https://twitter.com/digitalaka',
    linkedin: 'https://linkedin.com/company/digitalaka',
    instagram: 'https://instagram.com/digitalaka',
    whatsapp: 'https://wa.me/919876543210',
  },
};

// Hero section
export const HERO = {
  headline: 'Grow Your Business With Digital Excellence',
  subheadline:
    'We design, build and market digital products that drive real results.',
  cta: 'Start a Project',
  ctaLink: '/contact',
  backgroundImage: '/images/hero-bg.jpg', // optional
};

// Services (homepage & services page)
export const SERVICES = [
  {
    id: 'web-design',
    title: 'Web Design',
    description:
      'Beautiful, user-centred designs that convert visitors into customers.',
    iconName: 'Palette',
  },
  {
    id: 'development',
    title: 'Web Development',
    description:
      'Fast, scalable websites and web apps built with modern technologies.',
    iconName: 'CodeXml',
  },
  {
    id: 'seo',
    title: 'SEO & Analytics',
    description:
      'Data-driven SEO strategies that help you rank higher and reach the right audience.',
    iconName: 'LineChart',
  },
  {
    id: 'branding',
    title: 'Branding',
    description:
      'Crafting unique brand identities that stand out in a crowded market.',
    iconName: 'Sparkles',
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description:
      'Targeted campaigns across social, email, and search to grow your brand.',
    iconName: 'Megaphone',
  },
  {
    id: 'support',
    title: 'Maintenance & Support',
    description:
      'Ongoing support to keep your digital assets secure and up-to-date.',
    iconName: 'Wrench',
  },
];

// About page highlights
export const ABOUT = {
  headline: 'A Digital Agency Built on Measurable Impact',
  subheadline:
    'We are a team of designers, developers, and marketers who create seamless digital experiences that help businesses succeed online. Our mission is simple: deliver real results.',
  stats: [
    { label: 'Projects Completed', value: '150+' },
    { label: 'Happy Clients', value: '80+' },
    { label: 'Years Experience', value: '7+' },
  ],
  cta: 'Learn More About Us',
  ctaLink: '/about',
  team: {
    headline: 'A Blend of Creative & Technical Experts',
    description:
      'Our team is a curated mix of strategists, creatives, and engineers, united by a passion for building what’s next. We don’t just build products; we build partnerships.',
    roles: ['Designers', 'Developers', 'Marketers', 'Strategists'],
  },
};

// Portfolio items (for grid & detail pages)
export const PORTFOLIO = [
  {
    slug: 'eco-commerce-platform',
    title: 'EcoCommerce Platform',
    category: 'Web Development',
    thumbnail: '/images/portfolio/eco.jpg',
    description:
      'A sustainable e-commerce platform connecting eco-friendly brands with conscious consumers.',
    challenge:
      'The client needed a scalable, fast-loading marketplace with complex filtering.',
    solution:
      'We built a headless Next.js frontend with a custom GraphQL backend, achieving a 98 Lighthouse score.',
    tech: ['Next.js', 'GraphQL', 'Tailwind CSS', 'Stripe'],
    liveUrl: 'https://example.com',
  },
  {
    slug: 'fintech-dashboard',
    title: 'FinTech Analytics Dashboard',
    category: 'UI/UX Design',
    thumbnail: '/images/portfolio/fintech.jpg',
    description:
      'Real-time financial dashboard for tracking investments and market data.',
    challenge: 'Display huge amounts of data without overwhelming users.',
    solution:
      'Designed an intuitive interface with custom data visualisation components.',
    tech: ['React', 'D3.js', 'Node.js'],
    liveUrl: 'https://example.com',
  },
  {
    slug: 'health-app-rebrand',
    title: 'Health App Rebrand',
    category: 'Branding',
    thumbnail: '/images/portfolio/health.jpg',
    description:
      'Complete brand overhaul for a health & wellness app, including logo, UI, and guidelines.',
    challenge: 'Modernise the brand while keeping it trustworthy and friendly.',
    solution:
      'Developed a soft colour palette and clean typography system, increasing app downloads by 40%.',
    tech: ['Figma', 'Illustrator'],
    liveUrl: 'https://example.com',
  },
];

// Testimonials
export const TESTIMONIALS = [
  {
    quote:
      'digitalAka transformed our outdated website into a lead-generation machine. Professional, fast, and creative.',
    author: 'Mark R.',
    role: 'CEO, TechStartup',
  },
  {
    quote:
      'They understood our vision from day one. The SEO work alone increased our organic traffic by 200% in 6 months.',
    author: 'Priya S.',
    role: 'Marketing Director, GreenGoods',
  },
  {
    quote:
      'From design to launch, the team was incredible. Our new platform handles 10x the traffic effortlessly.',
    author: 'David K.',
    role: 'CTO, CloudSolutions',
  },
];

// Blog posts preview data (in real project you’d fetch from CMS/filesystem)
export const BLOG_POSTS = [
  {
    slug: 'web-design-trends-2025',
    title: 'Web Design Trends to Watch in 2025',
    excerpt:
      'Discover the top design trends that will shape the digital landscape this year.',
    date: '2025-01-15',
    author: 'Samantha Lee',
    image: '/images/blog/web-design-trends.jpg',
  },
  {
    slug: 'seo-mistakes-to-avoid',
    title: '5 Common SEO Mistakes and How to Avoid Them',
    excerpt:
      'Avoid these pitfalls to improve your search rankings and drive more traffic.',
    date: '2025-01-10',
    author: 'Alex Johnson',
    image: '/images/blog/seo-mistakes.jpg',
  },
  {
    slug: 'choosing-tech-stack',
    title: 'How to Choose the Right Tech Stack for Your Project',
    excerpt:
      'A practical guide to selecting technologies that align with your business goals.',
    date: '2025-01-05',
    author: 'Alex Johnson',
    image: '/images/blog/tech-stack.jpg',
  },
];

// Contact page info
export const CONTACT = {
  heading: "Let’s Work Together",
  subheading:
    "Have a project in mind? Fill in the form and our team will get back to you within 24 hours.",
  email: "hello@digitalaka.com",
  phone: "+91 98765 43210",
  address: "India - serving clients globally",
};