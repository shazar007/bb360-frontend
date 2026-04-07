import { Icon } from "@iconify/react";
export default function DashBoard360() {
  const dashboardCards = [
    {
      title: "This Month Revenue",
      value: "Rs 255,924.20",
      previousLabel: "Previous Month:",
      previousValue: "Rs 168,924.00",
      icon: "fluent-mdl2:total",
    },
    {
      title: "This Month Expense",
      value: "Rs 255,924.20",
      previousLabel: "Previous Month:",
      previousValue: "Rs 168,924.00",
      icon: "quill:snooze-month",
    },
    {
      title: "This Month Profit",
      value: "Rs 255,924.20",
      previousLabel: "Previous Month:",
      previousValue: "Rs 168,924.00",
      icon: "streamline:graph",
    },
    {
      title: "Capital",
      value: "Rs 255,924.20",
      previousLabel: "Previous Month:",
      previousValue: "Rs 168,924.00",
      icon: "qlementine-icons:money-16",
    },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-4 mt-8 lg:flex-nowrap">
        <div className="w-full lg:w-[calc(40%-8px)] xl:w-[calc(20%-8px)]">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Sales 360 Dashboard
            </p>
          </div>
          <div className="flex flex-col justify-between p-4 mt-3 bg-white rounded-2xl">
            <p className="text-lg text-heading1 mb-3.5">Todo List</p>
            <div className="flex justify-between py-3.5 border-t border-primary">
              <p className="text-primary text-sm leading-[100%]">
                Pending Documents for WF Approve
              </p>
              <div className="flex items-center justify-center w-6 h-6 text-xs text-white rounded-lg bg-secondary">
                1
              </div>
            </div>
            <p className="my-2 text-xs text-heading1">
              Elit euismod mattis venenatis nullam. Odio risus morbi feugiat
              elit.
            </p>{" "}
            <div className="flex justify-between py-3.5 border-t border-dashed border-primary">
              <p className="text-primary text-sm leading-[100%]">
                Pending Documents for WF Approve
              </p>
              <div className="flex items-center justify-center w-6 h-6 text-xs text-white rounded-lg bg-secondary">
                3
              </div>
            </div>
            <p className="my-2 text-xs text-heading1">
              Elit euismod mattis venenatis nullam. Odio risus morbi feugiat
              elit.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[calc(60%-8px) xl:w-[calc(80%-8px)] grid gap-4  lg:grid-cols-2 xl:grid-cols-4 grid-cols-1 md:grid-cols-2">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-4 bg-white rounded-2xl h-45"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-semibold text-heading1">
                    {card.title}
                  </p>
                  <p className="text-[20px] mt-5.5 font-semibold text-heading2">
                    {card.value}
                  </p>
                </div>
                <div className="flex items-center justify-center h-10 rounded-md bg-secondary min-w-10">
                  <Icon icon={card.icon} className="text-lg text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-primary">
                <p className="text-xs font-semibold text-heading2">
                  {card.previousLabel}
                </p>
                <p className="text-xs font-normal text-heading2">
                  {card.previousValue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
