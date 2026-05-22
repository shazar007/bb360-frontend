import { Icon } from "@iconify/react";
import { useState } from "react";
import AttendanceDashboard from "./attendanceDashboard";
import PayrollDashboard from "./payrollDashboard";
import Filter from "../../../../components/customDatefilter";
export default function HrPayrollDashboard() {
  const [openFilter, setOpenFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("hr");

  const topCards = [
    {
      title: "Total Employee",
      value: "47",
    },

    {
      title: "Total Departments",
      value: "5",
    },
  ];

  const dashboardCards = [
    {
      title: "Department Wise Employee",

      data: [
        {
          label: "HR & Payroll",
          value: "6",
        },

        {
          label: "Purchase",
          value: "8",
        },

        {
          label: "Information & Technology",
          value: "14",
        },

        {
          label: "Manufacturing",
          value: "9",
        },
      ],
    },

    {
      title: "Location Wise Employee",

      data: [
        {
          label: "Finish Goods Store",
          value: "14",
        },

        {
          label: "Head Office",
          value: "8",
        },

        {
          label: "Karachi",
          value: "14",
        },

        {
          label: "Factory",
          value: "9",
        },
      ],
    },

    {
      title: "Type Wise Employee",

      data: [
        {
          label: "Helper",
          value: "14",
        },

        {
          label: "Manager",
          value: "8",
        },

        {
          label: "Commission Based",
          value: "14",
        },

        {
          label: "Probation",
          value: "9",
        },
      ],
    },

    {
      title: "Status Wise Employee",

      data: [
        {
          label: "Probation",
          value: "6",
        },

        {
          label: "Working",
          value: "8",
        },

        {
          label: "Terminated",
          value: "14",
        },
      ],
    },

    {
      title: "Experience Of Employees",

      data: [
        {
          label: "One Year",
          value: "14",
        },

        {
          label: "Two Year",
          value: "8",
        },

        {
          label: "Three Year",
          value: "14",
        },

        {
          label: "Four Years",
          value: "9",
        },
      ],
    },

    {
      title: "Type Wise Employee",

      data: [
        {
          label: "Male",
          value: "14",
        },

        {
          label: "Female",
          value: "8",
        },

        {
          label: "Others",
          value: "01",
        },
      ],
    },
  ];

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />

            <p className="text-base font-semibold md:text-lg text-heading1">
              HR & Payroll Dashboard
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <div className="relative w-full md:w-60">
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
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>
        {openFilter && <Filter onClose={() => setOpenFilter(false)} />}
        <div className="grid grid-cols-1 gap-3 mt-3 xl:grid-cols-12">
          <div className="xl:col-span-2">
            <div className="flex flex-col gap-3 p-4 bg-white rounded-2xl sm:flex-row xl:flex-col">
              <button
                onClick={() => setActiveTab("hr")}
                className={`w-full h-10 rounded-md text-sm text-left px-4 cursor-pointer ${
                  activeTab === "hr"
                    ? "bg-primary text-white"
                    : "bg-[#F6F6F6] text-heading1"
                }`}
              >
                HR Dashboard
              </button>

              <button
                onClick={() => setActiveTab("attendance")}
                className={`w-full h-10 rounded-md text-sm text-left px-4 cursor-pointer ${
                  activeTab === "attendance"
                    ? "bg-primary text-white"
                    : "bg-[#F6F6F6] text-heading1"
                }`}
              >
                Attendance Dashboard
              </button>

              {/* <button
                onClick={() => setActiveTab("payroll")}
                className={`w-full h-10 rounded-md text-sm text-left px-4 cursor-pointer ${
                  activeTab === "payroll"
                    ? "bg-primary text-white"
                    : "bg-[#F6F6F6] text-heading1"
                }`}
              >
                Payroll Dashboard
              </button> */}
            </div>
          </div>

          <div className="xl:col-span-10">
            {activeTab === "hr" && (
              <div className="p-4 bg-white rounded-2xl">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {topCards.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-5 bg-[#F6F6F6] rounded-md h-10"
                    >
                      <p className="text-xs font-semibold text-heading1">
                        {item.title}
                      </p>

                      <div className="flex items-center justify-center text-xs font-semibold bg-white rounded-md w-7 h-7 text-heading1">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-2 xl:grid-cols-3">
                  {dashboardCards.map((card, index) => (
                    <div
                      key={index}
                      className="p-4 border border-[#E9E9E9] rounded-2xl shadow-[0_1px_12px_#0000000D]"
                    >
                      <p className="text-xs font-semibold text-heading1">
                        {card.title}
                      </p>

                      <div className="mt-4">
                        {card.data.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-2 border-b border-[#EFEFEF] last:border-none"
                          >
                            <p className="text-xs text-heading1">
                              {item.label}
                            </p>

                            <p className="text-xs font-semibold text-heading1">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "attendance" && <AttendanceDashboard />}

            {activeTab === "payroll" && <PayrollDashboard />}
          </div>
        </div>
      </div>
    </>
  );
}
