import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Venders() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Vendors — BB-360";
  }, []);
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Vendor / Define Vendor
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
            className="flex items-center justify-center w-full h-10 gap-2 text-sm bg-white rounded-md cursor-pointer md:w-27 text-heading1"
          >
            Action
            <Icon icon="weui:arrow-filled" className="text-lg rotate-90" />
          </button>
          <button
            onClick={() => {
              navigate("/purchase-module/vender-define/venders/upload");
            }}
            style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
          >
            {" "}
            <Icon icon="basil:add-outline" className="text-lg" />
            Upload
          </button>{" "}
          <button
            onClick={() => {
              navigate("/purchase-module/vender-define/venders/create");
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
      <div className="mt-2">
        <CustomTable
          height="60vh"
          headers={[
            "Edit",
            "Name",
            "Vendor Type",
            "Open Balance",
            "Phone",
            "Is Person",
            "City",
            "Country",
            "Email",
            "Currency",
          ]}
          data={[
            [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
              />,
              "Automobile Vendor Saudia",
              "Import",
              "100,000",
              "+966-56-4445013",
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-lg cursor-pointer text-heading1"
              />,
              "Jeddha",
              "Saudia Arabia",
              "automobilie@gmail.com",
              "Saudi Riyal",
            ],
          ]}
        />
      </div>
    </div>
  );
}
