import { useQuery } from "@tanstack/react-query";

import dayjs, { Dayjs } from "dayjs";

import { useEffect, useState } from "react";
import { useFormik } from "formik";

import type { AxiosResponse } from "axios";
import { Icon } from "@iconify/react";
import { notifyError, notifySuccess } from "../../../components/toast";
import { SyncLoader } from "react-spinners";
import { useDebounce } from "../../../hooks/deBounce";
import CustomTimePicker from "../../../components/timePicker";
import SearchById from "../../../components/SearchBar/searchById";
import CustomTable from "../../../components/customTable";
import {
  createDailyAttendance,
  getAllAttendance,
  updateAttendanceAdmin,
} from "../../../api/hrServices";
import { MonthYearFilter } from "../../../components/monthYearFilter";

const titles = [
  "Employee Id",
  "Employee Name",
  "Date",
  "CheckIn",
  "CheckOut",
  "Checkout Location",
  "Status",
  "Action",
];

export default function Attendance() {
  useEffect(() => {
    document.title = "HR-Management | Attendance";
  }, []);

  const [activeTab, setActiveTab] = useState<"Field Staff" | "Office Staff">(
    "Field Staff",
  );

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [rotated, setRotated] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [openModel, setOpenModel] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [isloadingAttendance, setLoadingAttendance] = useState(false);

  const debouncedSearchId = useDebounce(searchId, 500);
  const debouncedSearchName = useDebounce(searchName, 500);
  const handleClickRefech = () => {
    setRotated(true);
    refetch();
    setTimeout(() => setRotated(false), 500);
  };

  const searchValue = debouncedSearchId || debouncedSearchName;
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Present":
        return "text-green-600 border border-green-600";
      case "Absent":
        return "text-red-600 border border-red-600";
      case "Late":
        return "text-orange-500 border border-orange-500";
      case "On Leave":
        return "text-blue-600 border border-blue-600";
      default:
        return "text-gray-500 border border-gray-500";
    }
  };

  const [selectedMonthYear, setSelectedMonthYear] = useState<{
    month: number;
    year: number;
  }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const { refetch } = useQuery<AxiosResponse<any>>({
    queryKey: ["Attendance", searchValue, selectedMonthYear],
    queryFn: () =>
      getAllAttendance({
        search: searchValue,
        month: selectedMonthYear.month,
        year: selectedMonthYear.year,
      }),
    placeholderData: (previousData) => previousData,
  });

  const dummyAttendanceData = [
    {
      _id: "1",
      employee: {
        employeeId: "EMP-001",
        employeeName: "Ali Khan",
        employeeType: "Field Staff",
      },
      date: "2026-07-01",
      checkIn: {
        time: "2026-07-01T09:00:00",
      },
      checkOut: {
        time: "2026-07-01T18:00:00",
        location: {
          lat: 31.5204,
          lng: 74.3587,
        },
      },
      status: "Present",
    },

    {
      _id: "2",
      employee: {
        employeeId: "EMP-002",
        employeeName: "Ahmed Raza",
        employeeType: "Office Staff",
      },
      date: "2026-07-02",
      checkIn: {
        time: "2026-07-02T09:30:00",
      },
      checkOut: {
        time: "2026-07-02T17:45:00",
        location: {
          lat: 24.8607,
          lng: 67.0011,
        },
      },
      status: "Late",
    },

    {
      _id: "3",
      employee: {
        employeeId: "EMP-003",
        employeeName: "Usman Tariq",
        employeeType: "Admin",
      },
      date: "2026-07-03",
      checkIn: {
        time: "2026-07-03T08:50:00",
      },
      checkOut: {
        time: "2026-07-03T17:00:00",
        location: {
          lat: 33.6844,
          lng: 73.0479,
        },
      },
      status: "Present",
    },

    {
      _id: "4",
      employee: {
        employeeId: "EMP-004",
        employeeName: "Sara Khan",
        employeeType: "Field Staff",
      },
      date: "2026-07-04",
      checkIn: {
        time: "2026-07-04T10:15:00",
      },
      checkOut: {
        time: "2026-07-04T19:10:00",
        location: {
          lat: 31.4504,
          lng: 73.135,
        },
      },
      status: "Absent",
    },

    {
      _id: "5",
      employee: {
        employeeId: "EMP-005",
        employeeName: "Hassan Ali",
        employeeType: "Office Staff",
      },
      date: "2026-07-05",
      checkIn: {
        time: "2026-07-05T09:05:00",
      },
      checkOut: {
        time: "2026-07-05T18:20:00",
        location: {
          lat: 30.1575,
          lng: 71.5249,
        },
      },
      status: "On Leave",
    },
  ];

  const filteredData = dummyAttendanceData.filter((v: any) => {
    if (activeTab === "Office Staff")
      return v.employee.employeeType === "Office Staff";
    if (activeTab === "Field Staff")
      return v.employee.employeeType === "Field Staff";
    if (activeTab === "Admin") return v.employee.employeeType === "Admin";
    return true;
  });

  const tableData =
    filteredData?.map((v: any) => [
      v.employee?.employeeId,
      v.employee.employeeName,

      v.date ? dayjs(v.date).format("YYYY-MM-DD") : "--",
      v.checkIn?.time ? dayjs(v.checkIn.time).format("HH:mm") : "--",
      v.checkOut?.time ? dayjs(v.checkOut.time).format("HH:mm") : "--",

      <GeoAddress
        lat={v.checkOut?.location?.lat}
        lng={v.checkOut?.location?.lng}
      />,

      <p
        className={`px-2 py-0.5 rounded inline-block text-center ${getStatusClasses(
          v?.status,
        )}`}
      >
        {v?.status}
      </p>,
      <button
        disabled={v.status == "On Leave"}
        className="text-primary disabled:text-[#7d7d7d]/48"
      >
        <Icon
          icon="basil:edit-outline"
          key={v._id}
          className="text-xl cursor-pointer"
          onClick={() => {
            setEditing(v);
            setOpenModel(true);
          }}
        />
      </button>,
    ]) || [];

  const formik = useFormik<{
    checkIn: Dayjs | null;
    checkOut: Dayjs | null;
  }>({
    enableReinitialize: true,
    initialValues: {
      checkIn: editing?.checkIn?.time ? dayjs(editing.checkIn.time) : null,
      checkOut: editing?.checkOut?.time ? dayjs(editing.checkOut.time) : null,
    },
    onSubmit: (values) => {
      setLoading(true);

      const payload = {
        checkInTime: values.checkIn ? values.checkIn.toISOString() : undefined,

        checkOutTime: values.checkOut
          ? values.checkOut.toISOString()
          : undefined,
      };

      updateAttendanceAdmin(editing._id, payload)
        .then(() => {
          notifySuccess("Attendance updated successfully");
          setOpenModel(false);
          setEditing(null);
          formik.resetForm();
          refetch();
        })
        .catch(() => notifyError("Failed to update Attendance"))
        .finally(() => setLoading(false));
    },
  });

  const handleGenerateAttendance = async () => {
    setLoadingAttendance(true);
    try {
      const res = await createDailyAttendance();

      notifySuccess(
        res.data?.message || "Daily attendance generated successfully",
      );
      refetch();
    } catch (error: any) {
      console.error("Generate attendance error:", error);

      notifyError(
        error.response?.data?.message || "Failed to generate daily attendance",
      );
    } finally {
      setLoadingAttendance(false);
    }
  };
  return (
    <div className="bg-[#F7F7F7] md:h-[calc(100vh-108px)] h-auto rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
          <p className="text-base font-semibold md:text-lg text-heading1">
            Attendance
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
          <div className="flex flex-wrap w-full gap-3 sm:w-auto md:flex-nowrap">
            <div
              onClick={handleClickRefech}
              className="flex items-center justify-center h-10 bg-[#ECF0F4] rounded-md cursor-pointer min-w-10"
            >
              <Icon
                icon="ion:reload-outline"
                className={`text-xl ${
                  rotated ? "animate-spin" : ""
                } transition-transform duration-200`}
              />
            </div>
            <div className="w-[calc(100%-60px)] md:w-45 lg:w-48 xl:w-auto 2xl:w-auto">
              <MonthYearFilter
                value={selectedMonthYear}
                onChange={setSelectedMonthYear}
              />{" "}
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-4 xl:flex-nowrap md:w-auto">
        <div className="flex flex-wrap w-full gap-4 mb-4 md:w-auto md:mb-0 ">
          {["Field Staff", "Office Staff", "Admin"].map((role) => (
            <div
              key={role}
              onClick={() => setActiveTab(role as any)}
              className={`cursor-pointer rounded-t-xl rounded-b-xl md:rounded-b-none h-10 md:h-12 flex justify-center items-center sm:w-30 xl:w-25 w-full ${
                activeTab === role
                  ? " bg-white text-heading1"
                  : "bg-[#E5EBF7] text-[#7d7d7d]"
              }`}
            >
              <p className="text-xs lg:text-sm">{role}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 md:flex-nowrap">
          <div className="w-full md:w-53 lg:w-auto">
            {" "}
            <SearchById
              value={searchId}
              onChange={setSearchId || setSearchName}
            />
          </div>
          <button
            onClick={handleGenerateAttendance}
            className="flex items-center justify-center w-full h-10 gap-3 mb-4 text-sm text-white rounded-md cursor-pointer md:mb-2 md:w-40 bg-primary"
          >
            {isloadingAttendance ? (
              <SyncLoader color="#fff" size={6} />
            ) : (
              "Generate Attendance"
            )}
          </button>
        </div>
      </div>{" "}
      <div
        className={`bg-[#ffffff]  rounded-xl h-auto  ${
          activeTab === "Field Staff" ? "rounded-tl-none" : ""
        }`}
      >
        <div className="flex justify-between items-center px-4.5 py-3 ">
          <p className="text-xs font-semibold text-primary">Employee’s_List</p>
        </div>

        <CustomTable
          norounded
          height="auto"
          headers={titles}
          data={tableData}
        />
      </div>
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative mx-3 bg-white rounded-xl w-150">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                {" "}
                Updated Attendance
              </h2>
              <button
                className="cursor-pointer"
                onClick={() => setOpenModel(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={formik.handleSubmit} className="p-4">
              <div className="space-y-4">
                <CustomTimePicker
                  label="CheckIn"
                  value={formik.values.checkIn}
                  onChange={(checkIn) =>
                    formik.setFieldValue("checkIn", checkIn)
                  }
                />

                <CustomTimePicker
                  label="Check out"
                  value={formik.values.checkOut}
                  onChange={(checkOut) =>
                    formik.setFieldValue("checkOut", checkOut)
                  }
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full h-10 text-white rounded-md cursor-pointer md:w-50 bg-primary"
                >
                  {isloading ? (
                    <SyncLoader color="#fff" size={6} />
                  ) : (
                    "Updated Attendaence"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

interface GeoAddressProps {
  lat: number;
  lng: number;
}

const GeoAddress: React.FC<GeoAddressProps> = ({ lat, lng }) => {
  const [address, setAddress] = useState<string>("Loading...");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&language=en&key=AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A`,
        );
        const data = await res.json();
        if (data.status === "OK" && data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
        } else {
          setAddress("--");
        }
      } catch (error) {
        console.error(error);
        setAddress("Error fetching address");
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return <p>{address}</p>;
};
