/** next-sitemap.config.js **/
module.exports = {
  siteUrl: 'https://manishkandaridev-portfolio.vercel.app',
  generateRobotsTxt: false, // ✅ robots.txt ko generate na kare
  sitemapSize: 5000,
  additionalPaths: async (config) => [
    {
      loc: 'https://manishkandaridev-portfolio.vercel.app/',
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: 'https://manishkandaridev-portfolio.vercel.app/projects',
      changefreq: 'daily',
      priority: 0.9,
    },
    {
      loc: 'https://manishkandaridev-portfolio.vercel.app/feedback',
      changefreq: 'weekly',
      priority: 0.7,
    },
    {
      loc: 'https://manishkandaridev-portfolio.vercel.app/about',
      changefreq: 'weekly',
      priority: 0.7,
    },
  ],
};
