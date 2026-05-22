import { Icon } from "@iconify/react";

type SummaryRow = {
  account: string;
  debit: string;
  credit: string;
};

type SummaryGroup = {
  title?: string;
  rows: SummaryRow[];
};

interface Props {
  data: SummaryGroup[];
  grouped?: boolean;
}

export default function SummaryTable({ data, grouped = false }: Props) {
  return (
    <div className="bg-white rounded-b-2xl overflow-hidden">
      <div className="min-h-[48vh]">
        {data.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* EMPLOYEE TITLE */}
            {grouped && (
              <div className="px-6 py-5 bg-[#ECF0F4] border-b border-[#304250]/10">
                <p className="text-[12px] font-semibold text-heading1">
                  Employee: {group.title}
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 px-6 py-5 bg-[#ECF0F4] border-b border-[#304250]/10">
              <p className="text-[12px] font-semibold text-heading1">Account</p>

              <p className="text-[12px] font-semibold text-center text-heading1">
                Debit Amount
              </p>

              <p className="text-[12px] font-semibold text-center text-heading1">
                Credit Amount
              </p>
            </div>

            {group.rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-3 px-6 py-6 border-b border-[#304250]/10"
              >
                <p className="text-[12px] text-heading1">{row.account}</p>

                <p className="text-[12px] text-center text-heading1">
                  {row.debit}
                </p>

                <p className="text-[12px] text-center text-heading1">
                  {row.credit}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="p-4 border-t-[0.5px] border-[#304250]/36 flex items-center justify-between">
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
    </div>
  );
}
