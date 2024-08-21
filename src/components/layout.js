import Head from 'next/head';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>tØrg</title>
    </Head>
    <div className="layout_div">
      <h1 className="torg">tØrg</h1>
      {children}
    </div>
  </>
);

export default Layout;
