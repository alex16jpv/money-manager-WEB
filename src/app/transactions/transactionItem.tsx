import React from "react";
import Image from "next/image";
import { TRANSACTION_TYPES } from "@/utils/constants";

export default function TransactionItem({
  amount,
  category,
  description,
  from_account_name,
  to_account_name,
  type,
}: {
  amount: number;
  category?: string;
  description?: string;
  from_account_name?: string;
  to_account_name?: string;
  type: keyof typeof TRANSACTION_TYPES;
}) {
  let amountColor = "";

  if (type === TRANSACTION_TYPES.INCOME) {
    amountColor = "text-green-500";
  } else if (type === TRANSACTION_TYPES.EXPENSE) {
    amountColor = "text-red-500";
  } else if (type === TRANSACTION_TYPES.TRANSFER) {
    amountColor = "text-blue-500";
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="px-6 py-3 grid grid-cols-[1fr_auto] items-center gap-4">
        <div className="grid gap-1">
          {category && (
            <div className="flex items-center gap-2">
              <Image
                src="/icons/shopping-cart.svg"
                alt="transaction"
                width={24}
                height={24}
                className="h-4 w-4 text-muted-foreground"
              />
              <div className="font-medium">{category}</div>
            </div>
          )}
          {description && (
            <p className="font-medium text-muted-foreground">{description}</p>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {type === TRANSACTION_TYPES.TRANSFER && (
              <>
                <div>{from_account_name}</div>
                <Image
                  src="/icons/arrow-right.svg"
                  alt="arrow"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                <div>{to_account_name}</div>
              </>
            )}

            {type === TRANSACTION_TYPES.INCOME && <div>{to_account_name}</div>}

            {type === TRANSACTION_TYPES.EXPENSE && (
              <div>{from_account_name}</div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className={`font-medium ${amountColor}`}>${amount}</div>
        </div>
      </div>
    </div>
  );
}
