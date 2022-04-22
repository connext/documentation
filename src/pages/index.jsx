import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import useBaseUrl from "@docusaurus/useBaseUrl";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroTitle)}>
          {siteConfig.title}
        </h1>
        <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="Develop/QuickStart/testing-against-testnet"
          >
            Connext Quickstart - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

// function HomepageImage() {
//   const imageURL = "/img/connextLogoBig.png";

//   return (
//     <section className={styles.logoSection}>
//       <div className={styles.logoHolder}>
//         <img className={styles.logoPng} src={useBaseUrl(imageURL)} />
//       </div>
//     </section>
//   );
// }

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
