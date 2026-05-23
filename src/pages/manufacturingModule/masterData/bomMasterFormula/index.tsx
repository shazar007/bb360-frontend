import { Icon } from "@iconify/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import { getAllBillOfMaterial } from "../../../../api/manufacturingSerives";
import { useNavigate } from "react-router-dom";


export default function BomMasterFormula() {
  const [openFilter, setOpenFilter] = useState(false);
  const { goTo } = useAppNavigate();
  const navigate = useNavigate();

  /* =========================
     API CALL
  ========================= */

  const { data, isLoading } = useQuery({
    queryKey: ["getAllBomMasterFormula"],
    queryFn: getAllBillOfMaterial,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const bomList = data?.data || [];

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

          <p className="text-base font-semibold md:text-lg text-heading1">
            Bill Of Material (BOM)
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
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 text-white shadow md:w-auto"
          >
            <Icon icon="mage:filter" className="h-5 w-5" />
            Filters
          </button> */}

          <button
            onClick={() =>
              goTo(
                "/manufacturing-module/master-data/bom-master-formula/create"
              )
            }
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-white md:w-auto"
          >
            <Icon icon="basil:add-outline" className="h-5 w-5" />
            Create
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* TABLE */}
      <div className="mt-3 overflow-hidden rounded-2xl bg-white">
        <CustomTable
          loading={isLoading}
          norounded
          height="60vh"
          headers={[
            "Edit",
            "Select",
            "Formula ID",
            "Product Name",
            "Batch Size",
            "Target Yield %",
            "Total Process Steps",
            "Last Modified",
            "Workflow State",
          ]}
          data={bomList.map((item: any) => [
            <Icon
              icon="basil:edit-outline"
              className="cursor-pointer text-lg text-primary"
               onClick={() =>
                navigate(
                  "/manufacturing-module/master-data/bom-master-formula/create",
                  {
                    state: { item },
                  }
                )
              }
            />,

            <Icon
              icon="fluent:checkbox-checked-16-regular"
              className="cursor-pointer text-lg text-primary"
            />,

            item.formulaId || "-",
            item.productName || "-",
            item.batchSize || "-",
            item.targetYield || "-",
            item.totalSteps || "-",
            item.lastModified || "-",

            <span
              className={`px-2 py-1 rounded-md text-xs font-medium`}
              style={{
                backgroundColor:
                  item.workflowState === "Approved"
                    ? "#00F2001F"
                    : "#F2F2001F",
                color:
                  item.workflowState === "Approved"
                    ? "#1E9B1E"
                    : "#9B8A1E",
              }}
            >
              {item.workflowState || "-"}
            </span>,
          ])}
        />
      </div>
    </div>
  );
}