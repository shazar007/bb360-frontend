import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
// import { useAppNavigate } from "../../../../hooks/navigation";
export default function YieldReconciliation() {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const { goBack } = useAppNavigate();
  const openBatchDetail = () => {
    setSelectedBatch({
      batchId: "BAT-44X",
      product: "Paracetamol 500mg",
    });
  };

  const clickableCell = (value: React.ReactNode) => (
    <div onClick={openBatchDetail} className="cursor-pointer w-full h-full">
      {value}
    </div>
  );
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Yield Reconciliation
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <div className="relative w-f ull md:w-40">
            <input
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
            />

            <Icon
              icon="mynaui:search"
              className="absolute text-[20px] text-heading1/36 top-2.5 left-3"
            />
          </div>

          {/* <button
            onClick={() => setOpenFilter(!open Filter)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button> */}
          {selectedBatch && (
            <button
              onClick={() => {
                if (selectedBatch) {
                  setSelectedBatch(null);
                } else {
                  goBack();
                }
              }}
              className="flex items-center justify-center h-11 gap-2 px-8 text-white rounded-lg cursor-pointer bg-secondary"
            >
              <Icon icon="ion:play-back-outline" className="w-5 h-5" />
              Back
            </button>
          )}
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {!selectedBatch ? (
        <>
          <div className="flex flex-wrap gap-4 p-4 text-primary">
            Yield Reconciliation
          </div>

          <CustomTable
            norounded
            height="60vh"
            headers={[
              "View",
              "Batch ID",
              "Target Product",
              "Theoretical Wt",
              "Actual Wt",
              "Variance Wt",
              "Stabilization Status",
              "Data Source",
              "Verified By",
            ]}
            data={[
              [
                <Icon
                  icon="hugeicons:view"
                  className="text-lg cursor-pointer text-primary"
                  onClick={openBatchDetail}
                />,

                clickableCell("BAT-44X"),

                clickableCell("Paracetamol 500mg"),

                clickableCell("500 Kg"),

                clickableCell("491.50 Kg"),

                clickableCell("8.5 kg"),

                clickableCell("-1.70 % Deviation"),

                clickableCell("Packaging Line"),

                clickableCell("Sarah K."),
              ],
            ]}
          />
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 p-4 text-primary">
            {selectedBatch.batchId} / {selectedBatch.product}
          </div>

          <CustomTable
            norounded
            height="60vh"
            headers={[
              "Segments",
              "Material Code",
              "Item Name",
              "LOT / Batch Number",
              "Theoretical Wt",
              "Actual Wt",
              "Variance Wt",
              "Data Source",
              "Verified By",
            ]}
            data={[
              [
                "Inputs",
                "MAT-RAW-0042",
                "Lactose Monohydrate",
                "LOT-2026-90A",
                "250 Kg",
                "250 Kg",
                "0.0 Kg",
                "Weigh & Disp.",
                "Sarah K.",
              ],

              [
                "Inputs",
                "MAT-RAW-558kl",
                "Acetamido API",
                "LOT-2026-515B",
                "200 Kg",
                "198 Kg",
                "2.0 Kg",
                "Weigh & Disp.",
                "Bilal H.",
              ],

              [
                "Output",
                "SKU-TAB-PAR",
                "Paracetamol 400mg",
                "BAT-55258",
                "500 Kg",
                "491.50 Kg",
                "8.5 Kg",
                "Packaging Line",
                "Muzaffar A.",
              ],
            ]}
          />
        </>
      )}
    </div>
  );
}
