import React from "react";
import styles from "./card.module.css"; 

export type CardProps = {
  id: number;
  title: string;
  amount: string;
  historicalAmount: string;
  result: "positive" | "negative" | null;
};

export const Card: React.FC<CardProps> = ({
  title,
  amount,
  historicalAmount,
  result,
}) => {
  const cardClass =
    result === "positive"
      ? styles.positiveCard
      : result === "negative"
      ? styles.negativeCard
      : styles.neutralCard;

  const arrowIcon =
    result === "positive"
      ? "/trending-up.svg" 
      : result === "negative"
      ? "/trending-down.svg"
      : null; 

  return (
    <div className={`${styles.card} ${cardClass}`}>
      <div className={styles.cardHeader}>
        <h4 className={styles.cardTitle}>{title}</h4>
        {arrowIcon && (
          <img
            src={arrowIcon}
            alt={result === "positive" ? "Trending up" : "Trending down"}
            className={styles.arrowIcon}
          />
        )}
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.cardAmount}>{amount || "-"}</h2>
        <p className={styles.cardSubtitle}>
          {historicalAmount ? `today ${historicalAmount}` : "- since last hour"}
        </p>
      </div>
    </div>
  );
};
