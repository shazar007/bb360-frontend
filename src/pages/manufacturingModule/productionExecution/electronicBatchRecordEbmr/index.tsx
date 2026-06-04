import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import CustomInput from "../../../../components/customInput";

export default function ElectronicBatchRecordEbmr() {
  const [activeTab, setActiveTab] = useState("Batch Summary");
  const [openFilter, setOpenFilter] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [batchSummary, setBatchSummary] = useState({
    batchId: "BA-9585Pa",
    targetProduct: "Paracetamol 500mg",
    totalRunDuration: "14 Hrs 22 Mins",
    targetYield: "100,000",
    actualYieldCaptured: "99,120",
  });
  const [editForm, setEditForm] = useState({
    batchId: "",
    targetProduct: "",
    totalRunDuration: "",
    targetYield: "",
    actualYieldCaptured: "",
  });
  const [selectedAuditIndex, setSelectedAuditIndex] = useState<number | null>(
    null,
  );

  const [isDispenseEdit, setIsDispenseEdit] = useState(false);
  const [dispensingLog, setDispensingLog] = useState({
    ingredientCode: "Disp-092221",
    chemicalName: "WO-2026-0812",
    lotTrackingId: "Lactose Mono",
    targetMass: "Lot-2026-90A",
    actualDispensed: "50.00 kg",
    scaleAssetId: "50.04 kg",
    operatorSignature: "+0.05 %",
  });

  const [isAuditEdit, setIsAuditEdit] = useState(false);
  const [auditTrailData, setAuditTrailData] = useState([
    {
      userId: "Opr-2155",
      employeeName: "Bilal Hassan",
      actionPerformed: "BAT-091 take sample from the batch record",
      reasonForChange: "vessel temp goes to high as per the SOP",
    },
    {
      userId: "Opr-4515",
      employeeName: "Muzaffar Ali",
      actionPerformed: "Weighting & Dispensing",
      reasonForChange: "Nil",
    },
  ]);
  const [auditForm, setAuditForm] = useState({
    userId: "",
    employeeName: "",
    actionPerformed: "",
    reasonForChange: "",
  });

  const [dispenseForm, setDispenseForm] = useState({
    ingredientCode: "",
    chemicalName: "",
    lotTrackingId: "",
    targetMass: "",
    actualDispensed: "",
    scaleAssetId: "",
    operatorSignature: "",
  });

  const handleSave = () => {
    setBatchSummary(editForm);
    setIsEdit(false);
  };

  const handleDispenseSave = () => {
    setDispensingLog(dispenseForm);
    setIsDispenseEdit(false);
  };

  const handleAuditSave = () => {
    if (selectedAuditIndex === null) return;

    const updatedData = [...auditTrailData];

    updatedData[selectedAuditIndex] = auditForm;

    setAuditTrailData(updatedData);

    setIsAuditEdit(false);
  };

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold text-heading1 md:text-lg">
            Work Order Record (eBMR)
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <div className="relative w-full md:w-40">
            <input
              placeholder="Search"
              className="h-10 w-full rounded-sm bg-white pl-10 pr-4 placeholder:text-sm placeholder:text-heading1/36 focus:outline-none"
            />
            <Icon
              icon="mynaui:search"
              className="absolute left-3 top-2.5 text-[20px] text-heading1/36"
            />
          </div>
          {/* <button
            onClick={() => setOpenFilter(!openFilter)}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 text-white shadow-[0_1px_12px_#0000001F] md:w-auto"
          >
            <Icon icon="mage:filter" className="h-5 w-5" />
            Filters
          </button> */}

          <button className="flex items-center justify-center w-full h-10 gap-2 px-4 text-white rounded-md cursor-pointer md:w-auto bg-primary">
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Release Batch
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3 overflow-hidden rounded-2xl bg-white">
        <div className="flex flex-wrap gap-4 p-4">
          {[
            "Batch Summary",
            "Dispensing Logs",
            "Execution Steps",
            "Audit Trail & Signature",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer text-xs font-semibold ${
                activeTab === tab ? "text-primary" : "text-heading1"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "Batch Summary" && (
          <CustomTable
            norounded
            height="55vh"
            headers={[
              "Edit",
              "Batch ID",
              "Target Product",
              "Total Run Duration",
              "Target Yield",
              "Actual Yield Captured",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="cursor-pointer text-lg text-primary"
                  onClick={() => {
                    setEditForm(batchSummary);
                    setIsEdit(true);
                  }}
                />,

                batchSummary.batchId,

                batchSummary.targetProduct,

                batchSummary.totalRunDuration,

                batchSummary.targetYield,

                batchSummary.actualYieldCaptured,
              ],
            ]}
          />
        )}
        {activeTab === "Dispensing Logs" && (
          <CustomTable
            norounded
            height="55vh"
            headers={[
              "Edit",
              "Ingredient Code",
              "Chemical Name",
              "Lot Tracking ID",
              "Target Mass",
              "Actual Dispensed",
              "Scale Asset ID",
              "Operator Signature",
            ]}
            data={[
              [
                <Icon
                  icon="basil:edit-outline"
                  className="cursor-pointer text-lg text-primary"
                  onClick={() => {
                    setDispenseForm(dispensingLog);
                    setIsDispenseEdit(true);
                  }}
                />,
                dispensingLog.ingredientCode,
                dispensingLog.chemicalName,
                dispensingLog.lotTrackingId,
                dispensingLog.targetMass,
                dispensingLog.actualDispensed,
                dispensingLog.scaleAssetId,
                dispensingLog.operatorSignature,
              ],
            ]}
          />
        )}

        {activeTab === "Execution Steps" && (
          <div className="p-4">
            <p className="px-4 py-3 text-sm font-semibold border-b border-[#304250]/10 bg-[#ECF0F4] text-heading1">
              Shop Floor Execution Phase
            </p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between p-4 border border-[#304250]/20 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary text-sm font-semibold">
                    01
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-heading1">
                      Raw Material Staging & Pre-Weight Verification
                    </p>

                    <div className="flex flex-wrap gap-6 mt-2 text-xs text-heading2">
                      <p>
                        <span className="font-semibold text-heading1">
                          Start
                        </span>{" "}
                        31-05-2026 06:00
                      </p>

                      <p>
                        <span className="font-semibold text-heading1">End</span>{" "}
                        31-05-2026 07:45
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-1 text-xs text-heading2">
                      <p>
                        <span className="font-semibold text-heading1">Op</span>{" "}
                        OPR-Bilal Hassan
                      </p>

                      <p>
                        <span className="font-semibold text-heading1">
                          Supervisor
                        </span>{" "}
                        Umair yaqoob
                      </p>
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
                  Completed
                </span>
              </div>

              <div className="flex items-center justify-between p-4 border border-[#304250]/20 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary text-sm font-semibold">
                    02
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-heading1">
                      High-Shear Granulation & Wet Massing
                    </p>

                    <div className="flex flex-wrap gap-6 mt-2 text-xs text-heading2">
                      <p>
                        <span className="font-semibold text-heading1">
                          Start
                        </span>{" "}
                        31-05-2026 08:00
                      </p>

                      <p>
                        <span className="font-semibold text-heading1">End</span>{" "}
                        31-05-2026 09:15
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-1 text-xs text-heading2">
                      <p>
                        <span className="font-semibold text-heading1">Op</span>{" "}
                        OPR-Suffyan Ali
                      </p>

                      <p>
                        <span className="font-semibold text-heading1">
                          Supervisor
                        </span>{" "}
                        Umair yaqoob
                      </p>
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
                  Completed
                </span>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Audit Trail & Signature" && (
          <CustomTable
            norounded
            height="55vh"
            headers={[
              "Edit",
              "User ID",
              "Employee Name",
              "Action Performed",
              "Reason for Change",
            ]}
            data={auditTrailData.map((row, index) => [
              <Icon
                icon="basil:edit-outline"
                className="cursor-pointer text-lg text-primary"
                onClick={() => {
                  setAuditForm(row);
                  setSelectedAuditIndex(index);
                  setIsAuditEdit(true);
                }}
              />,

              row.userId,

              row.employeeName,

              row.actionPerformed,

              row.reasonForChange,
            ])}
          />
        )}

        {isEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-250 rounded-2xl bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xs font-semibold text-heading1">
                  Edit Batch Summary
                </h2>

                <button
                  onClick={() => setIsEdit(false)}
                  className="text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4">
                <CustomInput
                  label="Batch ID"
                  value={editForm.batchId}
                  onChange={(e: any) =>
                    setEditForm({
                      ...editForm,
                      batchId: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Target Product"
                  value={editForm.targetProduct}
                  onChange={(e: any) =>
                    setEditForm({
                      ...editForm,
                      targetProduct: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Total Run Duration"
                  value={editForm.totalRunDuration}
                  onChange={(e: any) =>
                    setEditForm({
                      ...editForm,
                      totalRunDuration: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Target Yield"
                  value={editForm.targetYield}
                  onChange={(e: any) =>
                    setEditForm({
                      ...editForm,
                      targetYield: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Actual Yield Captured"
                  value={editForm.actualYieldCaptured}
                  onChange={(e: any) =>
                    setEditForm({
                      ...editForm,
                      actualYieldCaptured: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end p-4 pt-0">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center h-10 gap-2 px-4 text-white rounded-md w-25 bg-primary cursor-pointer"
                >
                  <Icon icon="mynaui:save" />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {isDispenseEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-250 rounded-2xl bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xs font-semibold text-heading1">
                  Edit Dispensing Log
                </h2>

                <button
                  onClick={() => setIsDispenseEdit(false)}
                  className="text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4">
                <CustomInput
                  label="Ingredient Code"
                  value={dispenseForm.ingredientCode}
                  onChange={(e: any) =>
                    setDispenseForm({
                      ...dispenseForm,
                      ingredientCode: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Chemical Name"
                  value={dispenseForm.chemicalName}
                  onChange={(e: any) =>
                    setDispenseForm({
                      ...dispenseForm,
                      chemicalName: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Lot Tracking ID"
                  value={dispenseForm.lotTrackingId}
                  onChange={(e: any) =>
                    setDispenseForm({
                      ...dispenseForm,
                      lotTrackingId: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Target Mass"
                  value={dispenseForm.targetMass}
                  onChange={(e: any) =>
                    setDispenseForm({
                      ...dispenseForm,
                      targetMass: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Actual Dispensed"
                  value={dispenseForm.actualDispensed}
                  onChange={(e: any) =>
                    setDispenseForm({
                      ...dispenseForm,
                      actualDispensed: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Scale Asset ID"
                  value={dispenseForm.scaleAssetId}
                  onChange={(e: any) =>
                    setDispenseForm({
                      ...dispenseForm,
                      scaleAssetId: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Operator Signature"
                  value={dispenseForm.operatorSignature}
                  onChange={(e: any) =>
                    setDispenseForm({
                      ...dispenseForm,
                      operatorSignature: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end p-4 pt-0">
                <button
                  onClick={handleDispenseSave}
                  className="flex items-center justify-center h-10 gap-2 px-4 text-white rounded-md w-25 bg-primary cursor-pointer"
                >
                  <Icon icon="mynaui:save" />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {isAuditEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-250 rounded-2xl bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xs font-semibold text-heading1">
                  Edit Audit Trail
                </h2>

                <button
                  onClick={() => setIsAuditEdit(false)}
                  className="text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4">
                <CustomInput
                  label="User ID"
                  value={auditForm.userId}
                  onChange={(e: any) =>
                    setAuditForm({
                      ...auditForm,
                      userId: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Employee Name"
                  value={auditForm.employeeName}
                  onChange={(e: any) =>
                    setAuditForm({
                      ...auditForm,
                      employeeName: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Action Performed"
                  value={auditForm.actionPerformed}
                  onChange={(e: any) =>
                    setAuditForm({
                      ...auditForm,
                      actionPerformed: e.target.value,
                    })
                  }
                />

                <CustomInput
                  label="Reason For Change"
                  value={auditForm.reasonForChange}
                  onChange={(e: any) =>
                    setAuditForm({
                      ...auditForm,
                      reasonForChange: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end p-4 pt-0">
                <button
                  onClick={handleAuditSave}
                  className="flex items-center justify-center h-10 gap-2 px-4 text-white rounded-md w-25 bg-primary cursor-pointer"
                >
                  <Icon icon="mynaui:save" />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
