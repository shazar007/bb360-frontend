import { Route, Routes } from "react-router-dom";
import AccountLedger from "../../pages/financialModule/accountLedger";
import DebitCreditNote from "../../pages/financialModule/debitCreditNote";
import { useEffect } from "react";

export default function FinancialModuleRouting() {
  useEffect(() => {
    document.title = "Financial Module — BB-360";
  }, []);
  return (
    <Routes>
      <Route path="/account-ledger" element={<AccountLedger />} />
      <Route path="/debit-credit-note" element={<DebitCreditNote />} />
    </Routes>
  );
}
