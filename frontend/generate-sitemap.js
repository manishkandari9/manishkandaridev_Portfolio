const fs = require('fs');
const path = require('path');

// ✅ Use the live domain with 'www'
const baseUrl = 'https://www.manishkandari.dev';

const pages = [
  '', // home
  'about',
  'skills',
  'services',
  'projects',
  'feedback',
  'contact',
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

// ✅ Ensure 'public' folder exists
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'));
}

// ✅ Write sitemap
fs.writeFileSync(sitemapPath, xml);
console.log('✅ Sitemap generated successfully at public/sitemap.xml');
