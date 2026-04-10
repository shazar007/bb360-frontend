import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DistributorInvoice() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Distributor Invoice — BB-360";
  }, []);
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Distributor Invoice
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full md:w-60">
            <input
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
            />
            <Icon
              icon="mynaui:search"
              className="absolute text-[20px] text-heading1/36 top-2.5 left-3"
            />
          </div>
          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            {" "}
            <Icon icon="mage:filter" className="text-lg" />
            Filters
          </button>{" "}
          <button
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            {" "}
            <Icon icon="ion:refresh-outline" className="text-lg" />
            Reset
          </button>
          <button
            onClick={() => {
              navigate("/sale-module/sales/distributor-invoice/create");
            }}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-27"
          >
            {" "}
            <Icon icon="basil:add-outline" className="text-lg" />
            Create
          </button>
        </div>
      </div>

      <div className="pb-4 mt-2 bg-white rounded-2xl">
        <div className="flex justify-between items-center px-4.5 py-2">
          <p className="text-xs font-semibold text-primary">Invoice_List</p>
          <div className="flex items-center gap-2">
            <button className="h-8.5 w-8.5 text-white rounded-md cursor-pointer bg-[#FF0000] flex items-center justify-center">
              <Icon icon="proicons:delete" className="text-xl" />
            </button>
          </div>
        </div>
        <CustomTable
          norounded
          height="60vh"
          headers={[
            "Edit",
            "Select",
            "Distributor Code",
            "Distributor Name",
            "Licence Status",
            "Invoice Number",
            "Item Description",
            "Quantity ( Pcs )",
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
              "DIS-556",
              "Noor Sons",
              <div className="bg-[#228422]/12 w-max px-2 py-0.5 rounded-sm text-[#228422]">
                <p>Good</p>
              </div>,
              "INV-000255",
              "Olive Oil 500ml, Desi Ghee 2Kg, Chia Seeds 500mg",
              "1,100",
              "420,256",
            ],
          ]}
        />
      </div>
    </div>
  );
}
