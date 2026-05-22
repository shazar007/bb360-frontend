import { useState } from "react";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import Logo from "../../../../assets/logo.png";
import Filter from "../../../../components/customDatefilter";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../../api/employeesServices";
import CustomInput from "../../../../components/customInput";
import { useRef } from "react";
import { getAllDepartments } from "../../../../api/classificationServices";
import { SyncLoader } from "react-spinners";

// Helper: load any image URL → base64 data URL
const loadImageAsBase64 = (url: string): Promise<string> =>
  new Promise((resolve) => {
    if (!url) return resolve("");
    const img = new Image();
    img.crossOrigin = "anonymous";
    const timer = setTimeout(() => resolve(""), 6000);
    img.onload = () => {
      clearTimeout(timer);
      try {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth || 1;
        c.height = img.naturalHeight || 1;
        c.getContext("2d")!.drawImage(img, 0, 0);
        resolve(c.toDataURL("image/png"));
      } catch {
        resolve("");
      }
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve("");
    };
    img.src = url + (url.includes("?") ? "&" : "?") + "_t=" + Date.now();
  });

export default function EmployeeCard() {
  const [openFilter, setOpenFilter] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",
    department: "",
    payroll: "",
  });

  const { data: allEmployees, isLoading } = useQuery({
    queryKey: ["getAllEmployees"],
    queryFn: getAllEmployees,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const AllEmployee: any[] = allEmployees?.data?.data || [];
  const employeeOptions = AllEmployee.map((emp: any) => ({
    label: emp.name,
    value: emp._id,
  }));

  const { data: allDepartments } = useQuery({
    queryKey: ["getAllDepartments"],
    queryFn: getAllDepartments,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const AllDepartments: any[] = allDepartments?.data?.data || [];
  const selectedEmp = AllEmployee.find((e) => e._id === formData.employee);

  const employee = {
    name: selectedEmp?.name || "Employee Name",
    role: selectedEmp?.designation?.name || "Designation",
    department: formData.department || "Department",
    email: selectedEmp?.email || "email@example.com",
    phone: selectedEmp?.phone || selectedEmp?.phoneNumber || "000 000 000",
    idNo: selectedEmp?.employeeId || selectedEmp?.employeeCode || "EMP-0000",
    avatarUrl: selectedEmp?.profilePic || "",
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BBERP360-${employee.idNo}`;

  // Draw the FRONT card using jsPDF primitives
  const drawFront = async (
    pdf: jsPDF,
    xOffset: number,
    logoB64: string,
    avatarB64: string,
    W: number, // card width in mm
    H: number, // card height in mm
  ) => {
    const x = xOffset;

    // Card background
    pdf.setFillColor("#FBFBF3");
    pdf.roundedRect(x, 0, W, H, 4, 4, "F");

    // Top teal bar
    pdf.setFillColor("#14CCC3");
    pdf.roundedRect(x, 0, W * 0.87, 5.3, 0, 2, "F");

    // Logo
    if (logoB64) {
      pdf.addImage(logoB64, "PNG", x + 3, 6.5, 6.6, 6.6);
    }

    // Company name
    pdf.setFontSize(3.2);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor("#181918");
    pdf.text("Berry Boost 360", x + 11, 9);

    pdf.setFontSize(2);
    pdf.setFont("helvetica", "normal");
    pdf.text("Boosting Business", x + 11, 11.5);

    // Avatar circle clip (approximate with a circle border)
    const avatarX = x + W / 2 - 10.5;
    const avatarY = 15;
    const avatarSize = 21;

    if (avatarB64) {
      // Draw circular clip by drawing image then overlaying corner masks
      pdf.addImage(avatarB64, "PNG", avatarX, avatarY, avatarSize, avatarSize);
      // Circle border
      pdf.setDrawColor("#CCCBCA");
      pdf.setLineWidth(0.3);
      pdf.circle(
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
      );
    } else {
      // Placeholder circle
      pdf.setFillColor("#CCCBCA");
      pdf.circle(
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        "F",
      );
    }

    // Name
    pdf.setFontSize(4.5);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor("#181918");
    const nameText =
      employee.name.length > 18
        ? employee.name.slice(0, 18) + "…"
        : employee.name;
    pdf.text(nameText, x + W / 2, avatarY + avatarSize + 4, {
      align: "center",
    });

    // Role
    pdf.setFontSize(2.8);
    pdf.setFont("helvetica", "normal");
    const roleText =
      employee.role.length > 22
        ? employee.role.slice(0, 22) + "…"
        : employee.role;
    pdf.text(roleText, x + W / 2, avatarY + avatarSize + 7.5, {
      align: "center",
    });

    // Info rows
    const rows = [
      { label: "Dept", value: employee.department },
      { label: "Email", value: employee.email },
      { label: "Phone", value: employee.phone },
      { label: "ID no.", value: employee.idNo },
    ];

    let rowY = avatarY + avatarSize + 11;
    pdf.setFontSize(2.5);
    rows.forEach(({ label, value }) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(label + " :", x + 3, rowY);
      pdf.setFont("helvetica", "normal");
      const valText =
        String(value || "").length > 24
          ? String(value).slice(0, 24) + "…"
          : String(value || "");
      pdf.text(valText, x + 14, rowY);
      rowY += 3.8;
    });
  };

  // Draw the BACK card using jsPDF primitives
  const drawBack = async (
    pdf: jsPDF,
    xOffset: number,
    qrB64: string,
    W: number,
    H: number,
  ) => {
    const x = xOffset;

    // Card background
    pdf.setFillColor("#FBFBF3");
    pdf.roundedRect(x, 0, W, H, 4, 4, "F");

    // Top teal bar (centered pill)
    pdf.setFillColor("#14CCC3");
    pdf.roundedRect(x + W * 0.07, 0, W * 0.87, 6, 0, 3, "F");

    // Bottom wave — teal layer
    pdf.setFillColor("#14CCC3");
    pdf.triangle(x, H, x + W, H, x + W, H - 14, "F");
    pdf.setFillColor("#14CCC3");
    // Approximate wave with a large rounded shape
    pdf.ellipse(x + W * 0.3, H - 8, W * 0.9, 10, "F");

    // Bottom wave — dark navy layer on top
    pdf.setFillColor("#122E3F");
    pdf.triangle(x, H, x + W, H, x + W, H - 10, "F");
    pdf.ellipse(x + W * 0.2, H - 5, W * 0.9, 8, "F");

    // QR code centered
    const qrSize = 26;
    const qrX = x + (W - qrSize) / 2;
    const qrY = (H - qrSize) / 2;

    if (qrB64) {
      pdf.addImage(qrB64, "PNG", qrX, qrY, qrSize, qrSize);
    } else {
      pdf.setFillColor("#CCCCCC");
      pdf.rect(qrX, qrY, qrSize, qrSize, "F");
      pdf.setFontSize(3);
      pdf.setTextColor("#666666");
      pdf.text("QR Code", x + W / 2, H / 2, { align: "center" });
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const [logoB64, avatarB64, qrB64] = await Promise.all([
        loadImageAsBase64(Logo),
        employee.avatarUrl
          ? loadImageAsBase64(employee.avatarUrl)
          : Promise.resolve(""),
        loadImageAsBase64(qrUrl),
      ]);

      const W = 45;
      const H = 71.7;
      const gap = 5;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [W * 2 + gap + 8, H + 8],
      });

      await drawFront(pdf, 4, logoB64, avatarB64, W, H);

      await drawBack(pdf, 4 + W + gap, qrB64, W, H);

      pdf.save(`employee-card-${employee.name}.pdf`);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Employee Card
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          <div className="relative w-full md:w-40">
            <input
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 bg-white rounded-sm focus:outline-none placeholder:text-heading1/36 placeholder:text-sm"
            />
            <Icon
              icon="mynaui:search"
              className="absolute text-[20px] text-heading1/36 top-2.5 left-3"
            />
          </div>

          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button>

          <button
            onClick={() =>
              setFormData({ employee: "", department: "", payroll: "" })
            }
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="ion:refresh-outline" className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
      <div className="mt-3 bg-white rounded-2xl">
        <div className="px-4 py-3 bg-[#ECF0F4] border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-heading1">Select Employee</p>
        </div>
        <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-y-2 xl:gap-x-24 xl:w-220 lg:gap-x-20 lg:w-210 gap-y-2">
          <CustomSelectSearch
            label="Employee"
            loading={isLoading}
            placeholder="Select Employee"
            value={formData.employee}
            options={employeeOptions}
            onChange={(value) => {
              const emp = AllEmployee.find((e) => e._id === value);
              const dept = AllDepartments.find(
                (d) => d._id === emp?.department?._id,
              );
              setFormData((prev) => ({
                ...prev,
                employee: value,
                department: dept?.fullName || dept?.name || "Not Assigned",
                payroll: emp?.definePayroll || "",
              }));
            }}
          />

          <CustomInput
            label="Department"
            value={formData.department || ""}
            disabled
          />
          <CustomInput
            label="Payroll"
            value={formData.payroll || ""}
            disabled
          />
        </div>
      </div>
      <div className="pb-6 mt-2 overflow-hidden bg-white rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-primary">Employee Card</p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 h-8 px-4 text-xs text-white rounded-md cursor-pointer bg-secondary disabled:opacity-60"
          >
            {downloading ? (
              <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
            ) : (
              <>
                <Icon icon="mdi:file-pdf-box" className="w-3.5 h-3.5" />
                Download
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16 py-10">
          <div
            ref={cardRef}
            className="relative shrink-0"
            style={{
              width: "170px",
              height: "271px",
              borderRadius: "16px",
              background: "#FBFBF3",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              fontFamily: "'Montserrat', sans-serif",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "62.78px",
                transform: "translateX(-50%)",
                width: "149px",
                height: "20px",
                background: "#14CCC3",
                borderRadius: "0 0 999px 0",
                zIndex: 4,
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "23px",
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 14px 0",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                <img
                  src={Logo}
                  alt="logo"
                  style={{
                    width: "25px",
                    height: "25px",
                    objectFit: "contain",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "9px",
                      fontWeight: 600,
                      color: "#181918",
                      lineHeight: "11px",
                      margin: 0,
                    }}
                  >
                    Berry Boost 360
                  </p>
                  <p
                    style={{
                      fontSize: "6.66px",
                      fontWeight: 400,
                      color: "#181918",
                      lineHeight: "6px",
                      margin: 0,
                    }}
                  >
                    Boosting Business
                  </p>
                </div>
              </div>

              {employee.avatarUrl ? (
                <img
                  src={employee.avatarUrl}
                  alt="employee"
                  style={{
                    width: "79px",
                    height: "79px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    background: "#CCCBCA",
                    marginBottom: "6px",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "79px",
                    height: "79px",
                    borderRadius: "50%",
                    background: "#CCCBCA",
                    marginBottom: "6px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    icon="mdi:account"
                    style={{ fontSize: "40px", color: "#fff" }}
                  />
                </div>
              )}

              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#181918",
                  lineHeight: "18px",
                  margin: "0 0 2px",
                  textAlign: "center",
                  letterSpacing: "0.3px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "140px",
                }}
              >
                {employee.name}
              </p>

              <p
                style={{
                  fontSize: "8px",
                  fontWeight: 400,
                  color: "#181918",
                  lineHeight: "10px",
                  margin: "0 0 8px",
                  textAlign: "center",
                  maxWidth: "140px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {employee.role}
              </p>

              <div style={{ width: "100%" }}>
                {[
                  { label: "Dept", value: employee.department },
                  { label: "Email", value: employee.email },
                  { label: "Phone", value: employee.phone },
                  { label: "ID no.", value: employee.idNo },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "3.5px",
                      fontSize: "7.69px",
                      fontWeight: 400,
                      color: "#181918",
                      lineHeight: "9px",
                    }}
                  >
                    <span style={{ minWidth: "34px", flexShrink: 0 }}>
                      {label}
                    </span>
                    <span style={{ marginRight: "3px", flexShrink: 0 }}>:</span>
                    <span style={{ wordBreak: "break-all" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={backRef}
            className="relative shrink-0"
            style={{
              width: "170px",
              height: "271px",
              borderRadius: "16px",
              background: "#FBFBF3",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              fontFamily: "'Montserrat', sans-serif",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "149px",
                height: "23px",
                background: "#14CCC3",
                borderRadius: "0 0 999px 999px",
                zIndex: 4,
              }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 153 72"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "170px",
                height: "72px",
                zIndex: 3,
              }}
            >
              <path
                d="M-5,55 C20,20 80,50 158,15 L158,72 L-5,72 Z"
                fill="#14CCC3"
              />
              <path
                d="M-5,65 C20,32 80,60 158,28 L158,72 L-5,72 Z"
                fill="#122E3F"
              />
            </svg>

            <img
              src={qrUrl}
              alt="QR"
              style={{
                width: "100px",
                height: "100px",
                display: "block",
                zIndex: 2,
                position: "relative",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
