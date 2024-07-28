import React from "react";
import Image from "next/image";
import TransactionItem from "./transactionItem";

export default function TransactionsSection() {
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
          <div className="grid gap-2">
            <div className="font-semibold text-lg">June 27, 2023</div>
            <div className="grid gap-2">
              <TransactionItem
                amount={100}
                type="INCOME"
                category="Test Category"
                description="Test Description"
                to_account_name="Test Account"
              />
              <TransactionItem
                amount={100}
                type="EXPENSE"
                category="Test Category"
                description="Test Description"
                from_account_name="Test Account"
              />
              <TransactionItem
                amount={100}
                type="TRANSFER"
                category="Test Category"
                description="Test Description"
                from_account_name="Test Account"
                to_account_name="Test Account"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
