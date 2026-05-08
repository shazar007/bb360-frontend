import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Calender from "../../../assets/calender.svg";
import Logo from "../../../assets/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Icon } from "@iconify/react";
import { useAppNavigate } from "../../../hooks/navigation";
import { SyncLoader } from "react-spinners";

interface PayrollData {
  employeeId: string;
  employeeName: string;
  position: string;
  totalWorkingDays: number;
  approvedLeaves: number;
  presentDays: number;
  payrollStatus: string;
  month: string;
  approvedBy: string;
  year: number;
  basicSalary: number;
  allowances: {
    medical: number;
    others: number;
    transport: number;
  };
  deductions: {
    loan: number;
    tax: number;
    others: number;
    advanceSalary: number;
    pf: number;
  };
  netPay: number;
}

export default function PayrollDetails() {
  const location = useLocation();
  const { rowData } = (location.state as { rowData: PayrollData }) || {};
  const { goBack } = useAppNavigate();
  const [isLoading, setLoading] = useState(false);

  const slipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "HR-Management | Payroll Details";
  }, []);

  const forceSafeColors = (el: HTMLElement) => {
    const computed = getComputedStyle(el);

    let bg = computed.backgroundColor;
    if (!bg || bg.startsWith("oklch")) bg = "#ffffff";
    el.style.backgroundColor = bg;

    let color = computed.color;
    if (!color || color.startsWith("oklch")) color = "#000000";
    el.style.color = color;

    Array.from(el.children).forEach((child) =>
      forceSafeColors(child as HTMLElement),
    );
  };

  const handleDownloadPDF = async () => {
    if (!slipRef.current) return;
    setLoading(true);

    try {
      const wrapper = document.createElement("div");
      wrapper.style.width = "840px";
      wrapper.style.padding = "20px";
      wrapper.style.boxSizing = "border-box";
      wrapper.style.position = "absolute";
      wrapper.style.left = "-9999px";
      const clone = slipRef.current.cloneNode(true) as HTMLDivElement;
      clone.style.width = "800px";
      clone.style.height = "auto";
      clone.style.backgroundColor = "#ffffff";
      wrapper.appendChild(clone);

      document.body.appendChild(wrapper);
      forceSafeColors(wrapper);
      const canvas = await html2canvas(wrapper, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
      pdf.save(
        `SalarySlip-${rowData?.employeeName}_${rowData?.month}_${rowData?.year}.pdf`,
      );

      document.body.removeChild(wrapper);
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F7F7] md:h-[calc(100vh-108px)] h-auto rounded-xl p-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-[564px]:gap-2">
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto max-[564px]:gap-2">
          <button
            onClick={goBack}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>

          <button className="h-10 flex-1 md:flex-none md:w-50 max-[564px]:w-full bg-white border border-primary rounded-md gap-2 flex justify-center items-center">
            <img src={Calender} alt="calendar" className="w-5 h-5" />
            <p className="text-base font-medium text-primary">
              {rowData?.month}-{rowData?.year}
            </p>
          </button>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="h-10 w-full md:w-50 text-white bg-primary rounded-md gap-3 cursor-pointer flex justify-center items-center"
        >
          {isLoading ? (
            <SyncLoader color="#fff" size={6} />
          ) : (
            " Generate Salary Slip"
          )}
        </button>
      </div>
      <div
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="w-full bg-white rounded-xl border 2xl:h-[calc(79vh-0px)] xl:h-[calc(69vh-0px)] overflow-y-auto border-primary p-4 mt-3"
      >
        <div
          ref={slipRef}
          style={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between border border-primary rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 p-4 md:w-1/3">
              <img src={Logo} alt="logo" className="w-15 h-15" />
              <p className="max-[564px] text-base">Himmel Pharma</p>
            </div>

            <div className="text-center md:w-1/3 border-t md:border-t-0 md:border-l md:border-r border-primary flex justify-center items-center flex-col">
              <p className="text-[24px]">Salary Slip</p>
              <p className="text-[16px] text-black">
                {rowData?.month} {rowData?.year}
              </p>
            </div>

            <div className="w-full md:w-1/3 flex justify-center items-center bg-[#FFDDE5] p-4 text-center">
              <p className="text-[20px]">Confidential</p>
            </div>
          </div>

          {/* Employee Info */}
          <div className="border border-primary h-auto rounded-lg mt-3 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="flex items-center text-xs lg:text-sm">
                <span className="text-[#7D7D7D] md:min-w-32.5 min-w-25">
                  Employee Name:
                </span>
                <span className="font-medium">{rowData?.employeeName}</span>
              </p>
              <p className="flex items-center text-xs lg:text-sm">
                <span className="text-[#7D7D7D] md:min-w-32.5 min-w-25">
                  Employee ID:
                </span>{" "}
                <span className="font-medium">{rowData?.employeeId}</span>
              </p>
              <p className="flex items-center text-xs lg:text-sm">
                <span className="text-[#7D7D7D] md:min-w-32.5 min-w-25">
                  Position:
                </span>
                <span className="font-medium">{rowData?.position}</span>
              </p>
              <p className="flex items-center text-xs lg:text-sm">
                <span className="text-[#7D7D7D] md:min-w-32.5 min-w-25">
                  Working Days:
                </span>
                <span className="font-medium">{rowData?.totalWorkingDays}</span>
              </p>
            </div>

            <div>
              <p className="flex items-center text-xs lg:text-sm">
                <span className="text-[#7D7D7D] md:min-w-32.5 min-w-25">
                  Leaves:
                </span>
                <span className="font-medium">{rowData?.approvedLeaves}</span>
              </p>
              <p className="flex items-center text-xs lg:text-sm">
                <span className="text-[#7D7D7D] md:min-w-32.5 min-w-25">
                  Present Days:
                </span>
                <span className="font-medium">{rowData?.presentDays}</span>
              </p>
              <p className="flex items-center text-xs lg:text-sm">
                <span className="text-[#7D7D7D] md:min-w-32.5 min-w-25">
                  Approved By:
                </span>
                <span className="px-2 py-0.5 text-xs border border-primary text-primary rounded">
                  {rowData?.approvedBy || "Not Approved"}
                </span>
              </p>{" "}
              <p className="flex items-center text-xs lg:text-sm">
                <span className="text-[#7D7D7D] md:min-w-32.5 min-w-25">
                  Payroll Status:
                </span>
                <span className="font-medium">{rowData?.payrollStatus}</span>
              </p>
            </div>
          </div>

          {/* Salary Table */}
          <div className="overflow-x-auto border border-primary rounded-lg mt-2">
            <div className="min-w-150 grid grid-cols-4 bg-[#E5EBF7] text-[#7D7D7D] text-start p-2 rounded-t-md text-sm">
              <p>Description</p>
              <p>Earnings</p>
              <p>Deductions</p>
              <p>Total</p>
            </div>
            <div className="p-4 space-y-1 text-sm min-w-140 md:text-base">
              {[
                {
                  desc: "Basic Salary",
                  earn: rowData.basicSalary,
                  ded: "-",
                  total: rowData.basicSalary,
                },
                {
                  desc: "Medical Allowance",
                  earn: rowData.allowances.medical,
                  ded: "-",
                  total: rowData.basicSalary + rowData.allowances.medical,
                },
                {
                  desc: "Others Allowance",
                  earn: rowData.allowances.others,
                  ded: "-",
                  total:
                    rowData.basicSalary +
                    rowData.allowances.medical +
                    rowData.allowances.others,
                },
                {
                  desc: "Transport Allowance",
                  earn: rowData.allowances.transport,
                  ded: "-",
                  total:
                    rowData.basicSalary +
                    rowData.allowances.medical +
                    rowData.allowances.others +
                    rowData.allowances.transport,
                },
                {
                  desc: "Loan Deduction",
                  earn: "-",
                  ded: rowData.deductions.loan,
                  total:
                    rowData.basicSalary +
                    rowData.allowances.medical +
                    rowData.allowances.others +
                    rowData.allowances.transport -
                    rowData.deductions.loan,
                },
                {
                  desc: "Tax Deduction",
                  earn: "-",
                  ded: rowData.deductions.tax,
                  total:
                    rowData.basicSalary +
                    rowData.allowances.medical +
                    rowData.allowances.others +
                    rowData.allowances.transport -
                    rowData.deductions.loan -
                    rowData.deductions.tax,
                },
                {
                  desc: "Other Deduction",
                  earn: "-",
                  ded: rowData.deductions.others,
                  total:
                    rowData.basicSalary +
                    rowData.allowances.medical +
                    rowData.allowances.others +
                    rowData.allowances.transport -
                    rowData.deductions.loan -
                    rowData.deductions.tax -
                    rowData.deductions.others,
                },
                {
                  desc: "Advance Salary Deduction",
                  earn: "-",
                  ded: rowData.deductions.advanceSalary,
                  total:
                    rowData.basicSalary +
                    rowData.allowances.medical +
                    rowData.allowances.others +
                    rowData.allowances.transport -
                    rowData.deductions.loan -
                    rowData.deductions.tax -
                    rowData.deductions.others -
                    rowData.deductions.advanceSalary,
                },
                {
                  desc: "PF Deduction",
                  earn: "-",
                  ded: rowData.deductions.pf,
                  total:
                    rowData.basicSalary +
                    rowData.allowances.medical +
                    rowData.allowances.others +
                    rowData.allowances.transport -
                    rowData.deductions.loan -
                    rowData.deductions.tax -
                    rowData.deductions.others -
                    rowData.deductions.advanceSalary -
                    rowData.deductions.pf,
                },
              ].map((item, idx) => (
                <div key={idx} className="grid grid-cols-4 py-1 min-w-150">
                  <p>{item.desc}</p>
                  <p className="text-start">{item.earn}</p>
                  <p
                    className={`text-start ${
                      item.ded !== "-" ? "text-red-500" : ""
                    }`}
                  >
                    {item.ded}
                  </p>
                  <p className="text-start">{item.total}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Net Payable */}
          <div className="border border-primary rounded-lg mt-2 flex flex-col-2 md:flex-row justify-between items-center p-4 font-semibold bg-[#E5EBF7] text-sm md:text-base">
            <p>Net Payable</p>
            <p className="text-center md:text-right">Rs:{rowData.netPay}/</p>
          </div>
        </div>
      </div>
    </div>
  );
}
