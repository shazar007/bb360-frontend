import { useState } from "react";
import { Icon } from "@iconify/react";

import CustomSelect from "../../../../components/customSelect";
import Filter from "../../../../components/customDatefilter";

// ─── Mock employee data — backend se replace karna ───────────────────────────
const EMPLOYEE_DATA = {
  name: "MERY TIRSON",
  role: "UIUX Designer",
  department: "Creative Team",
  email: "merti@gmail.com",
  phone: "000 000 000",
  idNo: "0023415",
  avatarUrl: "https://i.pravatar.cc/200",
  logoUrl: "/src/assets/logo.png",
  companyName: "BB ERP 360",
  companyTagline: "Enterprise Software",
};
// ─────────────────────────────────────────────────────────────────────────────

export default function EmployeeCard() {
  const [openFilter, setOpenFilter] = useState(false);

  const employee = EMPLOYEE_DATA;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BBERP360-${employee.idNo}`;

  return (
    <div className="mt-2">
      {/* ── Page Header ── */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Employee Card
          </p>
        </div>

        <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
          {/* Search */}
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

          {/* Filter */}
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F]"
          >
            <Icon icon="mage:filter" className="w-5 h-5" />
            Filters
          </button>

          {/* Reset */}
          <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-4 bg-white rounded-md text-heading1 cursor-pointer shadow-[0_1px_12px_#0000001F]">
            <Icon icon="ion:refresh-outline" className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {openFilter && <Filter onClose={() => setOpenFilter(false)} />}

      {/* ── Select Employee ── */}
      <div className="mt-3 overflow-hidden bg-white rounded-2xl">
        <div className="px-4 py-3 bg-[#ECF0F4] border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-heading1">Select Employee</p>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-y-2 xl:gap-x-24 xl:w-220 lg:gap-x-20 lg:w-210 gap-y-2">
          <CustomSelect label="Department" placeholder="Sales" />
          <CustomSelect label="Employee" placeholder="Bilal Hassan" />
          <CustomSelect label="Payroll" placeholder="Monthly Payroll" />
        </div>
      </div>

      {/* ── Employee Card Preview ── */}
      <div className="pb-6 mt-2 overflow-hidden bg-white rounded-2xl">
        {/* Section Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#304250]/10">
          <p className="text-xs font-semibold text-primary">Employee Card</p>
          <button className="flex items-center gap-1.5 h-8 px-4 text-xs text-white rounded-md cursor-pointer bg-secondary">
            <Icon icon="" className="w-3.5 h-3.5" />
            Download
          </button>
        </div>

        {/* Cards Row */}
        <div className="flex items-center justify-center gap-16 py-10 flex-wrap">
          {/* ══════════════════════════════════════
              FRONT CARD — Figma: 153.07 × 240.95px
          ══════════════════════════════════════ */}
          <div
            className="relative flex-shrink-0"
            style={{
              width: "153px",
              height: "241px",
              borderRadius: "0",
              background: "#FBFBF3",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              fontFamily: "'Montserrat', sans-serif",
              overflow: "hidden",
            }}
          >
            {/* TOP BAR — Figma: 149.33×23.38px, #14CCC3, rounded bottom */}
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

            {/* BOTTOM WAVE — SVG: teal arc + dark navy on top */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 153 72"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "153px",
                height: "72px",
                zIndex: 3,
              }}
            >
              <path
                d="M-5,65 C20,32 80,60 158,28 L158,72 L-5,72 Z"
                fill="#122E3F"
              />
            
              <path
                d="M-5,55 C20,20 80,50 158,15 L158,72 L-5,72 Z"
                fill="#14CCC3"
              />
             
              <path
                d="M-5,65 C20,32 80,60 158,28 L158,72 L-5,72 Z"
                fill="#122E3F"
              />
            </svg> */}

            {/* CARD CONTENT */}
            <div
              style={{
                position: "absolute",
                top: "23px",
                left: 0,
                right: 0,
                bottom: "60px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 14px 0",
                zIndex: 2,
              }}
            >
              {/* Logo + Company Name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                {employee.logoUrl ? (
                  <img
                    src={employee.logoUrl}
                    alt="company logo"
                    style={{
                      width: "30px",
                      height: "30px",
                      // left: "3.16px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "#E1F5EE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: "1px solid #14CCC3",
                    }}
                  >
                    <Icon
                      icon="mdi:office-building-outline"
                      style={{ fontSize: "14px", color: "#14CCC3" }}
                    />
                  </div>
                )}
                <div>
                  <p
                    style={{
                      fontSize: "10.96px",
                      fontWeight: 600,
                      color: "#181918",
                      lineHeight: "11px",
                      margin: 0,
                    }}
                  >
                    {employee.companyName}
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
                    {employee.companyTagline}
                  </p>
                </div>
              </div>

              {/* Avatar — Figma: 79.63×79.63px circular */}
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

              {/* Name — Figma: Montserrat 600, 15px */}
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#181918",
                  lineHeight: "18px",
                  margin: "0 0 2px",
                  textAlign: "center",
                  letterSpacing: "0.3px",
                  whiteSpace: "nowrap",
                }}
              >
                {employee.name}
              </p>

              {/* Role — Figma: Montserrat 400, 8px, centered 59px wide */}
              <p
                style={{
                  fontSize: "8px",
                  fontWeight: 400,
                  color: "#181918",
                  lineHeight: "10px",
                  margin: "0 0 8px",
                  textAlign: "center",
                  width: "59px",
                }}
              >
                {employee.role}
              </p>

              {/* Info rows — Figma: Montserrat 400, 7.69px */}
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

          {/* ══════════════════════════════════════
              BACK CARD — QR, same dimensions
          ══════════════════════════════════════ */}
          <div
            className="relative flex-shrink-0"
            style={{
              width: "153px",
              height: "241px",
              borderRadius: "14px",
              background: "#FBFBF3",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              fontFamily: "'Montserrat', sans-serif",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* TOP BAR */}
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

            {/* BOTTOM WAVE */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 153 72"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "153px",
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

            {/* QR — Figma: 79.63×79.63px, vertically centered */}
            <img
              src={qrUrl}
              alt="employee QR code"
              style={{
                width: "79px",
                height: "79px",
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
