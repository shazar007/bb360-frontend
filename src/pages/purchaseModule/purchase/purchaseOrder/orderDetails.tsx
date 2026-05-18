import CustomTable from "../../../../components/customTable";
import { Icon } from "@iconify/react";
import CustomInput from "../../../../components/customInput";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useLocation } from "react-router-dom";

export default function OrderDetails() {
  const { goBack } = useAppNavigate();
  const location = useLocation();
  const receivedData = location.state?.item;
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Purchase / Purchase Order Details
            </p>
          </div>

          <div className="flex flex-wrap items-center w-full gap-2 md:w-auto">
            <button
              onClick={goBack}
              style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
              className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-secondary md:w-27"
            >
              {" "}
              <Icon icon="ion:play-back-outline" className="text-lg" />
              Back
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
            <p className="text-xs font-semibold text-heading1">
              Purchase Order Details
            </p>
          </div>
          <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-29.25">
            <div className="space-y-2">
              <CustomInput
                label="Purchase Order "
                value={receivedData.poNumber}
                placeholder="TO BE GENERATE"
                disabled
              />
              <CustomInput label="Date" value="2026-03-01" />
            </div>
            <div className="space-y-2">
              <CustomInput
                label="Party Account"
                placeholder="Select Party"
                value={receivedData.partyAccount.vendorName || ""}
              />
              <CustomInput
                label="Party Reference"
                value={receivedData.partyAccount.vendorCategory || ""}
              />
            </div>
            <div className="space-y-2">
              <CustomInput
                label="Delivery Address"
                placeholder="Address"
                value={receivedData.deliveryAddress}
              />
              <CustomInput label="Type" value={receivedData.type} />
            </div>{" "}
            <div className="space-y-2">
              <CustomInput
                label="Advance Payment"
                value={receivedData.advanceAmount}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center p-4 mt-3 bg-white rounded-2xl">
          <div className="flex items-center gap-8 overflow-auto md:w-full w-90">
            <p className="text-sm">Order Details</p>
          </div>
        </div>
        <div>
          <CustomTable
            norounded
            headers={[
              "Select",
              "Edit",
              "Item Code",
              "Item Description",
              "Item Category",
              "UOM",
              "Quantity ",
              "Purchase Rate",
              "Amount",
            ]}
            data={receivedData.items.map((item: any) => [
              <Icon
                icon="fluent:checkbox-checked-16-regular"
                className="text-xl text-primary"
              />,
              <Icon
                icon="qlementine-icons:menu-burger-16"
                className="text-xl text-primary"
              />,
              item.itemCode,
              item.itemName,
              item.itemCategory,
              item.uom || "-",
              item.quantity || "-",
              item.purchaseRate || "-",
              item.amount || "-",
            ])}
          />
        </div>
      </div>
    </>
  );
}
