import { forwardRef } from "react";

export const PrintByAll = forwardRef(
  ({ data, title, columns }: any, ref: any) => {
    return (
      <div ref={ref} className="p-6 bg-white text-black">
        <style>
          {`
            @media print {
              body {
                -webkit-print-color-adjust: exact;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
              }

              th, td {
                border: 1px solid #000;
                padding: 8px;
                font-size: 10px;
                text-align: left;
                word-break: break-word;
              }

              th {
                background: #f2f2f2 !important;
              }

              h2 {
                margin-bottom: 16px;
              }
            }
          `}
        </style>

        <h2 className="text-2xl font-bold mb-4">{title || "Report"}</h2>

        <table>
          <thead>
            <tr>
              {(columns || []).map((col: any, i: number) => (
                <th key={i}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {(data || []).map((row: any, rowIndex: number) => (
              <tr key={rowIndex}>
                {(columns || []).map((col: any, colIndex: number) => (
                  <td key={colIndex}>
                    {col.render ? col.render(row) : (row?.[col.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
