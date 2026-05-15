import { Icon } from "@iconify/react";
import CustomTable from "../../../components/customTable";
import CustomSelect from "../../../components/customSelect";
import CustomDatePicker from "../../../components/datePicker";
import { useAppNavigate } from "../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getAccountLedger } from "../../../api/ledgerServices";
import { getAllDistributor } from "../../../api/distributorServices";
import { getAllVendors } from "../../../api/vendorServices";
import { SyncLoader } from "react-spinners";

export default function AccountLedger() {
  const { goBack } = useAppNavigate();

  const [partyId, setPartyId] = useState<string>("");
  const [ledgerType, setLedgerType] = useState<string>("");
  const [filterLoading, setFilterLoading] = useState(false);
  const [fromDate, setFromDate] = useState("2026-05-01");
  const [toDate, setToDate] = useState("2026-05-10");

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
    ledgerType === "Vendor"
      ? vendors.map((item: any) => ({
          label: item.vendorName,
          value: item._id,
        }))
      : ledgerType === "Distributor"
        ? distributors.map((item: any) => ({
            label: item.distributorName,
            value: item._id,
          }))
        : [];

  const { data: ledgerData, isLoading } = useQuery({
    queryKey: ["account-ledger", partyId, fromDate, toDate],
    queryFn: () => {
      return getAccountLedger(partyId, fromDate, toDate);
    },
    enabled: !!partyId,
    placeholderData: undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const handleDateChange = (type: "from" | "to", date: any) => {
    setFilterLoading(true);
    const formatted = dayjs(date).format("YYYY-MM-DD");

    if (type === "from") setFromDate(formatted);
    else setToDate(formatted);

    setTimeout(() => setFilterLoading(false), 300);
  };
  const allLedgerEntries = ledgerData?.data?.ledger || [];

  useEffect(() => {
    if (!isLoading) {
      setFilterLoading(false);
    }
  }, [isLoading, ledgerData]);
  const isPartyLoading =
    ledgerType === "Vendor"
      ? !AllVendors
      : ledgerType === "Distributor"
        ? !AllDistributors
        : false;
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Account Ledger
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <button
            onClick={goBack}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>

          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:print-outline" className="w-5 h-5" />
            Print
          </button>
        </div>
      </div>

      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">Select Ledger</p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-50.25">
            <div className="space-y-2">
              <CustomSelect
                label="Ledger Type"
                options={[
                  { label: "Vendor", value: "Vendor" },
                  { label: "Distributor", value: "Distributor" },
                ]}
                value={ledgerType}
                onChange={(selectedOption: any) => {
                  const val = selectedOption?.value ?? selectedOption;
                  setLedgerType(val);

                  setPartyId("");
                }}
                placeholder="Vendors/Distributors"
              />

              <CustomSelect
                label="Select Party"
                options={partyOptions}
                value={partyId}
                disabled={isPartyLoading}
                placeholder={
                  isPartyLoading ? (
                    <SyncLoader size={6} color="#14CCC3" />
                  ) : ledgerType === "Vendor" ? (
                    "Select Vendor"
                  ) : (
                    "Select Distributor"
                  )
                }
                onChange={(opt: any) => {
                  const val = opt?.value ?? opt;
                  setPartyId(val);
                }}
              />
            </div>

            <div className="space-y-2">
              <CustomDatePicker
                label="From Date"
                value={fromDate}
                onChange={(date: any) => handleDateChange("from", date)}
              />

              <CustomDatePicker
                label="To Date"
                value={toDate}
                onChange={(date: any) => handleDateChange("to", date)}
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="bg-white rounded-2xl">
            <div className="p-4 border-b border-[#304250]/20">
              <p className="text-sm font-semibold text-primary">
                Account Ledger
              </p>
            </div>

            <CustomTable
              norounded
              loading={isLoading || filterLoading}
              headers={[
                "Date",
                "Voucher No.",
                "Account Name",
                "Description",
                "Debit",
                "Credit",
                "Balance",
              ]}
              data={
                allLedgerEntries.length
                  ? allLedgerEntries.map((item: any) => [
                      item?.date ? dayjs(item.date).format("DD-MMM-YYYY") : "-",
                      item?.voucherNo || "-",
                      item?.partyAccount?.vendorName ||
                        item?.partyAccount?.distributorName ||
                        "-",
                      item?.description || "-",
                      item?.debit || "0",
                      item?.credit || "0",
                      item?.balance || "0",
                    ])
                  : []
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
