import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
}

export default function CustomGpsDrawer({ onClose }: Props) {
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowDrawer(true);
    }, 10);
  }, []);

  const handleClose = () => {
    setShowDrawer(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-999 flex justify-end bg-black/20 transition-opacity duration-300 ${
        showDrawer ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-t-2xl w-full max-w-152.5 h-screen bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D8DEE6]">
          <p className="text-base font-semibold text-heading1">
            GPS Verification
          </p>

          <button
            onClick={handleClose}
            className="text-2xl cursor-pointer text-[#302250]"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* EMPLOYEE INFO */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="mb-1 text-xs text-heading1/60">Employee Name</p>

              <div className="h-11 px-4 flex items-center rounded-lg bg-[#F4F7FA] text-sm text-heading1">
                Bilal Hassan
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs text-heading1/60">Employee ID</p>

              <div className="h-11 px-4 flex items-center rounded-lg bg-[#F4F7FA] text-sm text-heading1">
                EMP-121
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <p className="mb-1 text-xs text-heading1/60">Location</p>

            <div className="h-11 px-4 flex items-center rounded-lg bg-[#F4F7FA] text-sm text-heading1">
              Johar Town Lahore
            </div>
          </div>

          {/* TIME */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="mb-1 text-xs text-heading1/60">First In</p>

              <div className="h-11 px-4 flex items-center rounded-lg bg-[#F4F7FA] text-sm text-heading1">
                08:54 AM
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs text-heading1/60">Last Out</p>

              <div className="h-11 px-4 flex items-center rounded-lg bg-[#F4F7FA] text-sm text-heading1">
                06:12 PM
              </div>
            </div>
          </div>

          {/* MAP */}
          <div>
            <p className="mb-3 text-sm font-medium text-heading1">
              Live Location
            </p>

            <div className="w-full h-87.5 rounded-2xl overflow-hidden border border-[#D8DEE6]">
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=Lahore&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
