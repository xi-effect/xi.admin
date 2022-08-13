import React from 'react';
import Head from 'next/head';

const Layout: React.FC<{ title: string }> = ({ title, children }) => (
  <>
    <Head>
      <title>Ξffect | {title}</title>
      <meta name='robots' content='noindex' />
    </Head>
    {children}
  </>
);

export default Layout;
