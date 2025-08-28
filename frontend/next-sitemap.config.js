/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://manishkandaridev-portfolio.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin', '/admin/**', '/admin/portfolio-editor'], // exclude admin properly

  additionalPaths: async (config) => [
    // Root / removed to avoid duplicate
    { loc: '/projects', changefreq: 'daily', priority: 0.9 },
    { loc: '/feedback', changefreq: 'weekly', priority: 0.7 },
    { loc: '/about', changefreq: 'weekly', priority: 0.7 },
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/portfolio-editor'] },
    ],
    additionalSitemaps: ['https://manishkandaridev-portfolio.vercel.app/sitemap.xml'],
  },
};
