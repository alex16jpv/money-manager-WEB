"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TransactionItem from "./transactionItem";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

function groupByDate(transactions: any[]) {
  return transactions.reduce((acc, transaction) => {
    const formattedDate = formatDate(transaction.date);
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(transaction);
    return acc;
  }, {});
}

export default function TransactionsSection({
  isFromDashboard = false,
}: {
  isFromDashboard?: boolean;
}) {
  const [transactions, setTransactions]: [any[], any] = useState([]);
  useEffect(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);
    if (isFromDashboard) {
      url.searchParams.append("limit", "10");
    } else {
      url.searchParams.append("limit", "25");
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTransactions(Object.entries(groupByDate(data)));
      });
  }, [isFromDashboard]);

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Transactions</h1>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-auto">
          <Image
            src="/icons/plus.svg"
            alt="Add Transaction"
            width={24}
            height={24}
            className="w-4 h-4"
          />
          <span className="sr-only">Add Transaction</span>
        </button>
      </div>

      <div className="border shadow-sm rounded-lg">
        <div className="grid gap-4 p-4">
          {transactions.map(([date, trxs]: [string, any[]]) => (
            <div className="grid gap-2" key={date}>
              <div className="font-semibold text-lg">{date}</div>
              <div className="grid gap-2">
                {trxs.map((transaction: any) => (
                  <TransactionItem
                    key={transaction._id}
                    amount={transaction.amount}
                    type={transaction.type}
                    category={transaction.category}
                    description={transaction.description}
                    to_account_name={transaction.to_account_name}
                    from_account_name={transaction.from_account_name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
