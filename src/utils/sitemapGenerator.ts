import { topikPapers, textbooks } from '../data';

export function generateSitemapXml(): string {
  const baseUrl = "https://ssal-top-library.vercel.app";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Homepage
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/</loc>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // Main Sections / Tabs
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/#topik</loc>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;

  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/#textbooks</loc>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;

  // TOPIK Papers
  topikPapers.forEach((paper) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/#paper-${paper.id}</loc>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Textbooks
  textbooks.forEach((book) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/#book-${book.id}</loc>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}
