import { SyncLoader } from "react-spinners";
import CustomTable from "../../../../components/customTable";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../../../components/toast";
import {
  addJobLocations,
  getAllJobLocations,
  updateJobLocationsStatus,
} from "../../../../api/classificationServices";
import CustomInput from "../../../../components/customInput";
export default function JobLocations() {
  const [confirm, setConfirm] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);

  const [newStatus, setNewStatus] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const {
    data: getJobLocations,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllJobLocations"],
    queryFn: getAllJobLocations,
  });
  const AllJobLocations: any[] = getJobLocations?.data?.data || [];
  const handleStatusChange = (item: any) => {
    setSelectedItem(item);
    setNewStatus(!item.isActive);
    setConfirm(true);
  };
  const handleConfirmUpdate = async () => {
    try {
      setLoading(true);

      await updateJobLocationsStatus(selectedItem._id, {
        isActive: newStatus,
      });
      notifySuccess("Status updated successfully");
      setConfirm(false);
      refetch();
    } catch (error: any) {
      notifyError(error?.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };
  const { mutate: createLocation, isPending: createLoading } = useMutation({
    mutationFn: addJobLocations,
    onSuccess: () => {
      notifySuccess("Job location created successfully");
      setOpenModel(false);
      setLocationName("");
      refetch();
    },
    onError: (error: any) => {
      notifyError(
        error?.response?.data?.message || "Failed to create job location",
      );
    },
  });

  const handleSave = () => {
    if (!locationName.trim()) {
      notifyError("Job location name is required");
      return;
    }
    createLocation({ name: locationName });
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Job Locations
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
            </button>{" "}
            <button
              onClick={() => {
                setOpenModel(true);
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-3">
            <p className="text-xs font-semibold text-primary">
              Job Locations_List
            </p>
          </div>
          <CustomTable
            norounded
            loading={isLoading}
            height="auto"
            headers={["Job Location Name", "Status"]}
            data={AllJobLocations.map((job) => {
              return [
                job.name || "-",

                <Icon
                  icon={job.status ? "fa:toggle-on" : "fa:toggle-off"}
                  className={`cursor-pointer text-2xl ${
                    job.status ? "text-primary" : "text-gray-400"
                  }`}
                  onClick={() => handleStatusChange(job)}
                />,
              ];
            })}
          />
        </div>
      </div>
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p onClick={() => setConfirm(false)} className="cursor-pointer">
                {" "}
                ✕
              </p>
            </div>
            <div className="mx-auto mt-4 w-80">
              <p className="text-2xl font-semibold text-center">
                {" "}
                Change Status
              </p>
              <p className="text-center text-heading1">
                Are you sure you want to change status to{" "}
                <span className="font-semibold">
                  {newStatus ? "Active" : "Inactive"}
                </span>
                ?
              </p>
            </div>

            <div className="flex justify-between gap-2 p-4 pt-0 mt-5">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  boxShadow: "0px 1px 12px 0px #0000001F",
                }}
                className="h-10 text-white rounded-md cursor-pointer w-25 bg-primary"
                onClick={handleConfirmUpdate}
              >
                {loading ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full mx-3  max-w-150 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Add Job Location
              </h2>

              <button
                onClick={() => {
                  setOpenModel(false);
                }}
                className="text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <CustomInput
                label="Job Location Name"
                placeholder="Enter Job Location Name"
                value={locationName}
                onChange={(e: any) => setLocationName(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={handleSave}
                  className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary cursor-pointer text-white rounded-md  shadow-[0_1px_12px_#0000001F] focus:outline-none"
                >
                  {createLoading ? (
                    <SyncLoader
                      color="#ffffff"
                      size={6}
                      speedMultiplier={0.6}
                    />
                  ) : (
                    "Save"
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
