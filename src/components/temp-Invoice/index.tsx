import React, { forwardRef } from "react";
import logo from "../../assets/Nourish.png";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
export const InvoiceTemplate = forwardRef(({ data }: any, ref: any) => {
  if (!data) return null;

  return (
    <div
      className="flex flex-col h-screen montserrat justify-between items-center"
      ref={ref}
    >
      <div
        className="p-10 bg-white montserrat text-black font-sans"
        style={{ width: "210mm" }}
      >
        <div className="flex gap-50  items-center border-b border-[#636363]  pb-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-9 w-9" />
            <p className="text-xl text-[#304250] science font-semibold">
              Organic Nourish Valley
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="border-l border-[#02070B] h-10"></div>
            <div className="text-right w-12">
              <h2 className="text-xl syncopate font-bold tracking-widest">
                RECEIVING CHALLAN
              </h2>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 flex justify-between">
          <div>
            <p className="font-bold montserrat">RECEIVING TO:</p>
            <p className="text-xs mt-1">{data.partyAccount?.distributorName}</p>

            <p className="text-xs mt-1">{data.partyAccount?.contactNumber}</p>
            <p className="text-xs mt-1">{data.deliveryAddress}</p>
          </div>
          <div className="text-right text-[#000000] flex flex-col justify-between">
            <p>INV #{data.poNumber || data.prNumber}</p>
            <p className="text-sm font-bold mt-4">
              Date:{" "}
              {dayjs(data.createdAt).isValid()
                ? dayjs(data.createdAt).format("DD-MMM-YYYY")
                : "-"}
            </p>
          </div>
        </div>

        <table className="w-full mt-5 border-collapse border-[#636363]">
          <thead>
            <tr className="border-t pt-10 border-gray-200 uppercase text-sm">
              <th className="text-left py-2 text-sm font-bold syncopate">
                Product
              </th>
              <th className="text-left py-2 text-sm font-bold syncopate">
                Batch
              </th>
              <th className="text-left py-2 text-sm font-bold syncopate">
                Expiry
              </th>
              <th className="text-left py-2 text-sm font-bold syncopate">
                Qty.
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items?.map((item: any, idx: number) => (
              <tr
                key={idx}
                className="border-b text-sm text-black border-gray-100"
              >
                <td>{item.itemName}</td>
                <td className="py-3">{item.batchNumber}</td>
                <td>
                  {" "}
                  {dayjs(item.expiryDate).isValid()
                    ? dayjs(item.expiryDate).format("DD-MMM-YYYY")
                    : "-"}
                </td>{" "}
                <td>{item.quantity || item.orderedQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <div className="flex gap-10  pt-2">
            <span className="font-bold text-sm">Total</span>
            <span className="font-bold text-sm ">
              {data.items?.reduce(
                (acc: number, curr: any) =>
                  acc + curr.quantity || curr.orderedQty,
                0,
              )}
            </span>
          </div>
        </div>

        <div className="mt-20">
          <div className="w-40 border-t text-sm font-medium border-black text-center pt-2">
            <p className="text-sm">Approval Signature</p>
          </div>
        </div>
      </div>
      <div
        className="py-4 px-10 flex justify-between items-center w-full"
        style={{
          background:
            "linear-gradient(270deg, #1B8C3A 0%, #265964 52.64%, #7B5427 79.12%, #F69D37 100%)",
        }}
      >
        <p className="text-sm text-white">organicnourishvalley.com</p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white">
            <Icon icon="basil:facebook-solid" className="text-black text-sm" />
          </div>{" "}
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white">
            <Icon icon="ri:twitter-fill" className="text-black text-sm" />
          </div>{" "}
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white">
            <Icon
              icon="grommet-icons:instagram"
              className="text-black text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
