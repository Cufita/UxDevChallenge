import clsx from "clsx";
import type { ProductStatusProps } from "../table/table";
import styles from "./status.module.css";

const statusIcons: Record<ProductStatusProps, string> = {
  Approved: "/approved-icon.svg",
  Pending: "/pending-icon.svg",
  Rejected: "/rejected-icon.svg",
};

export const Status = ({ status }: { status: ProductStatusProps }) => {
  return (
    <div className={clsx(styles.container, styles[status.toLowerCase()])}>
      <img
        src={statusIcons[status]}
        alt={`${status} icon`}
        className={styles.icon} 
      />
      <p>{status}</p>
    </div>
  );
};
