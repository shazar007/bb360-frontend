import { forwardRef } from "react";

export const PrintByItem = forwardRef(
  ({ data, title, sections }: any, ref: any) => {
    const item = data;

    return (
      <div ref={ref} className="p-6 bg-white text-black">
        <style>
          {`
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                font-size: 10px;
              }

              h2 {
                margin-bottom: 16px;
              }

              .info-row {
                display: flex;
                gap: 10px;
                margin-bottom: 6px;
              }

              .label {
                font-weight: bold;
                min-width: 180px;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
                margin-top: 16px;
              }

              th, td {
                border: 1px solid #000;
                padding: 6px;
                text-align: left;
                word-break: break-word;
              }

              th {
                background: #f2f2f2 !important;
              }
            }
          `}
        </style>

        <h2 className="text-2xl font-bold">{title || "Report"}</h2>

        {(sections || []).map((section: any, sIndex: number) => (
          <div key={sIndex}>
            <h3 className="mt-4 mb-2 font-semibold">{section.title}</h3>

            {section.type === "info" && (
              <div>
                {section.fields.map((field: any, i: number) => (
                  <div key={i} className="info-row">
                    <span className="label">{field.label}:</span>

                    <span>
                      {field.render
                        ? field.render(item)
                        : (item?.[field.key] ?? "-")}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {section.type === "table" && (
              <table>
                <thead>
                  <tr>
                    {section.columns.map((col: any, i: number) => (
                      <th key={i}>{col.label}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {(section.data ? section.data(item) : []).map(
                    (row: any, rIndex: number) => (
                      <tr key={rIndex}>
                        {section.columns.map((col: any, cIndex: number) => (
                          <td key={cIndex}>
                            {col.render
                              ? col.render(row)
                              : (row?.[col.key] ?? "-")}
                          </td>
                        ))}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    );
  },
);
