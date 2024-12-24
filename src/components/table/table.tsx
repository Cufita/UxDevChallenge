import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./table.module.css";
import { Card, CardProps } from "../card/card";
import { Status } from "../status/status";
import { TransactionDetail } from "../transactionalDetail/TransactionDetail";

export type ProductStatusProps = "Approved" | "Pending" | "Rejected";

export type ProductProps = {
  id: number;
  customer: string;
  title: string;
  date: string;
  product: string;
  status: ProductStatusProps;
  email: string;
  amount: string;
  paymentMethod: string;
  transactionId: string;
  imageUrl: string;
  color: string; 
};


type TableProps = {
  data: ProductProps[];
  cards: CardProps[];
};

const defaultColumns: ColumnDef<ProductProps>[] = [
  {
    header: "Customer",
    accessorKey: "customer",
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className={styles.customerCell}>
          <span className={styles.customerName}>{row.customer}</span>
          <span className={styles.customerEmail}>{row.email}</span>
        </div>
      );
    },
  },
  {
    header: () => <span className={styles.alignCenter}>Date</span>,
    accessorKey: "date",
    cell: (info) => {
      const value = info.getValue<string>();
      return <span className={styles.cellText}>{value}</span>;
    },
  },
  {
    header: () => <span className={styles.alignCenter}>Product</span>,
    accessorKey: "product",
    cell: (info) => {
      const value = info.getValue<string>();
      return <span className={styles.cellText}>{value}</span>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => {
      const value = info.getValue<ProductStatusProps>();
      return <Status status={value} />;
    },
  },
  {
    header: () => (
      <span className={`${styles.cellText} ${styles.alignRight}`}>Amount</span>
    ),
    accessorKey: "amount",
    cell: (info) => {
      const value = info.getValue<string>();
      return (
        <span className={`${styles.cellText} ${styles.alignRight}`}>
          {value}
        </span>
      );
    },
  },
];

export const Table = ({ data, cards }: TableProps) => {
  const [columns] = React.useState(() => [...defaultColumns]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<ProductProps | null>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  const handleRowClick = (transaction: ProductProps) => {
    setSelectedTransaction(transaction); // Actualiza la transacción seleccionada.
  };

  const handleCloseDetail = () => {
    setSelectedTransaction(null); // Restablece la selección al cerrar el detalle.
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.cardsContainer}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            amount={card.amount}
            historicalAmount={card.historicalAmount}
            result={card.result}
          />
        ))}
      </div>
      <div className={styles.tableWrapper}>
        <h2 className={styles.title}>Transactions</h2>
        <p className={styles.subtitle}>Recent transactions from your store.</p>
        <div className={styles.scrollableTable}>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={styles.tableHeader}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={styles.tableRow}
                  onClick={() => handleRowClick(row.original)} // Manejador para la fila clickeada.
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`${styles.tableCell} ${
                        cell.column.id === "amount" ? styles.amountCell : ""
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};
