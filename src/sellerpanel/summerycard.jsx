import React from 'react';
import styles from './summery.module.css';

export default function SummaryCard({ title, value, icon, colorScheme, trend, trendUp }) {
  return (
    <div className={`${styles.card} ${styles[colorScheme]}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          {icon}
        </div>
        {trend && (
          <div className={`${styles.cardTrend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
            {trend}
          </div>
        )}
      </div>
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
}
