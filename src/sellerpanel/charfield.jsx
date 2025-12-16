import React from 'react';
import styles from './char.module.css';

export function ChartCard({ title, subtitle, children }) {
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className={styles.chartContent}>
        {children}
      </div>
    </div>
  );
}
