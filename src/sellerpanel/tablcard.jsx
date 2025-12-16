import React from 'react';
import styles from './table.module.css';

export function TableCard({ title, subtitle, icon, alert, children }) {
  return (
    <div className={styles.tableCard}>
      <div className={`${styles.tableHeader} ${alert ? styles.alertHeader : ''}`}>
        <div className={styles.headerContent}>
          {icon && (
            <div className={`${styles.headerIcon} ${alert ? styles.alertIcon : ''}`}>
              {icon}
            </div>
          )}
          <div className={styles.headerText}>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      </div>
      <div className={styles.tableContent}>
        {children}
      </div>
    </div>
  );
}