/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://manishkandaridev-portfolio.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/portfolio-editor'],
  sitemapSize: 5000,
  additionalPaths: async (config) => [
    {
      loc: 'https://face-recognition-based-attendance-system-z5gk.onrender.com',
      changefreq: 'weekly',
      priority: 0.8,
    },
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/admin/portfolio-editor'] },
    ],
  },
};