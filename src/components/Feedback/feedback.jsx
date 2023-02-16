import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './styles.module.css';
 
export default function Feedback({ resource }) {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }
 
  useEffect(() => {
    window.HappyReact.init();
  }, []);
 
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Was this page helpful?</h3>
      <div
        className={styles.widget}
        data-hr-token="42e96254-e0df-42e3-867d-62dc42768774"
        data-hr-resource="ANSWER ME"
      />
    </div>
  );
}