"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AccountItem from "./accountItem";
import { usePathname } from "next/navigation";

export default function AccountsSection() {
  const [accounts, setAccounts]: [any[], any] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/accounts`);
    if (pathname === "/") {
      url.searchParams.append("limit", "3");
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data);
      });
  }, [pathname]);

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Accounts</h1>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-auto">
          <Image
            src="/icons/plus.svg"
            alt="Add Account"
            width={24}
            height={24}
            className="h-4 w-4"
          />
          <span className="sr-only">Add Account</span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account: any) => (
          <AccountItem
            key={account._id}
            balance={account.balance}
            name={account.name}
            type={account.type}
          />
        ))}
      </div>
    </>
  );
}
