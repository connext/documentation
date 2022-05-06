import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import React from "react";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Build",
    url: "Develop/Develop/intro",
    description: (
      <>Get started with building your first crosschain application (xapp)</>
    ),
  },
  {
    title: "Run a Router",
    url: "Routers/Guides/checklist",
    description: (
      <>Step through the process of running a router and becoming a core network participant</>
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
