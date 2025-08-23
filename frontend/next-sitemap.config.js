/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://manishkandaridev-portfolio.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/portfolio-editor'], // Admin pages exclude
  sitemapSize: 5000, // Tumhare site ke liye 5000 kaafi hai
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/admin/portfolio-editor'] },
    ],
  },
};