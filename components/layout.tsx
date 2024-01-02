import React, { ReactNode } from "react";
import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";

export const siteTitle = "Demo app using Next.js";

interface LayoutProps {
  children: ReactNode;
  home?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Demo app using Next.js" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/" className={styles.backToHomeLink}>
            ← Back to home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
