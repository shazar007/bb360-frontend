import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import CustomCheckbox from "../../../../components/customCheckbox";
import { notifyError, notifySuccess } from "../../../../components/toast";

export default function QcReviewAndRelease() {
  const [openFilter, setOpenFilter] = useState(false);
  const [labTestingData, setLabTestingData] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  useEffect(() => {
    setLabTestingData([
      {
        batchId: "BAT-091",
        materialName: "Paracetamol",
        quarantineReport: "Cleared",
        dispensingTolerance: "Complaint",
        inProcess: "Complaint",
        qcLabResult: "Complaint 99.42%",
        yield: "Passed 99.42%",
        dispositionState: "Testing",
      },

      {
        batchId: "Lab-2026-45",
        materialName: "Amoxicillin",
        quarantineReport: "Cleared",
        dispensingTolerance: "Complaint",
        inProcess: "Complaint",
        qcLabResult: "Complaint 99.42%",
        yield: "Passed 99.42%",
        dispositionState: "Hard Hold",
      },
    ]);
  }, []);

  const STATUS_STYLES: Record<string, any> = {
    Completed: {
      backgroundColor: "#00F2001F",
      color: "#1E9B1E",
    },

    Testing: {
      backgroundColor: "#FFF5CC",
      color: "#A89507",
    },

    "QA Review": {
      backgroundColor: "#D8E9FF",
      color: "#075AA8",
    },

    "Hard Hold": {
      backgroundColor: "#FFE5E5",
      color: "#FF0000",
    },
  };

  const toggleSelect = (index: number, value: boolean) => {
    setSelectedRows((prev) =>
      value ? [...prev, index] : prev.filter((i) => i !== index),
    );
  };
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold text-heading1 md:text-lg">
            QC Review & Release
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
            onClick={() => setOpenFilter(!openFilte     
          </button> */}
          <button
            onClick={() => {
              if (selectedRows.length === 0) {
                notifyError("Please select at least one row");
                return;
              }

              const updated = labTestingData.filter(
                (_, index) => !selectedRows.includes(index),
              );
 
              setLabTestingData(updated);
              setSelectedRows([]);

              notifySuccess("Selected row(s) rejected successfully");
            }}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="proicons:delete" className="w-5 h-5" />
            Reject
          </button>
          <button
            onClick={() => {}}
            className="flex items-center justify-center w-full h-10 gap-2 px-4 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            <Icon
              icon="streamline-flex:credit-card-approved"
              className="w-5 h-5"
            />
            Market Release
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3 overflow-hidden rounded-2xl bg-white">
        <div className="p-4">
          <p className="text-xs font-semibold text-primary">QC Review</p>
        </div>
        <CustomTable
          norounded
          height="55vh"
          headers={[
            "Select",
            "Batch ID",
            "Material Name",
            "Quarantine Report",
            "Dispensing Tolerances",
            "In-Process (eBRM)",
            "QC Lab Results",
            "Yield",
            "Disposition State",
            "Action",
          ]}
          data={labTestingData.map((row, index) => [
            <CustomCheckbox
              checked={selectedRows.includes(index)}
              onChange={(value) => toggleSelect(index, value)}
            />,

            row.batchId,

            row.materialName,

            row.quarantineReport,

            <span
              className="px-2 py-1 text-[9px] rounded"
              style={{
                backgroundColor: "#00F2001F",
                color: "#1E9B1E",
              }}
            >
              {row.dispensingTolerance}
            </span>,

            <span
              className="px-2 py-1 text-[9px] rounded"
              style={{
                backgroundColor: "#00F2001F",
                color: "#1E9B1E",
              }}
            >
              {row.inProcess}
            </span>,

            row.qcLabResult,

            row.yield,

            <span
              className="px-2 py-1 text-[9px] rounded"
              style={
                STATUS_STYLES[row.dispositionState] || {
                  backgroundColor: "#E5E7EB",
                  color: "#374151",
                }
              }
            >
              {row.dispositionState}
            </span>,

            "-",
          ])}
        />
      </div>
    </div>
  );
}
