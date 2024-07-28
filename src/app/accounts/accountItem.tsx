import React from "react";

export default function AccountItem({
  balance = 0,
  name,
  type,
}: {
  balance?: number;
  name: string;
  type: string;
}) {
  const balanceInfo = {
    color:
      balance === 0
        ? "text-muted-foreground"
        : balance > 0
        ? "text-green-500"
        : "text-red-500",
    sign: balance === 0 ? "" : balance > 0 ? "+ " : "- ",
    value: Math.abs(balance),
  };
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <p className="text-sm text-muted-foreground">{type}</p>
        <h2 className="whitespace-nowrap text-xl font-semibold leading-none tracking-tight">
          {name}
        </h2>
        <h3
          className={`whitespace-nowrap text-2xl font-semibold leading-none tracking-tight ${balanceInfo.color}`}
        >
          {balanceInfo.sign}${balanceInfo.value}
        </h3>
      </div>
    </div>
  );
}
