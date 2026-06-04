import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
export default function QcLabTestingSuite() {
  const [openFilter, setOpenFilter] = useState(false);
  const { goTo } = useAppNavigate();
  const [labTestingData, setLabTestingData] = useState<any[]>([]);

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("qcLabTestingData") || "[]",
    );
    const sampleData = [
      {
        labTestId: "Lab-2026-44",
        batchLotId: "LOT-2026-90A",
        materialName: "Lactose",
        testType: "Assay Purity",
        specificationLimit: "98%",
        resultValue: "99.42%",
        instrumentId: "HPLC-LAB-02",
        testingTime: "02h : 15min",
        errorStatus: "OOT Alert (Out Of Trend)",
        testingStatus: "Completed",
      },
      {
        labTestId: "Lab-2026-45",
        batchLotId: "LOT-2026-11B",
        materialName: "Acetaminophen",
        testType: "Dissolution",
        specificationLimit: "80%",
        resultValue: "-",
        instrumentId: "DIS-LAB2-01",
        testingTime: "00h : 10min",
        errorStatus: "Complaint",
        testingStatus: "Testing",
      },
    ];
    setLabTestingData([...sampleData, ...savedData]);
  }, []);
  const ERROR_STATUS_STYLES: Record<string, any> = {
    Complaint: {
      backgroundColor: "#00F2001F",
      color: "#1E9B1E",
    },

    "OOS Alert (Out Of Specification)": {
      backgroundColor: "#FFF5CC",
      color: "#A89507",
    },

    "OOT Alert (Out Of Trend)": {
      backgroundColor: "#075AA829",
      color: "#075AA8",
    },

    Invalid: {
      backgroundColor: "#FFE5E5",
      color: "#FF0000",
    },
  };

  const TESTING_STATUS_STYLES: Record<string, any> = {
    Completed: {
      backgroundColor: "#00F2001F",
      color: "#1E9B1E",
    },

    Testing: {
      backgroundColor: "#FFF5CC",
      color: "#A89507",
    },

    Staged: {
      backgroundColor: "#D8E9FF",
      color: "#075AA8",
    },

    Failed: {
      backgroundColor: "#FFE5E5",
      color: "#FF0000",
    },
  };
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold text-heading1 md:text-lg">
            QC Lab Testing Suite
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

          <button
            onClick={() => {
              localStorage.removeItem("qcLabTestingEditData");

              goTo(
                "/manufacturing-module/quality-control-qc/qc-lab-testing-suite/create",
              );
            }}
            className="flex items-center justify-center w-full h-10 gap-2 px-4 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            <Icon icon="basil:add-outline" className="w-5 h-5" />
            Create
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      <div className="mt-3 overflow-hidden rounded-2xl bg-white">
        <div className="p-4">
          <p className="text-xs font-semibold text-primary">
            QC Lab Testing Suite
          </p>
        </div>
        <CustomTable
          norounded
          height="55vh"
          headers={[
            "Edit",
            "Lab Test ID",
            "Batch LOT ID",
            "Material Name",
            "Test Type",
            " Specification TargetLimit",
            "Result Value",
            "Instrument ID",
            "Testing Time",
            "Error Status",
            "Testing Status",
            "Action",
          ]}
          data={labTestingData.map((row, index) => [
            <Icon
              icon="basil:edit-outline"
              className="cursor-pointer text-lg text-primary"
              onClick={() => {
                localStorage.setItem(
                  "qcLabTestingEditData",
                  JSON.stringify({
                    ...row,
                    editIndex: index,
                    isEdit: true,
                  }),
                );

                goTo(
                  "/manufacturing-module/quality-control-qc/qc-lab-testing-suite/create",
                );
              }}
            />,

            row.labTestId,

            row.batchLotId,

            row.materialName,

            row.testType,

            row.specificationLimit,

            row.resultValue,

            row.instrumentId,

            row.testingTime,

            <span
              className="px-2 py-1 text-[9px] rounded"
              style={
                ERROR_STATUS_STYLES[row.errorStatus] || {
                  backgroundColor: "#E5E7EB",
                  color: "#374151",
                }
              }
            >
              {row.errorStatus}
            </span>,

            <span
              className="px-2 py-1 text-[9px] rounded"
              style={
                TESTING_STATUS_STYLES[row.testingStatus] || {
                  backgroundColor: "#E5E7EB",
                  color: "#374151",
                }
              }
            >
              {row.testingStatus}
            </span>,

            row.testingStatus === "Testing" ? (
              <button
                className="px-2 py-1 text-xs text-white rounded"
                style={{
                  backgroundColor: "#14CCC3",
                }}
              >
                Enter Result
              </button>
            ) : (
              "-"
            ),
          ])}
        />
      </div>
    </div>
  );
}
