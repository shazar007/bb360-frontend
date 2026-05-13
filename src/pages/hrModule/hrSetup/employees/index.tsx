import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useEffect, useState } from "react";

const tableData = [
  {
    employeeId: "EMP-000121",
    name: "Salem Al Mansouri",
    dob: "09-May-1988",
    hireDate: "21-Dec-2024",
    city: "Lahore",
    email: "Salemalmansouri@gmail.com",
    phone: "+966534928124",
    address: "19 Ibn Kariz Street, Sakaka",
    jobTitle: "CFO",
    department: "Production",
    location: "Factory",
  },
];
export default function Employees() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  useEffect(() => {
    const handleClick = () => setOpenMenuIndex(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  const { goTo } = useAppNavigate();

  const handlePrint = (item: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Employee Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #000;
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
          }

          .info {
            margin-bottom: 10px;
            font-size: 14px;
          }

          .info b {
            display: inline-block;
            width: 180px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
          }

          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }

          th {
            background: #f2f2f2;
          }
        </style>
      </head>

      <body>
        <h2>Employee Details Report</h2>

        <div class="info"><b>Employee ID:</b> ${item.employeeId || "-"}</div>
        <div class="info"><b>Name:</b> ${item.name || "-"}</div>
        <div class="info"><b>Date of Birth:</b> ${item.dob || "-"}</div>
        <div class="info"><b>Hire Date:</b> ${item.hireDate || "-"}</div>
        <div class="info"><b>City:</b> ${item.city || "-"}</div>
        <div class="info"><b>Email:</b> ${item.email || "-"}</div>
        <div class="info"><b>Phone:</b> ${item.phone || "-"}</div>
        <div class="info"><b>Address:</b> ${item.address || "-"}</div>
        <div class="info"><b>Job Title:</b> ${item.jobTitle || "-"}</div>
        <div class="info"><b>Department:</b> ${item.department || "-"}</div>
        <div class="info"><b>Location:</b> ${item.location || "-"}</div>

        <script>
          window.onload = function () {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Employees
            </p>
          </div>

          <div className="flex flex-col items-stretch w-full gap-2 md:flex-row md:items-center md:w-auto">
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo("/hr-module/hr-setup/employees/upload");
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary rounded-md text-white cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Upload
            </button>

            <button
              onClick={() => {
                goTo("/hr-module/hr-setup/employees/create");
              }}
              className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-primary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none"
            >
              <Icon icon="basil:add-outline" className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>

        <div className="mt-3 bg-bgprimary rounded-2xl">
          <div className="mt-3">
            <CustomTable
              loading={false}
              height="60vh"
              headers={[
                "Edit",
                "View",
                "Report",
                "Employee ID",
                "Employee Name",
                "DOB",
                "Hire Date",
                "City",
                "Email",
                "Phone",
                "Address",
                "Job Title",
                "Department",
                "Location",
              ]}
              data={tableData.map((row, index) => [
                <div className="relative">
                  <Icon
                    icon="qlementine-icons:menu-burger-16"
                    className="text-lg cursor-pointer text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(index);
                    }}
                  />

                  {openMenuIndex === index && (
                    <div
                      className="absolute z-10 w-32 py-2 bg-white rounded-md shadow-md -right-20 top-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="w-full px-2 py-1 text-left hover:bg-gray-100">
                        Edit
                      </button>

                      <button className="w-full px-2 py-1 text-left text-red-500 hover:bg-gray-100">
                        Delete
                      </button>
                    </div>
                  )}
                </div>,

                <Icon
                  icon="hugeicons:view"
                  className="text-lg text-primary cursor-pointer"
                  onClick={() => handlePrint(row)}
                />,

                <Icon
                  icon="ion:print-outline"
                  onClick={() => handlePrint(row)}
                  className="text-lg text-primary cursor-pointer"
                />,

                row.employeeId,
                row.name,
                row.dob,
                row.hireDate,
                row.city,
                row.email,
                row.phone,
                row.address,
                row.jobTitle,
                row.department,
                row.location,
              ])}
            />
          </div>
        </div>
      </div>
    </>
  );
}
