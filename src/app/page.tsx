import Accounts from "./accounts/page";
import Transactions from "./transactions/page";

export default function Home() {
  return (
    <>
      <Accounts isFromDashboard={true} />
      <Transactions isFromDashboard={true} />
    </>
  );
}
