import { Route, Routes } from "react-router-dom";

import UserAndRolesControl from "../../../pages/manufacturingModule/administrationAndSettings/userAndRolesControl";
import WorkflowEngineRules from "../../../pages/manufacturingModule/administrationAndSettings/workflowEngineRules";
import SystemSettingsConfiguration from "../../../pages/manufacturingModule/administrationAndSettings/systemSettingsConfiguration";

export default function AdministrationAndSettingsRouting() {
  return (
    <Routes>
      <Route path="/user-and-roles-control" element={<UserAndRolesControl />} />

      <Route path="/workflow-engine-rules" element={<WorkflowEngineRules />} />

      <Route
        path="/system-settings-configuration"
        element={<SystemSettingsConfiguration />}
      />
    </Routes>
  );
}
