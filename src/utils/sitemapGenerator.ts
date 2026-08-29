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

  // TOPIK Papers (Clean URLs: /topik/91-1)
  topikPapers.forEach((paper) => {
    const slug = paper.id.replace(/^topik-/, '');
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/topik/${slug}</loc>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Textbooks (Clean URLs: /book/tb-1)
  textbooks.forEach((book) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/book/${book.id}</loc>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}
