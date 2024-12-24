import React from "react";
import { Status } from "../status/status"; 
import styles from "./transactionDetail.module.css";

type TransactionDetailProps = {
  transaction: {
    title: string;
    color: string; 
    status: "Approved" | "Pending" | "Rejected";
    date: string;
    amount: string;
    paymentMethod: string;
    product: string;
    id: number;
  };
  onClose: () => void; 
};

export const TransactionDetail: React.FC<TransactionDetailProps> = ({
  transaction,
  onClose,
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.detailContainer}
        onClick={(e) => e.stopPropagation()} // Evitar que el clic cierre el modal
      >
        
        <img
          src={'https://i.imgur.com/dl5A2hB.jpeg'} 
          alt={transaction.title}
          className={styles.productImage}
        />
        <div className={styles.content}>
          <h2 className={styles.productTitle}>{transaction.product}</h2>
          
          <p className={styles.productCode}>Lyla - L12</p>
          <div className={styles.detailRow}>
            <span>Status:</span>
            <Status status={transaction.status} /> 
          </div>
          <div className={styles.detailRow}>
            <span>Date:</span>
            <span>{transaction.date}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Amount:</span>
            <span>{transaction.amount}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Payment method:</span>
            <span>{transaction.paymentMethod}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Transaction ID:</span>
            <span>{transaction.id}</span>
          </div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};
