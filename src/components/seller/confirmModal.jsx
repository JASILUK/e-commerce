import { X } from "lucide-react";
import styles from "./confirmmodal.module.css";

export default function ConfirmModal({ title, message, onCancel, onConfirm }) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h4>{title}</h4>
          <button className={styles.close} onClick={onCancel}><X size={18} /></button>
        </div>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button className={styles.danger} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}