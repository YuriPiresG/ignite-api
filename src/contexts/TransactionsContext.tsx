import { ReactNode, createContext, useEffect, useState } from "react";

interface Transaction {
  id: number;
  type: "income" | "outcome";
  description: string;
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TrasactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      const reponse = await fetch("http://localhost:3000/transactions");
      const data = await reponse.json();

      setTransactions(data);
    }
    loadTransactions();
  }, []);

  return (
    <TrasactionsContext.Provider value={{ transactions }}>
      {children}
    </TrasactionsContext.Provider>
  );
}
