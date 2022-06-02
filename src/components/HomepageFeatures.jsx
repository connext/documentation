import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import React from "react";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Start Building",
    url: "/developers/intro",
    description: (
      <>Get started with building your first crosschain application (xapp)</>
    ),
  },
  {
    title: "Run a Router",
    url: "/routers/intro",
    description: (
      <>
        Step through the process of running a router and becoming a core network
        participant
      </>
    ),
  },
  {
    title: "Connext SDK",
    url: "/developers/sdk/sdk-quickstart",
    description: (
      <>
        Learn about our SDK with simple to follow conceptual overviews detailed
        descriptions of APIs
      </>
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
