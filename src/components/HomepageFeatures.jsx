import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import React from "react";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "System Overview",
    url: "Develop/SystemOverview/howitworks",
    description: (
      <>Learn about our how our protocol works and its main system components</>
    ),
  },
  {
    title: "Quickstart",
    url: "Develop/QuickStart/intro",
    description: (
      <>Get from zero to hero real quick by following our Quickstart guide</>
    ),
  },
  {
    title: "API Reference",
    url: "Develop/APIReference/intro",
    description: (
      <>Dive into our API and learn how to build using our protocol</>
    ),
  },
];

function Feature({ title, description, url }) {
  return (
    <div className={styles.cardListItem}>
      <section className={styles.cardWrapper}>
        <div className={styles.card}>
          <Link to={url} className="navbar__link">
            <div className="text--center padding-horiz--md">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.cardList}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
