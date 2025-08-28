const path = require('path');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://manishkandaridev-portfolio.vercel.app',
  generateRobotsTxt: false,
  sitemapSize: 5000,
  exclude: ['/admin', '/admin/**', '/admin/portfolio-editor'],

  additionalPaths: async (config) => [
    { loc: '/projects', changefreq: 'daily', priority: 0.9 },
    { loc: '/feedback', changefreq: 'weekly', priority: 0.7 },
    { loc: '/about', changefreq: 'weekly', priority: 0.7 },
  ],

  // ✅ Output directory set to root (project root)
  outDir: path.resolve(__dirname), 

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/portfolio-editor'] },
    ],
    additionalSitemaps: ['https://manishkandaridev-portfolio.vercel.app/sitemap.xml'],
  },
};
