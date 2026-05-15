import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
import { SyncLoader } from "react-spinners";

type CustomTableProps = {
  headers?: ReactNode[];
  data?: ReactNode[][];
  height?: string;
  loading?: boolean;
  norounded?: boolean;
  noPagination?: boolean;
};

export default function CustomTable({
  headers,
  data,
  height,
  norounded,
  loading,
  noPagination,
}: CustomTableProps) {
  return (
    <div
      style={{
        height: height || "40vh",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className={`flex flex-col justify-between overflow-auto bg-white  ${
        norounded ? "rounded-t-0" : "rounded-xl"
      }`}
    >
      <table className="w-full bg-white border-separate border-spacing-0 text-heading1">
        <thead>
          <tr className="text-heading1 bg-[#ECF0F4]">
            {headers?.map((header, idx) => (
              <th
                key={idx}
                className="p-4 text-sm font-semibold text-left border-b-[0.5px] border-r-[0.5px] border-[#304250]/36 last:border-r-0"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={headers?.length || 1} className="p-6 text-center">
                <div className="flex items-center justify-center">
                  <SyncLoader size={18} color="#14CCC3" />
                </div>
              </td>
            </tr>
          ) : data?.length ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-bgprimary ">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="p-4 text-sm border-b-[0.5px] border-r-[0.5px] border-[#304250]/36 text-heading1 last:border-r-0"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers?.length || 1}
                className="p-6 text-center text-gray-400"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {noPagination ? (
        ""
      ) : (
        <div
          className={`p-4 border-t-[0.5px] border-[#304250]/36 flex items-center justify-between  ${
            norounded ? "rounded-t-0" : "rounded-b-xl"
          }`}
        >
          <p className="text-sm bg-transparent text-heading2">1 row selected</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon
                icon="simple-line-icons:arrow-left"
                className="text-heading2 text-[14px]"
              />
              <Icon
                icon="fluent:arrow-next-16-regular"
                className="text-heading2 text-[20px] rotate-180"
              />
              <p>1</p>
              <Icon
                icon="fluent:arrow-next-16-regular"
                className="text-heading2 text-[20px]"
              />
              <Icon
                icon="simple-line-icons:arrow-right"
                className="text-heading2 text-[14px]"
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-heading1">
              <p>1</p> <p>-</p> <p>3</p> <p>of</p> <p>3</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
