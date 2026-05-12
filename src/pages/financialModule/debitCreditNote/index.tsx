import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomTable from "../../../components/customTable";
import CustomSelect from "../../../components/customSelect";
import CustomInput from "../../../components/customInput";
import CustomDatePicker from "../../../components/datePicker";
import CustomTextarea from "../../../components/customTextarea";
import { notifyError, notifySuccess } from "../../../components/toast";
import { addDebitCreaitNotes } from "../../../api/ledgerServices";

export default function DebitCreditNote() {
  const [formData, setFormData] = useState({
    date: "",
    type: "",
    partyType: "",
    partyAccount: "",
    referenceNumber: "",
    amount: "",
    description: "",
  });
  const handleSave = async () => {
    const {
      date,
      type,
      partyType,
      partyAccount,
      referenceNumber,
      amount,
      description,
    } = formData;
    if (
      !date ||
      !type ||
      !partyType ||
      !partyAccount ||
      !referenceNumber ||
      !amount ||
      !description
    ) {
      notifyError("All fields are required");
      return;
    }
    const payload = {
      date,
      type,
      partyType,
      partyAccount,
      referenceNumber,
      amount: Number(amount),
      description,
    };
    try {
      addDebitCreaitNotes(payload);
      console.log("🚀 ~ payload:", payload);
      notifySuccess("Saved Successfully");
      setFormData({
        date: "",
        type: "",
        partyType: "",
        partyAccount: "",
        referenceNumber: "",
        amount: "",
        description: "",
      });
    } catch (error: any) {
      console.log(error);
      notifyError(error?.response?.data?.message || "Something went wrong");
    }
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
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer">
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>
          <button
            onClick={handleSave}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer"
          >
            <Icon icon="mynaui:save" className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>
      <div className="bg-bgprimary rounded-2xl mt-3">
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
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    partyType: val,
                  })
                }
                options={[
                  {
                    label: "Vendor",
                    value: "Vendor",
                  },
                  {
                    label: "Distributor",
                    value: "Distributor",
                  },
                ]}
                placeholder="Vendor / Distributor"
              />
              <CustomInput
                label="Party Account"
                placeholder="Noorsons Distributor"
                value={formData.partyAccount}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    partyAccount: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <CustomInput
                label="Reference Number"
                placeholder="INC22584"
                value={formData.referenceNumber}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    referenceNumber: e.target.value,
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
                formData.partyAccount || "-",
                formData.referenceNumber || "-",
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
