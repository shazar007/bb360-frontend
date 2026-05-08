import { forwardRef } from "react";
import logo from "../../assets/Nourish.png";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
export const InvoiceTemplate = forwardRef(({ data }: any, ref: any) => {
  if (!data) return null;

  return (
    <div
      className="flex flex-col items-center justify-between h-screen montserrat"
      ref={ref}
    >
      <div
        className="p-10 font-sans text-black bg-white montserrat"
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
            <div className="w-12 text-right">
              <h2 className="text-xl font-bold tracking-widest syncopate">
                RECEIVING CHALLAN
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div>
            <p className="font-bold montserrat">RECEIVING TO:</p>
            <p className="mt-1 text-xs">{data.partyAccount?.distributorName}</p>

            <p className="mt-1 text-xs">{data.partyAccount?.contactNumber}</p>
            <p className="mt-1 text-xs">{data.deliveryAddress}</p>
          </div>
          <div className="text-right text-[#000000] flex flex-col justify-between">
            <p>INV #{data.poNumber || data.prNumber}</p>
            <p className="mt-4 text-sm font-bold">
              Date:
              {dayjs(data.createdAt).isValid()
                ? dayjs(data.createdAt).format("DD-MMM-YYYY")
                : "-"}
            </p>
          </div>
        </div>

        <table className="w-full mt-5 border-collapse border-[#636363]">
          <thead>
            <tr className="pt-10 text-sm uppercase border-t border-gray-200">
              <th className="py-2 text-sm font-bold text-left syncopate">
                Product
              </th>
              <th className="py-2 text-sm font-bold text-left syncopate">
                Batch
              </th>
              <th className="py-2 text-sm font-bold text-left syncopate">
                Expiry
              </th>
              <th className="py-2 text-sm font-bold text-left syncopate">
                Qty.
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items?.map((item: any, idx: number) => (
              <tr
                key={idx}
                className="text-sm text-black border-b border-gray-100"
              >
                <td>{item.itemName}</td>
                <td className="py-3">{item.batchNumber}</td>
                <td>
                  {dayjs(item.expiryDate).isValid()
                    ? dayjs(item.expiryDate).format("DD-MMM-YYYY")
                    : "-"}
                </td>
                <td>{item.quantity || item.orderedQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <div className="flex gap-10 pt-2">
            <span className="text-sm font-bold">Total</span>
            <span className="text-sm font-bold ">
              {data.items?.reduce(
                (acc: number, curr: any) =>
                  acc + curr.quantity || curr.orderedQty,
                0,
              )}
            </span>
          </div>
        </div>

        <div className="mt-20">
          <div className="w-40 pt-2 text-sm font-medium text-center border-t border-black">
            <p className="text-sm">Approval Signature</p>
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-between w-full px-10 py-4"
        style={{
          background:
            "linear-gradient(270deg, #1B8C3A 0%, #265964 52.64%, #7B5427 79.12%, #F69D37 100%)",
        }}
      >
        <p className="text-sm text-white">organicnourishvalley.com</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
            <Icon icon="basil:facebook-solid" className="text-sm text-black" />
          </div>{" "}
          <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
            <Icon icon="ri:twitter-fill" className="text-sm text-black" />
          </div>{" "}
          <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
            <Icon
              icon="grommet-icons:instagram"
              className="text-sm text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
