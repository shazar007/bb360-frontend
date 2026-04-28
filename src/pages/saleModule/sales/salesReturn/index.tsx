import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useEffect } from "react";
import { useAppNavigate } from "../../../../hooks/navigation";

export default function SalesReturn() {
  const { goTo } = useAppNavigate();

  useEffect(() => {
    document.title = "Sales Return — BB-360";
  }, []);

  return (
    <div className="mt-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Sales Return
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* SEARCH */}
          <div className="relative w-full md:w-60">
            <input
              placeholder="Search Distributors..."
              className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
            />
            <Icon
              icon="mynaui:search"
              className="absolute text-[20px] text-heading1/36 top-2.5 left-3"
            />
          </div>

          {/* FILTER */}
          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            <Icon icon="mage:filter" className="text-lg" />
            Filters
          </button>

          {/* RESET */}
          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            <Icon icon="ion:refresh-outline" className="text-lg" />
            Reset
          </button>

          {/* CREATE */}
          <button
            onClick={() => {
              goTo("/sale-module/sales/sales-return/create");
            }}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
          >
            <Icon icon="basil:add-outline" className="text-lg" />
            Create
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="pb-4 mt-2 bg-white rounded-2xl">
        <div className="flex justify-between items-center px-4.5 py-2">
          <p className="text-xs font-semibold text-primary">Sales_List</p>
        </div>

        <CustomTable
          norounded
          height="60vh"
          headers={[
            "Edit",
            "Select",
            "Invoice Number",
            "Distributor Code",
            "Distributor Name",
            "Licence Status",
            "Item Description",
            "Quantity (Pcs)",
            "Amount",
          ]}
          data={[
            [
              <Icon
                icon="qlementine-icons:menu-burger-16"
                className="text-lg cursor-pointer text-primary"
              />,
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-lg cursor-pointer text-primary"
              />,
              "INV-000255",
              "DIS-556",
              "Noor Sons",
              <div className="bg-[#228422]/12 w-max px-2 py-0.5 rounded-sm text-[#228422]">
                <p>Good</p>
              </div>,
              "Olive Oil 500ml, Desi Ghee 2Kg, Chia Seeds 500mg",
              "1,100",
              "420,256",
            ],
            [
              <Icon
                icon="qlementine-icons:menu-burger-16"
                className="text-lg cursor-pointer text-primary"
              />,
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-lg cursor-pointer text-primary"
              />,
              "INV-0002360",
              "DIS-662",
              "Al Ghani Traders",
              <div className="bg-[#F4E7A1]/40 w-max px-2 py-0.5 rounded-sm text-[#9C8A00]">
                <p>Near Expiry</p>
              </div>,
              "Shakar 500gm, Instant Talbina 1Kg, Chia Seeds 500mg",
              "840",
              "378,256",
            ],
          ]}
        />
      </div>
    </div>
  );
}
