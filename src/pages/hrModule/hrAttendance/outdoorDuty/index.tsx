import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import Filter from "../../../../components/customDatefilter";
import { useAppNavigate } from "../../../../hooks/navigation";
import { notifyError, notifySuccess } from "../../../../components/toast";
import CustomInput from "../../../../components/customInput";
import { SyncLoader } from "react-spinners";
import CustomSelectSearch from "../../../../components/customSelectSearch";
const dummyOutdoorDuty = [
  {
    id: 1,
    transactionNumber: "OUT-5589Ps",
    date: "21-May-2026",
    employeeName: "Bilal Hassan",
    department: "Sales",
    dutyType: "Survey",
    duration: "4hrs",
    location: "Local",
    status: "Approved",
  },
  {
    id: 2,
    transactionNumber: "OUT-5590Ps",
    date: "22-May-2026",
    employeeName: "Ali Khan",
    department: "HR",
    dutyType: "Meeting",
    duration: "2hrs",
    location: "City",
    status: "Pending",
  },
];
export default function OutdoorDuty() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { goTo } = useAppNavigate();
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["outdoor-duty"],
  //   queryFn: getOutdoorDuty,
  // });
  // const finalData = data && data.length > 0 ? data : dummyOutdoorDuty;
  const finalData = dummyOutdoorDuty;
  const handleEdit = (item: any) => {
    setFormData(item);
    setOpenEdit(true);
  };
  const handleUpdate = async () => {
    try {
      setLoading(true);

      // await updateOutdoorDuty(selectedItem.id, selectedItem);

      notifySuccess("Updated successfully");

      setOpenEdit(false);

      // refetch();
    } catch (error) {
      notifyError("Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              Outdoor Duty
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <div className="relative w-full md:w-40">
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
              onClick={() => setOpenFilter(!openFilter)}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-3 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
              <Icon
                icon="streamline-flex:credit-card-approved"
                className="w-5 h-5"
              />
              Approved Outdoor
            </button>
            <button
              onClick={() => {
                goTo("/hr-module/hr-attendance/outdoor-duty/create");
              }}
              className="flex items-center justify-center w-full h-10 gap-1 px-3 text-white rounded-md cursor-pointer md:w-auto bg-primary"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

        <div className="mt-3 bg-white rounded-2xl overflow-hidden">
          <CustomTable
            norounded
            height="60vh"
            headers={[
              "Edit",
              "Select",
              "Transaction Number",
              "Outdoor Duty Date",
              "Employee Name",
              "Department",
              "Duty Type",
              "Duration",
              "Location",
              "Status",
            ]}
            data={finalData.map((item: any) => [
              <Icon
                icon="basil:edit-outline"
                className="text-lg cursor-pointer text-primary"
                onClick={() => handleEdit(item)}
              />,
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-lg cursor-pointer text-primary"
              />,

              item.transactionNumber,
              item.date,
              item.employeeName,
              item.department,
              item.dutyType,
              item.duration,
              item.location,

              <div
                className={`px-2 py-1 text-xs rounded w-fit ${
                  item.status === "Approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status}
              </div>,
            ])}
          />
        </div>
      </div>
      {openEdit && formData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3 max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-sm font-semibold text-heading1">
                Update Outdoor Duty
              </h2>

              <button
                onClick={() => setOpenEdit(false)}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 p-4 gap-y-3 gap-x-5 md:grid-cols-2">
              <CustomInput
                label="Transaction Number"
                value={formData.transactionNumber}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    transactionNumber: e.target.value,
                  })
                }
              />

              <CustomSelectSearch
                label="Employee Name"
                value={formData.employeeName}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    employeeName: e.target.value,
                  })
                }
              />

              <CustomSelectSearch
                label="Department"
                value={formData.department}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                  })
                }
              />

              <CustomInput
                label="Duty Type"
                value={formData.dutyType}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    dutyType: e.target.value,
                  })
                }
              />

              <CustomInput
                label="Duration"
                value={formData.duration}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    duration: e.target.value,
                  })
                }
              />

              <CustomInput
                label="Location"
                value={formData.location}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    location: e.target.value,
                  })
                }
              />

              <CustomInput
                label="Date"
                value={formData.date}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
              />

              <CustomInput
                label="Status"
                value={formData.status}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex gap-2 justify-end p-4">
              <button
                className="px-4 py-2 bg-primary cursor-pointer text-white rounded"
                onClick={handleUpdate}
              >
                {loading ? (
                  <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
