// pages/sitemap.xml.ts

import { siteURL } from '@/lib/constants';
import { GetServerSideProps } from 'next';

interface Post {
    slug: string;
    updatedAt?: string;
}

async function generateSiteMap(): Promise<string> {
    const posts: Post[] = await fetch(`${siteURL}/api/blog`).then(res => res.json());

    const blogUrls = posts.map(
        (post) => `
        <url>
          <loc>${siteURL}/blog/${post.slug}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`
    );

    const staticPages: string[] = [
        '',
        '/about',
        '/projects',
        '/blog',
        '/contact',
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
            .map(
                (path) => `
      <url>
        <loc>${siteURL}${path}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>`
            )
            .join('')}
      ${blogUrls.join('')}
  </urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const sitemap = generateSiteMap();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

const Sitemap = () => null;
export default Sitemap;
