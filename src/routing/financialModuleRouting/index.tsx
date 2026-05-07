import { Route, Routes } from "react-router-dom";
import AccountLedger from "../../pages/financialModule/accountLedger";
import DebitCreditNote from "../../pages/financialModule/debitCreditNote";

export default function FinancialModuleRouting() {
  return (
    <Routes>
      <Route path="/account-ledger" element={<AccountLedger />} />
      <Route path="/debit-credit-note" element={<DebitCreditNote />} />
    </Routes>
  );
}
