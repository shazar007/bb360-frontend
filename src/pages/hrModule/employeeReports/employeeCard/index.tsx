import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import Logo from "../../../../assets/logo.png";
import Filter from "../../../../components/customDatefilter";
import CustomSelectSearch from "../../../../components/customSelectSearch";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../../api/employeesServices";
import CustomInput from "../../../../components/customInput";
import { getAllDepartments } from "../../../../api/classificationServices";
import { SyncLoader } from "react-spinners";

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

  const toDataURL = (src: string): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        c.getContext("2d")!.drawImage(img, 0, 0);
        resolve(c.toDataURL("image/png"));
      };
      img.onerror = () => resolve("");
      img.src = src;
    });

  const loadImg = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const roundedClip = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.clip();
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await document.fonts.ready;

      const SCALE = 3;
      const CW = 170 * SCALE;
      const CH = 271 * SCALE;
      const RADIUS = 16 * SCALE;

      const qrDataUrl = await QRCode.toDataURL(`BBERP360-${employee.idNo}`, {
        width: 200,
        margin: 1,
        color: { dark: "#000000", light: "#ffffff" },
      });

      const logoImgEl = await loadImg(Logo).catch(() => null);
      const qrImgEl = await loadImg(qrDataUrl).catch(() => null);
      const avatarImgEl = employee.avatarUrl
        ? await loadImg(await toDataURL(employee.avatarUrl)).catch(() => null)
        : null;

      const waveSvgString = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153 72" preserveAspectRatio="none"
             width="${170 * SCALE}" height="${72 * SCALE}">
          <path d="M-5,55 C20,20 80,50 158,15 L158,72 L-5,72 Z" fill="#14CCC3"/>
          <path d="M-5,65 C20,32 80,60 158,28 L158,72 L-5,72 Z" fill="#122E3F"/>
        </svg>`;
      const waveBlob = new Blob([waveSvgString], { type: "image/svg+xml" });
      const waveUrl = URL.createObjectURL(waveBlob);
      const waveImgEl = await loadImg(waveUrl).catch(() => null);
      URL.revokeObjectURL(waveUrl);
      const frontCanvas = document.createElement("canvas");
      frontCanvas.width = CW;
      frontCanvas.height = CH;
      const fc = frontCanvas.getContext("2d")!;
      fc.save();
      roundedClip(fc, 0, 0, CW, CH, RADIUS);
      fc.fillStyle = "#FBFBF3";
      fc.fillRect(0, 0, CW, CH);
      fc.fillStyle = "#14CCC3";
      const stripW = 149 * SCALE,
        stripH = 20 * SCALE;
      fc.beginPath();
      fc.moveTo(0, 0);
      fc.lineTo(stripW - stripH / 2, 0);
      fc.quadraticCurveTo(stripW, 0, stripW, stripH / 2);
      fc.quadraticCurveTo(stripW, stripH, stripW - stripH / 2, stripH);
      fc.lineTo(0, stripH);
      fc.closePath();
      fc.fill();
      fc.restore();

      fc.save();
      roundedClip(fc, 0, 0, CW, CH, RADIUS);

      const pad = 14 * SCALE;
      let curY = 23 * SCALE + 8 * SCALE;
      if (logoImgEl) {
        fc.drawImage(logoImgEl, pad, curY, 25 * SCALE, 25 * SCALE);
      }
      fc.fillStyle = "#181918";
      fc.font = `600 ${9 * SCALE}px Montserrat, sans-serif`;
      fc.fillText("Berry Boost 360", pad + 31 * SCALE, curY + 11 * SCALE);
      fc.font = `400 ${6.66 * SCALE}px Montserrat, sans-serif`;
      fc.fillText("Boosting Business", pad + 31 * SCALE, curY + 22 * SCALE);
      curY += 25 * SCALE + 8 * SCALE;
      const avatarSize = 79 * SCALE;
      const avatarX = (CW - avatarSize) / 2;
      fc.save();
      fc.beginPath();
      fc.arc(
        avatarX + avatarSize / 2,
        curY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2,
      );
      fc.clip();
      if (avatarImgEl) {
        fc.drawImage(avatarImgEl, avatarX, curY, avatarSize, avatarSize);
      } else {
        fc.fillStyle = "#CCCBCA";
        fc.fillRect(avatarX, curY, avatarSize, avatarSize);
        fc.fillStyle = "#ffffff";
        const cx = avatarX + avatarSize / 2,
          cy = curY + avatarSize / 2;
        const hr = 13 * SCALE;
        fc.beginPath();
        fc.arc(cx, cy - hr * 0.6, hr, 0, Math.PI * 2);
        fc.fill();
        fc.beginPath();
        fc.ellipse(cx, cy + hr * 1.4, hr * 1.4, hr * 1.1, 0, Math.PI, 0, true);
        fc.fill();
      }
      fc.restore();
      curY += avatarSize + 6 * SCALE;

      fc.fillStyle = "#181918";
      fc.font = `600 ${12 * SCALE}px Montserrat, sans-serif`;
      fc.textAlign = "center";
      const maxTextW = 140 * SCALE;
      fc.fillText(employee.name, CW / 2, curY + 12 * SCALE, maxTextW);
      curY += 18 * SCALE + 2 * SCALE;

      fc.font = `400 ${8 * SCALE}px Montserrat, sans-serif`;
      fc.fillText(employee.role, CW / 2, curY + 8 * SCALE, maxTextW);
      curY += 10 * SCALE + 8 * SCALE;

      fc.textAlign = "left";
      fc.font = `400 ${7.69 * SCALE}px Montserrat, sans-serif`;
      const labelX = pad;
      const colonX = pad + 34 * SCALE;
      const valueX = colonX + 5 * SCALE;
      const rowGap = 9 * SCALE + 3.5 * SCALE;
      const rows = [
        { label: "Dept", value: employee.department },
        { label: "Email", value: employee.email },
        { label: "Phone", value: employee.phone },
        { label: "ID no.", value: employee.idNo },
      ];
      rows.forEach(({ label, value }) => {
        fc.fillStyle = "#181918";
        fc.fillText(label, labelX, curY + 9 * SCALE);
        fc.fillText(":", colonX, curY + 9 * SCALE);
        fc.fillText(value, valueX, curY + 9 * SCALE, CW - valueX - pad);
        curY += rowGap;
      });

      fc.restore();
      const backCanvas = document.createElement("canvas");
      backCanvas.width = CW;
      backCanvas.height = CH;
      const bc = backCanvas.getContext("2d")!;
      bc.save();
      roundedClip(bc, 0, 0, CW, CH, RADIUS);
      bc.fillStyle = "#FBFBF3";
      bc.fillRect(0, 0, CW, CH);
      const pillW = 149 * SCALE,
        pillH = 23 * SCALE;
      const pillX = (CW - pillW) / 2;
      bc.fillStyle = "#14CCC3";
      bc.beginPath();
      bc.moveTo(pillX, 0);
      bc.lineTo(pillX + pillW, 0);
      bc.lineTo(pillX + pillW, pillH / 2);
      bc.quadraticCurveTo(
        pillX + pillW,
        pillH,
        pillX + pillW - pillH / 2,
        pillH,
      );
      bc.lineTo(pillX + pillH / 2, pillH);
      bc.quadraticCurveTo(pillX, pillH, pillX, pillH / 2);
      bc.closePath();
      bc.fill();
      if (waveImgEl) {
        bc.drawImage(waveImgEl, 0, CH - 72 * SCALE, CW, 72 * SCALE);
      }
      if (qrImgEl) {
        const qrSize = 100 * SCALE;
        bc.drawImage(
          qrImgEl,
          (CW - qrSize) / 2,
          (CH - qrSize) / 2,
          qrSize,
          qrSize,
        );
      }

      bc.restore();
      const cardW = 54,
        cardH = 86,
        margin = 6,
        gap = 6;
      const pageW = margin + cardW + gap + cardW + margin;
      const pageH = margin + cardH + margin;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pageH, pageW],
      });
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageW, pageH, "F");

      pdf.addImage(
        frontCanvas.toDataURL("image/png"),
        "PNG",
        margin,
        margin,
        cardW,
        cardH,
      );
      pdf.addImage(
        backCanvas.toDataURL("image/png"),
        "PNG",
        margin + cardW + gap,
        margin,
        cardW,
        cardH,
      );

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
              minHeight: "271px",
              height: "auto",
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
                position: "relative",
                top: "23px",
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 14px 12px",
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
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "40px", height: "40px", fill: "#ffffff" }}
                  >
                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.337 0-10 1.676-10 5v2h20v-2c0-3.324-6.663-5-10-5z" />
                  </svg>
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
                  whiteSpace: "normal",
                  wordBreak: "break-word",
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
                  whiteSpace: "normal",
                  wordBreak: "break-word",
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
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BBERP360-${employee.idNo}`}
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
