const fs = require('fs');
const path = require('path');

const baseUrl = 'https://manishkandari.dev';

const pages = [
  '', // home
  'about',
  'skills',
  'services',
  'projects',
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

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), xml);
console.log('✅ Sitemap generated successfully at public/sitemap.xml');
