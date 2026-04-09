import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import CustomTable from "../../../../components/customTable";
import AddIDistributor from "../components/addDistributor";
export default function DistributorUpdate() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Data Upload / Distributor Update
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
          </div>
        </div>

        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-2">
            <p className="text-xs font-semibold text-primary">
              Distributor_List
            </p>
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
              "Contact Number",
              "Address",
              "City",
              "Licence Number",
              "Licence Expiry Date",
              "Licence Status",
            ]}
            data={[
              [
                <div className="relative" ref={menuRef}>
                  <Icon
                    icon="qlementine-icons:menu-burger-16"
                    className="text-lg cursor-pointer text-primary"
                    onClick={() =>
                      setOpenMenuIndex(openMenuIndex === 0 ? null : 0)
                    }
                  />

                  {openMenuIndex === 0 && (
                    <div className="absolute z-10 w-32 py-2 bg-white rounded-md shadow-md -right-15 top-6">
                      <button
                        className="w-full px-2 py-1 text-left cursor-pointer hover:bg-gray-100"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit Product
                      </button>
                      <button
                        className="w-full px-2 py-1 text-left text-red-600 cursor-pointer hover:bg-gray-100"
                        onClick={() => setIsEdit(true)}
                      >
                        Delete Distributor
                      </button>
                    </div>
                  )}
                </div>,

                <Icon
                  icon="fluent:checkbox-checked-16-regular"
                  className="text-lg cursor-pointer text-primary"
                />,
                <Icon
                  icon="f7:chevron-right-square"
                  className="text-lg cursor-pointer text-primary"
                />,
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                <div className="bg-[#228422]/12 w-max px-2 py-0.5 rounded-sm text-[#228422]">
                  <p>Good</p>
                </div>,
              ],
            ]}
          />
        </div>
      </div>
      {isEdit && <AddIDistributor close={() => setIsEdit(false)} />}
    </>
  );
}
