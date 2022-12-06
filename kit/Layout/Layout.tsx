import React, { ReactNode } from 'react';
import Head from 'next/head';

export type LayoutT = {
  title: string;
  children: ReactNode;
};

const Layout: React.FC<LayoutT> = ({ title, children }) => (
  <>
    <Head>
      <title>{title} | xi.admin</title>
      <meta name='robots' content='noindex' />
    </Head>
    {children}
  </>
);

export default Layout;
