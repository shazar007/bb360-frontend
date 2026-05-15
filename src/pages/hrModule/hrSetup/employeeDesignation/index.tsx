import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getAllEmployeeDesignation,
  updateEmployeeDesignation,
} from "../../../../api/hrServices";
import { useState } from "react";
import CustomInput from "../../../../components/customInput";
import { SyncLoader } from "react-spinners";
import { notifyError, notifySuccess } from "../../../../components/toast";

export default function EmployeeDesignation() {
  const { goTo } = useAppNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });
  const {
    data: getAllDesignation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllEmployeeDesignation"],
    queryFn: getAllEmployeeDesignation,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const allDesignation: any[] = getAllDesignation?.data?.data || [];
  const handleEdit = (item: any) => {
    console.log("EDIT ITEM:", item);
    const id = item._id;
    setFormData({
      id,
      name: item.name,
    });

    setOpenModal(true);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const response = await updateEmployeeDesignation(formData.id, {
        name: formData.name,
      });
      notifySuccess("Designation updated successfully");
      console.log(response);
      setOpenModal(false);
      refetch();
    } catch (error: any) {
      console.log(error);
      notifyError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Employee Designation
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
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

            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo("/hr-module/hr-setup/employee-designation/create");
              }}
              className="w-full md:w-30 flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-3  pb-3">
            <CustomTable
              loading={isLoading}
              height="60vh"
              headers={["Edit", "Designation Name"]}
              data={
                allDesignation?.map((item: any) => [
                  <Icon
                    icon="basil:edit-outline"
                    className="text-lg cursor-pointer text-primary"
                    onClick={() => handleEdit(item)}
                  />,
                  item?.name,
                ]) || []
              }
            />
          </div>
        </div>
      </div>{" "}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-120 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Update Designation
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <CustomInput
                type="text"
                label="Designation"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="border w-full p-3 rounded-md"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="bg-primary cursor-pointer text-white px-5 py-2 rounded-md mt-4 disabled:opacity-50"
                >
                  {loading ? (
                    <SyncLoader
                      color="#ffffff"
                      size={6}
                      speedMultiplier={0.6}
                    />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
