import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../components/customTable";
import CustomSelect from "../../../components/customSelect";
import CustomInput from "../../../components/customInput";
import CustomDatePicker from "../../../components/datePicker";
import CustomTextarea from "../../../components/customTextarea";
import { notifyError, notifySuccess } from "../../../components/toast";
import { addDebitCreaitNotes } from "../../../api/ledgerServices";
import type { AxiosError } from "axios";
import { getAllDistributor } from "../../../api/distributorServices";
import { useQuery } from "@tanstack/react-query";
import { getAllVendors } from "../../../api/vendorServices";
import { SyncLoader } from "react-spinners";

export default function DebitCreditNote() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    type: "",
    partyType: "",
    partyAccount: "",
    referenceId: null,
    amount: "",
    description: "",
  });
  const isEmpty = (value: any) => !value || value.toString().trim() === "";

  const { data: AllDistributors } = useQuery({
    queryKey: ["getAllDistributor"],
    queryFn: getAllDistributor,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const { data: AllVendors } = useQuery({
    queryKey: ["getAllVendors"],
    queryFn: getAllVendors,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const vendors = AllVendors?.data?.vendors || [];
  const distributors = AllDistributors?.data?.distributors || [];

  const partyOptions =
    formData.partyType === "Vendor"
      ? vendors.map((item: any) => ({
          label: item.vendorName,
          value: item._id,
        }))
      : formData.partyType === "Distributor"
        ? distributors.map((item: any) => ({
            label: item.distributorName,
            value: item._id,
          }))
        : [];
  const resetForm = () => {
    setFormData({
      date: "",
      type: "",
      partyType: "",
      partyAccount: "",
      referenceId: null,
      amount: "",
      description: "",
    });
  };
  const handleSave = async () => {
    const {
      date,
      type,
      partyType,
      partyAccount,
      referenceId,
      amount,
      description,
    } = formData;

    if (
      isEmpty(date) ||
      isEmpty(type) ||
      isEmpty(partyType) ||
      isEmpty(partyAccount) ||
      isEmpty(amount) ||
      isEmpty(description)
    ) {
      notifyError("All fields are required");
      return;
    }

    const payload = {
      date,
      description,
      partyAccount,
      partyType,
      referenceId,
      debit: type === "Debit" ? Number(amount) : 0,
      credit: type === "Credit" ? Number(amount) : 0,
    };

    try {
      setLoading(true);

      await addDebitCreaitNotes(payload);

      notifySuccess("Saved Successfully");
      resetForm();
    } catch (error: unknown) {
      const err = error as AxiosError<any>;
      notifyError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const isPartyLoading =
    formData.partyType === "Vendor"
      ? !AllVendors
      : formData.partyType === "Distributor"
        ? !AllDistributors
        : false;
  const handlePartyAccountClick = () => {
    if (!formData.partyType) {
      notifyError("Please select Party Type first");
      return;
    }
  };
  type PartyType = "Vendor" | "Distributor";
  const partyNameMap: Record<PartyType, Record<string, string>> = {
    Vendor: Object.fromEntries(vendors.map((v: any) => [v._id, v.vendorName])),
    Distributor: Object.fromEntries(
      distributors.map((d: any) => [d._id, d.distributorName]),
    ),
  };
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Debit / Credit Note
          </p>
        </div>
        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-secondary">
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center w-full h-10 gap-2 px-6 text-white rounded-md cursor-pointer md:w-auto bg-primary"
          >
            {loading ? (
              <SyncLoader size={8} color="#ffffff" />
            ) : (
              <>
                <Icon icon="mynaui:save" className="w-5 h-5" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">Select_Data</p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-x-10 lg:gap-y-5 2xl:gap-50.25">
            <div className="space-y-2">
              <CustomDatePicker
                label="Date"
                value={formData.date}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    date: val,
                  })
                }
              />
              <CustomSelect
                label="Type"
                placeholder="Debit / Credit"
                value={formData.type}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    type: val,
                  })
                }
                options={[
                  {
                    label: "Debit",
                    value: "Debit",
                  },
                  {
                    label: "Credit",
                    value: "Credit",
                  },
                ]}
              />
            </div>
            <div className="space-y-2">
              <CustomSelect
                label="Party Type"
                value={formData.partyType}
                options={[
                  { label: "Vendor", value: "Vendor" },
                  { label: "Distributor", value: "Distributor" },
                ]}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    partyType: val,
                    partyAccount: "",
                  })
                }
              />

              <CustomSelect
                label="Party Account"
                options={partyOptions}
                onMenuOpen={handlePartyAccountClick}
                value={formData.partyAccount}
                disabled={isPartyLoading}
                placeholder={
                  isPartyLoading ? (
                    <SyncLoader size={6} color="#14CCC3" />
                  ) : (
                    "Select Party"
                  )
                }
                onChange={(opt: any) =>
                  setFormData({
                    ...formData,
                    partyAccount: opt?.value ?? opt,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <CustomInput
                label="Reference Id"
                placeholder="INC22584 (optional)"
                value={formData.referenceId}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    referenceId: e.target.value,
                  })
                }
              />
              <CustomInput
                label="Amount"
                placeholder="1000"
                value={formData.amount}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    amount: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <CustomTextarea
                label="Description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <CustomTable
            height="auto"
            norounded
            headers={[
              "Date",
              "Type",
              "Party Type",
              "Party Account",
              "Reference",
              "Description",
              "Amount",
            ]}
            data={[
              [
                formData.date || "-",
                formData.type || "-",
                formData.partyType || "-",
                partyNameMap[formData.partyType as keyof typeof partyNameMap]?.[
                  formData.partyAccount
                ] || "-",
                formData.referenceId || "-",
                formData.description || "-",
                formData.amount || "-",
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
