// pages/robots.txt.ts

import { siteURL } from '@/lib/constants';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const content = `
User-agent: *
Allow: /

Sitemap: ${siteURL}/sitemap.xml
  `.trim();

  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();

  return { props: {} };
};

const Robots = () => null;
export default Robots;
