/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.manishkandari.dev', // ✅ www version use karo
  generateRobotsTxt: true,
  outDir: 'public',
  changefreq: 'weekly',
  priority: 0.8,
  sitemapSize: 7000,
  exclude: ['/admin', '/private-endpoints'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/private-endpoints'] },
    ],
  },
};
