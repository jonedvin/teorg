import Head from 'next/head';
import { useRouter } from 'next/router';


const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>tØrg</title>
      </Head>
      <div className="layout_div">
        <button className="torg_button" onClick={() => router.push(`/`)}>tØrg</button>
        {children}
      </div>
    </>
  );
}

export default Layout;
