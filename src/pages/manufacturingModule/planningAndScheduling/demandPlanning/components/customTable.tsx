import { Icon } from "@iconify/react";
import { useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  headers: ReactNode[];
  data: ReactNode[][];
  height?: string;
};

export default function CustomTable({ headers, data, height }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown = true;

    if (!scrollRef.current) return;

    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !scrollRef.current) return;

    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;

    const walk = (x - startX) * 1.5;

    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  return (
    <div
      style={{ height: height || "60vh" }}
      className="flex flex-col justify-between overflow-hidden bg-white rounded-2xl"
    >
      {/* TABLE AREA */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex-1 overflow-x-auto overflow-y-auto cursor active:cursor-grabbing select-none scrollbar-hide"
      >
<table className="border-separate border-spacing-0 min-w-max w-full">
          {/* HEADER */}
          <thead>
            <tr className="bg-[#ECF0F4]">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className={`
                    h-14 px-4 text-sm font-semibold text-heading1
                    border-r border-b border-[#304250]/20
                    whitespace-nowrap bg-[#ECF0F4]

                    ${idx === 0 ? "sticky left-0 z-10 min-w-22.5" : ""}

                    ${idx === 1 ? "sticky left-22.5 z-10 min-w-32.5" : ""}

                    ${idx === 2 ? "sticky left-55 z-10 min-w-45" : ""}
                  `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
  key={cellIndex}
  className={`
    h-16 px-4 text-sm text-heading1
    border-r border-b border-[#304250]/20
    bg-white

    ${cellIndex === 0 ? "sticky left-0 z-10 min-w-22.5" : ""}
    ${cellIndex === 1 ? "sticky left-22.5 z-10 min-w-32.5" : ""}
    ${cellIndex === 2 ? "sticky left-55 z-10 min-w-45" : ""}
  `}
>
  <div className="flex items-center justify-center w-full h-full">  {/* ✅ */}
    {cell}
  </div>
</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between p-4 border-t border-[#304250]/10">
        <p className="text-sm text-heading2">1 row selected</p>

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
            <p>1</p>
            <p>-</p>
            <p>3</p>
            <p>of</p>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
