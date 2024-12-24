import { ProductProps, Table } from "../components/table/table";
import data from "../data/data.json";

export type CardProps = {
  id: number;
  title: string;
  amount: string;
  historicalAmount: string;
  result: "positive" | "negative" | null;
};

export const Dashboard = () => {
  // Transformar las tarjetas asegurando los tipos de `result`.
  const formattedCards = data.cards.map((card) => ({
    ...card,
    result:
      card.result === "positive" || card.result === "negative"
        ? card.result
        : null, // Aseguramos que solo se permitan valores válidos.
  })) as CardProps[]; // Afirmamos que cumple con el tipo `CardProps[]`.

  return (
    <>
      <Table
        data={data.orders as ProductProps[]}
        cards={formattedCards} // Pasamos las tarjetas formateadas.
      />
    </>
  );
};
