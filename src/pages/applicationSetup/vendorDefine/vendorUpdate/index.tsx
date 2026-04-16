import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import CustomTable from "../../../../components/customTable";
import { useQuery } from "@tanstack/react-query";
import { updateDistributor } from "../../../../api/distributorServices";
import { notifyError, notifySuccess } from "../../../../components/toast";
import { SyncLoader } from "react-spinners";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { getAllVendors } from "../../../../api/vendorServices";

export default function VendorUpdate() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
    vendorCode: "",
    vendorName: "",
    vendorCategory: "",
    contactNumber: "",
    address: "",
    city: "",
    licenceNumber: "",
    licenceExpiryDate: "",
  });

  const menuRef = useRef<HTMLDivElement>(null);

  const {
    data: AllVendors,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getAllVendors"],
    queryFn: getAllVendors,

    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const tableData = AllVendors?.data?.vendors || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleEdit = (index: number) => {
    const item = tableData[index];

    setSelectedIndex(index);
    setForm({
      vendorCode: item.vendorCode || "",
      vendorName: item.vendorName || "",
      vendorCategory: item.vendorCategory || "",
      contactNumber: item.contactNumber || "",
      address: item.address || "",
      city: item.city || "",
      licenceNumber: item.licenceNumber || "",
      licenceExpiryDate: item.licenceExpiryDate || "",
    });

    setIsEdit(true);
    setOpenMenuIndex(null);
  };

  const closeModal = () => {
    setIsEdit(false);
    setSelectedIndex(null);
    setForm({
      vendorCode: "",
      vendorName: "",
      vendorCategory: "",
      contactNumber: "",
      address: "",
      city: "",
      licenceNumber: "",
      licenceExpiryDate: "",
    });
  };

  const handleChange = (name: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [name]: typeof value === "object" ? (value?.target?.value ?? "") : value,
    }));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();

    try {
      if (selectedIndex === null) return;

      const id = tableData[selectedIndex]?._id;
      if (!id) return notifyError("Invalid ID");

      setLoading(true);

      // await updateDistributor(id, form); //This will use for Api
      updateDistributor(id, {
        vendorCode: form.vendorCode,
        vendorName: form.vendorName,
        vendorCategory: form.vendorCategory,
        contactNumber: form.contactNumber,
        address: form.address,
        city: form.city,
        licenceNumber: form.licenceNumber,
        licenceExpiryDate: form.licenceExpiryDate,
      });
      notifySuccess("Updated successfully");

      await refetch();
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
              Data Upload / Vendor Update
            </p>
          </div>
        </div>

        <div className="pb-4 mt-2 bg-white rounded-2xl">
          <div className="flex justify-between items-center px-4.5 py-3">
            <p className="text-xs font-semibold text-primary">Vendor_List</p>
          </div>

          <CustomTable
            norounded
            loading={isLoading}
            height="60vh"
            headers={[
              "Edit",
              "Vendor Code",
              "Vendor Name",
              "Vendor Category",
              "Contact Number",
              "Address",
              "City",
              "Licence Number/Income Tax Number",
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
                      className="w-full px-2 py-1 text-left hover:bg-gray-100"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>,

              item.vendorCode,
              item.vendorName,
              item.vendorCategory,
              item.contactNumber,
              item.address,
              item.city,
              item.licenceNumber,
              item.licenceExpiryDate,
              <div
                className={`px-2 py-1 rounded-sm text-xs  w-fit
    ${
      item.licenceStatus === "Good"
        ? "bg-[#228422]/12 text-[#228422]"
        : item.licenceStatus === "Near Expiry"
          ? "bg-[#E6F200]/12 text-[#A89507]"
          : "bg-red-100 text-red-700"
    }`}
              >
                {item.licenceStatus}
              </div>,
            ])}
          />
        </div>
      </div>

      {isEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                Edit Vendor
              </h2>

              <button onClick={closeModal} className="text-xl cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="grid grid-cols-2 gap-4 p-6">
                <CustomInput
                  label="Vendor Code"
                  name="vendorCode"
                  value={form.vendorCode}
                  onChange={(val: any) => handleChange("vendorCode", val)}
                />

                <CustomInput
                  label="Vendor Name"
                  name="vendorName"
                  value={form.vendorName}
                  onChange={(val: any) => handleChange("vendorName", val)}
                />

                <CustomInput
                  label="Vendor Category"
                  name="vendorCategory"
                  value={form.vendorCategory}
                  onChange={(val: any) => handleChange("vendorCategory", val)}
                />

                <CustomInput
                  label="Contact Number"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={(val: any) => handleChange("contactNumber", val)}
                />

                <CustomInput
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={(val: any) => handleChange("address", val)}
                />

                <CustomInput
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={(val: any) => handleChange("city", val)}
                />

                <CustomInput
                  label="Licence Number/Income Tax Number"
                  name="licenceNumber"
                  value={form.licenceNumber}
                  onChange={(val: any) => handleChange("licenceNumber", val)}
                />

                <CustomDatePicker
                  label="Licence Expiry Date"
                  name="licenceExpiryDate"
                  value={form.licenceExpiryDate}
                  onChange={(val: any) =>
                    handleChange("licenceExpiryDate", val)
                  }
                />
              </div>

              <div className="flex justify-end p-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center h-10 gap-2 px-4 py-2 text-white rounded-md w-25 bg-primary"
                >
                  {loading ? (
                    <SyncLoader size={6} color="#fff" />
                  ) : (
                    <>
                      <Icon icon="mynaui:save" />
                      Save
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
