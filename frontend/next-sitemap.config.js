/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://manishkandaridev-portfolio.vercel.app',
  generateRobotsTxt: true,           // robots.txt auto generate
  exclude: ['/admin', '/admin/portfolio-editor'], // Admin pages exclude
  sitemapSize: 5000,                 // Sitemap size limit
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }, // Public pages crawl
      { userAgent: '*', disallow: ['/admin', '/admin/portfolio-editor'] }, // Admin block
    ],
    additionalSitemaps: [
      'https://manishkandaridev-portfolio.vercel.app/sitemap.xml', // Sitemap URL
    ],
  },
};
