import React from 'react';
import Layout, { LayoutT } from './Layout';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout: React.FC<LayoutT> = ({ title, children }) => (
  <Layout title={title}>
    <Sidebar>{children}</Sidebar>
  </Layout>
);

export default MainLayout;
