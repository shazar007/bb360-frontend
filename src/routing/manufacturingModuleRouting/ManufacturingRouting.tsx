import { Route, Routes } from "react-router-dom";
import MaterialReturnNote from "../../pages/inventory/materialReturnNote";
import MaterialIssueNote from "../../pages/inventory/materialIssueNote";
import MaterialIssueNoteCreate from "../../pages/inventory/materialIssueNote/materialIssueNoteCreate";
import MaterialReturnNoteCreate from "../../pages/inventory/materialReturnNote/materialReturnNoteCreate";
import { useEffect } from "react";

export default function ManufacturingRouting() {
  useEffect(() => {
    document.title = "Manufacturing Module — BB-360";
  }, []);
  return (
    <Routes>
      <Route path="/material-issue-note" element={<MaterialIssueNote />} />
      <Route
        path="/material-issue-note/create"
        element={<MaterialIssueNoteCreate />}
      />
      <Route
        path="/material-issue-note/create"
        element={<MaterialIssueNoteCreate />}
      />
      <Route path="/material-return-note" element={<MaterialReturnNote />} />
      <Route
        path="/material-return-note/create"
        element={<MaterialReturnNoteCreate />}
      />
      <Route
        path="/material-return-note/create"
        element={<MaterialReturnNoteCreate />}
      />
    </Routes>
  );
}
