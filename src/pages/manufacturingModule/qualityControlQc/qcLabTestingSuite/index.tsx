import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
export default function QcLabTestingSuite() {
  const [openFilter, setOpenFilter] = useState(false);
  const { goTo } = useAppNavigate();
  const [samplingData, setSamplingData] = useState<any[]>([]);

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("samplingTableData") || "[]",
    );
    const sampleData = [
      {
        samplingId: "SMP-2026-02",
        materialName: "Lactose Mono",
        vendorLotId: "LOT-2026-90A",
        totalMaterial: "10,000 Kg",
        sampleWt: "50 gm",
        storageState: "Dry Space",
        targetLab: "QC-Micro Lab",
      },
      {
        samplingId: "SMP-2026-04",
        materialName: "Liquid API Base",
        vendorLotId: "LOT-2026-44X",
        totalMaterial: "6 Totes",
        sampleWt: "500 ml",
        storageState: "Cold Freezer",
        targetLab: "QC-Chemical Lab",
      },
    ];

    setSamplingData([...sampleData, ...savedData]);
  }, []);

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
              localStorage.removeItem("samplingEditData");

              goTo(
                "/manufacturing-module/quality-control-qc/sampling-operations/create",
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
          data={samplingData.map((row, index) => [
            <Icon
              icon="basil:edit-outline"
              className="cursor-pointer text-lg text-primary"
              onClick={() => {
                localStorage.setItem(
                  "samplingEditData",
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

            row.samplingId,
            row.materialName,
            row.vendorLotId,
            row.totalMaterial,
            row.sampleWt,
            row.storageState,
            row.targetLab,
          ])}
        />
      </div>
    </div>
  );
}
