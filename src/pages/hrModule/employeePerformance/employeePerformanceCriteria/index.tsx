import { Icon } from "@iconify/react";
import CustomTable from "../../../../components/customTable";
import { useAppNavigate } from "../../../../hooks/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployeePerformanceCriteria } from "../../../../api/hrServices";
export default function EmployeePerformanceCriteria() {
  const { goTo } = useAppNavigate();
  const { data: getALLPerformanceCriteria, isLoading } = useQuery({
    queryKey: ["getAllEmployeePerformanceCriteria"],
    queryFn: getAllEmployeePerformanceCriteria,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const performanceCriteria: any[] =
    getALLPerformanceCriteria?.data?.data || [];
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Employee Performance Criteria
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
                goTo("/hr-module/employee-performance/criteria/create");
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
                "Parent",
                "Criteria",
                "Total Score",
                "Is Group",
                "Type",
              ]}
              data={performanceCriteria.map((item) => [
                item.parent?.criteria || item.parent?.name || "-",
                item.criteria || "-",
                item.total || "-",
                item.isGroup || "-",
                item.employeeType?.name || "-",
              ])}
            />
          </div>
        </div>
      </div>
    </>
  );
}
