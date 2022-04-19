import React from "react";
import Link from "@docusaurus/Link";
import styles from "./CardLink.module.css";

export default function CardLink({ href, title }) {
  return (
    <Link to={href} className={styles.card}>
      <span style={{ userSelect: "none", marginRight: 10 }}>&raquo;</span>
      {title}
    </Link>
  );
}
