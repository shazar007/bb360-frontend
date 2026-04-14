import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import CustomTable from "../../../../components/customTable";
import DistributorModel from "../components/distributorModel";
import { useQuery } from "@tanstack/react-query";
import {
  getAllDistributor,
  updateDistributor,
} from "../../../../api/distributorServices";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";

export default function DistributorUpdate() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const { data: AllDistributors, refetch } = useQuery({
    queryKey: ["getAllDistributor"],
    queryFn: getAllDistributor,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const tableData = AllDistributors?.data?.distributors || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // OPEN MENU ONLY
  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // OPEN EDIT MODAL
  const handleEdit = (index: number) => {
    setSelectedIndex(index);
    setIsEdit(true);
    setOpenMenuIndex(null);
  };

  const closeModal = () => {
    setIsEdit(false);
    setSelectedIndex(null);
  };

  // SAVE API CALL
  const handleSave = async (values: any) => {
    try {
      if (selectedIndex === null) return;

      const id = tableData[selectedIndex]?._id;
      if (!id) return notifyError("Invalid ID");

      setLoading(true);

      await updateDistributor(id, values);

      notifySuccess("Updated successfully");

      await refetch(); // refresh data
      closeModal();
    } catch (err: any) {
      notifyError(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

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
        </div>

        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-3">
            <p className="text-xs font-semibold text-primary">
              Distributor_List
            </p>
          </div>

          <CustomTable
            norounded
            height="60vh"
            headers={[
              "Edit",
              "Distributor Code",
              "Distributor Name",
              "Contact Number",
              "Address",
              "City",
              "Licence Number",
              "Licence Expiry Date",
              "Licence Status",
            ]}
            data={tableData.map((item: any, index: number) => [
              <div className="relative">
                <Icon
                  icon="qlementine-icons:menu-burger-16"
                  className="text-lg cursor-pointer text-primary"
                  onClick={() => toggleMenu(index)}
                />

                {openMenuIndex === index && (
                  <div className="absolute z-10 w-32 py-2 bg-white rounded-md shadow-md -right-25 top-6">
                    <button
                      className="w-full px-2 py-1 text-left cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleEdit(index);
                        setIsEdit;
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>,

              item.distributorCode,
              item.distributorName,
              item.contactNumber,
              item.address,
              item.city,
              item.licenceNumber,
              item.licenceExpiryDate,
              item.licenceStatus,
            ])}
          />
        </div>
      </div>

      {isEdit && selectedIndex !== null && (
        <DistributorModel
          close={closeModal}
          data={tableData[selectedIndex]} // ✅ prefilled
          onSave={handleSave}
          loading={loading}
        />
      )}
    </>
  );
}
