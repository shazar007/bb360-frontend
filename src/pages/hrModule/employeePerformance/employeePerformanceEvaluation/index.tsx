import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployeePerformanceEvaluation } from "../../../../api/hrServices";
import dayjs from "dayjs";
export default function EmployeePerformanceCriteria() {
  const { goTo, goWithState } = useAppNavigate();
  const { data: getEmployeePerformanceEvaluation, isLoading } = useQuery({
    queryKey: ["getAllEmployeePerformanceEvaluation"],
    queryFn: getAllEmployeePerformanceEvaluation,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const ALLgetEmployeePerformanceEvaluation: any[] =
    getEmployeePerformanceEvaluation?.data?.data || [];

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Employee Performance Evaluation
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
            <button className="w-full md:w-auto flex items-center justify-center h-10 gap-2 px-6 bg-secondary text-white rounded-md cursor-pointer shadow-[0_1px_12px_#0000001F] focus:outline-none">
              <Icon icon="mage:filter" className="w-5 h-5" />
              Filters
            </button>

            <button
              onClick={() => {
                goTo("/hr-module/employee-performance/evaluation/create");
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
              loading={isLoading}
              height="auto"
              headers={[
                "View",
                "Supervisor",
                "Employee",
                "Transaction Number",
                "Evaluation Date",
                "Total Score",
                "Obtain Score",
                "Percentage",
              ]}
              data={ALLgetEmployeePerformanceEvaluation.map((item: any) => {
                return [
                  <Icon
                    onClick={() =>
                      goWithState(
                        "/hr-module/employee-performance/evaluation/details",
                        {
                          id: item._id,
                          mode: "edit",
                          item: item,
                        },
                      )
                    }
                    icon="ant-design:eye-twotone"
                    className="text-xl text-primary cursor-pointer"
                  />,
                  item?.supervisor?.name || item?.supervisor?._id || "-",
                  item?.employee?.name || item?.employee?._id || "-",
                  item?.transactionNo || "-",
                  dayjs(item.evaluationDate).format("DD-MMM-YYYY"),
                  item?.totalScore ?? 0,
                  item?.obtainedTotal ?? 0,
                  item?.percentage || "-",
                ];
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
}
