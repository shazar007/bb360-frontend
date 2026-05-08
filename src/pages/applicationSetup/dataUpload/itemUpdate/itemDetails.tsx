import { useLocation } from "react-router-dom";
import CustomTable from "../../../../components/customTable";
import dayjs from "dayjs";
import CustomInput from "../../../../components/customInput";

export default function ItemDetails() {
  const location = useLocation();

  const { rowData } = (location.state as { rowData: any }) || {};
  console.log("🚀 ~ rowData:", rowData?.batches);

  return (
    <div className="mt-8">
      <div className="mt-3">
        <div className="bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
            <p className="text-xs font-semibold text-heading1">
              Products Details
            </p>
          </div>
          <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10 lg:gapx-x-29.25 gap-y-4">
            <CustomInput
              label="Product Code"
              value={rowData?.itemCode}
              disabled
            />{" "}
            <CustomInput
              label="Product Name"
              value={rowData?.itemName}
              disabled
            />
            <CustomInput
              label="Item Category"
              placeholder="Enter Advance Amount"
              value={rowData?.itemCategory}
              disabled
            />
            <CustomInput
              label="Units of Measure (UOM)"
              className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              value={rowData?.uom}
              disabled
            />{" "}
            <CustomInput
              label="T.P"
              className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              value={rowData?.tp}
              disabled
            />{" "}
            <CustomInput
              label="M.R.P"
              className="w-full h-10 px-3 rounded-md bg-[#ECF0F4]"
              value={rowData?.mrp}
              disabled
            />
          </div>
        </div>
      </div>{" "}
      <div className="mt-3 bg-white rounded-2xl">
        <div>
          {" "}
          <p className="p-3 px-4 text-xs cursor-pointer text-primary">
            {" "}
            Products Batches
          </p>
        </div>
        <CustomTable
          norounded
          noPagination
          height="30vh"
          headers={[
            "Batch Number",
            "Expiry Date",
            "Receiving Date",
            "Balance",
            "Status",
          ]}
          data={
            rowData?.batches?.map((batch: any) => [
              batch.batchNumber,
              dayjs(batch.expiryDate).format("DD-MMM-YYYY"),
              dayjs(batch.receivingDate).format("DD-MMM-YYYY"),
              batch.balance || "-",
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  batch.status === "Near Expiry"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {batch.status}
              </span>,
            ]) || []
          }
        />
      </div>{" "}
    </div>
  );
}
