import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Calender from "../../../assets/calender.svg";
import Logo from "../../../assets/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Icon } from "@iconify/react";
import { useAppNavigate } from "../../../hooks/navigation";
import { SyncLoader } from "react-spinners";
import CustomInput from "../../../components/customInput";
import CustomTable from "../../../components/customTable";

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
  const headers = ["Description", "Earnings", "Deductions", "Total"];
  return (
    <div className="bg-[#F7F7F7] md:h-[calc(100vh-108px)] h-auto rounded-xl p-4">
      <div className="flex flex-wrap items-start justify-between gap-4 max-[564px]:gap-2">
        <button className="h-10 flex-1 md:flex-none md:w-50 max-[564px]:w-full bg-[#ECF0F4] rounded-md gap-2 flex justify-center items-center">
          <Icon
            icon="solar:calendar-date-linear"
            width="18"
            className="text-gray-400"
          />
          <p className="text-base font-normal text-heading1">
            {rowData?.month}-{rowData?.year}
          </p>
        </button>
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto max-[564px]:gap-2">
          <button
            onClick={goBack}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="ion:play-back-outline" className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center w-full h-10 gap-3 text-white rounded-md cursor-pointer md:w-50 bg-primary"
          >
            {isLoading ? (
              <SyncLoader color="#fff" size={6} />
            ) : (
              " Generate Salary Slip"
            )}
          </button>
        </div>
      </div>
      <div
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="w-full p-4 mt-3 overflow-y-auto bg-white rounded-xl"
      >
        <div
          ref={slipRef}
          style={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          <div className="flex flex-col items-center justify-between overflow-hidden border rounded-lg md:flex-row md:items-stretch border-primary">
            <div className="flex items-center gap-3 p-4 md:w-1/3">
              <img src={Logo} alt="logo" className="w-15 h-15" />
              <p className="max-[564px] text-base">Himmel Pharma</p>
            </div>

            <div className="flex flex-col items-center justify-center text-center border-t md:w-1/3 md:border-t-0 md:border-l md:border-r border-primary">
              <p className="text-[24px]">Salary Slip</p>
              <p className="text-[16px] text-black">
                {rowData?.month} {rowData?.year}
              </p>
            </div>

            <div className="w-full md:w-1/3 flex justify-center items-center bg-[#FFDDE5] p-4 text-center">
              <p className="text-[20px]">Confidential</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl">
        <div className="bg-[#ECF0F4] rounded-t-2xl p-4 ">
          <p className="text-xs font-semibold text-heading1">Payroll Details</p>
        </div>
        <div className="p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-29.25">
          <div className="space-y-2">
            <CustomInput
              label="Employee Name"
              disabled
              value={rowData?.employeeName}
            />
            <CustomInput label="Employee ID" value={rowData?.employeeId} />
          </div>
          <div className="space-y-2">
            <CustomInput label=" Position" value={rowData?.position} />
            <CustomInput
              label="Working Days"
              value={rowData?.totalWorkingDays}
            />
          </div>
          <div className="space-y-2">
            <CustomInput label="Leaves" value={rowData?.approvedLeaves} />
            <CustomInput label="Present Days" value={rowData?.presentDays} />
          </div>{" "}
          <div className="space-y-2">
            <CustomInput
              label="Approved By "
              value={rowData?.approvedBy || "Not Approved"}
            />
            <CustomInput
              label="Payroll Status"
              value={rowData?.payrollStatus}
            />
          </div>
        </div>
      </div>
      {/* <CustomTable headers={headers} data={tableRows} noPagination /> */}
      <div className="mt-4 overflow-x-auto bg-white rounded-xl">
        <div className="min-w-150 grid grid-cols-4 bg-[#E5EBF7] text-[#7D7D7D] text-start px-4 py-3 rounded-t-md text-sm">
          <p>Description</p>
          <p>Earnings</p>
          <p>Deductions</p>
          <p>Total</p>
        </div>
        <div className="space-y-1 text-sm min-w-140 md:text-base">
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
            <div
              key={idx}
              className="grid grid-cols-4 px-4 py-2 border-b border-gray-100 last:border-0 min-w-150"
            >
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
      <div className="  rounded-lg mt-2 flex flex-col-2 md:flex-row justify-between items-center p-4 font-semibold bg-[#E5EBF7] text-sm md:text-base">
        <p>Net Payable</p>
        <p className="text-center md:text-right">Rs:{rowData.netPay}/</p>
      </div>
    </div>
  );
}
