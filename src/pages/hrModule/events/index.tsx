import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import { useFormik } from "formik";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvents,
} from "../../../api/hrServices";
import { notifyError, notifySuccess } from "../../../components/toast";
import { SyncLoader } from "react-spinners";
import CustomDatePicker from "../../../components/datePicker";
import CustomSelect from "../../../components/customSelect";
import CustomInput from "../../../components/customInput";
import CustomTextarea from "../../../components/customTextarea";
import CustomImagePicker from "../../../components/customImagePicker";
import { EventSchema } from "../../../utils/constant";
export default function Events() {
  const [editing, setEditing] = useState<any>(null);
  const [openModel, setOpenModel] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [isloadingDelete, setLoadingDelete] = useState(false);

  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: ["AllEvents"],
    queryFn: () => getAllEvents(),
    staleTime: 5 * 60 * 1000,
  });

  const dummyEventsData = [
    {
      _id: "1",
      coverImage:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
      date: "2026-07-10",
      heading: "Annual HR Meeting",
      overview:
        "Company annual HR meeting for discussing employee performance and company growth.",
      category: "HR",
    },

    {
      _id: "2",
      coverImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      date: "2026-07-15",
      heading: "Office Staff Workshop",
      overview:
        "Workshop for office staff to improve productivity and management skills.",
      category: "Office Staff",
    },

    {
      _id: "3",
      coverImage:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
      date: "2026-07-20",
      heading: "Field Staff Training",
      overview:
        "Special training session for field staff regarding customer communication.",
      category: "Field Staff",
    },

    {
      _id: "4",
      coverImage:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
      date: "2026-07-25",
      heading: "Company Celebration",
      overview:
        "Celebration event for achieving yearly targets and employee appreciation.",
      category: "HR",
    },
  ];

  let AllEvents = dummyEventsData;

  useEffect(() => {
    document.title = "HR-Management | Events";
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      coverImage: editing?.coverImage || "",
      date: editing?.date ? dayjs(editing.date) : null,
      heading: editing?.heading || "",
      overview: editing?.overview || "",
      category: editing?.category || "",
    },
    validationSchema: EventSchema,
    onSubmit: (values) => {
      setLoading(true);
      if (editing) {
        updateEvents(editing._id, values)
          .then(() => {
            notifySuccess("Account updated successfully");
            setOpenModel(false);
            setEditing(null);
            formik.resetForm();
            refetch();
          })
          .catch((error) => {
            console.error(error);
            notifyError("Failed to update Account.");
          })
          .finally(() => setLoading(false));
      } else {
        createEvent(values)
          .then(() => {
            notifySuccess("Account added successfully");
            setOpenModel(false);
            formik.resetForm();
            refetch();
          })
          .catch((error) => {
            console.error(error);
            notifyError("Failed to add Account.");
          })
          .finally(() => setLoading(false));
      }
    },
  });
  const handleDelete = () => {
    if (!editing?._id) return;
    setLoadingDelete(true);
    deleteEvent(editing._id)
      .then(() => {
        notifySuccess("Account deleted successfully");
        setDeleteConfirmation(false);
        setEditing(null);
        refetch();
      })
      .catch((error) => {
        console.error("Failed to delete Account:", error);
        notifyError("Failed to delete Account. Please try again.");
      })
      .finally(() => setLoadingDelete(false));
  };
  return (
    <>
      <div className="bg-[#F7F7F7] md:h-[calc(100vh-108px)] h-auto rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon icon="solar:menu-dots-square-linear" className="text-lg" />
            <p className="text-base font-semibold md:text-lg text-heading1">
              Events
            </p>
          </div>
          <button
            onClick={() => {
              setOpenModel(true);
              setEditing(null);
            }}
            className="flex items-center justify-center w-full h-10 gap-2 text-sm text-white rounded-md cursor-pointer bg-primary md:w-35"
          >
            <Icon icon="basil:add-outline" className="text-lg text-white" />
            <p className="  text-sm font-medium text-white">Add Events</p>
          </button>
        </div>
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="bg-[#ffffff] overflow-y-auto mt-4 p-4 rounded-lg 2xl:h-[calc(79.4vh-0px)] xl:h-[calc(69.4vh-0px)]"
        >
          <p className="text-sm text-[#7d7d7d] leading-[100%]">Events List</p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {isLoading || isFetching ? (
              <div className="flex items-center justify-center w-full py-10">
                <SyncLoader size={18} color="#14CCC3" />
              </div>
            ) : AllEvents && AllEvents.length > 0 ? (
              AllEvents.map((e: any, index: number) => (
                <div
                  key={e._id || index}
                  className="bg-white rounded-2xl drop-shadow-lg lg:w-[calc(50%-10px)] w-full group flex flex-col overflow-hidden"
                >
                  <div className="flex-1 p-4 ">
                    <p className="text-[#131313] md:text-[32px] text-[18px] font-medium lg:w-max w-auto border-b-2 border-primary">
                      {e.heading}
                    </p>
                    <div className="h-auto lg:h-30">
                      {" "}
                      <p className="mt-5 text-sm md:text-base text-[#7d7d7d]">
                        {e.overview}
                      </p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden ">
                    <img
                      src={e.coverImage}
                      className="object-cover w-full h-auto rounded-b-lg lg:h-100"
                      alt={e.heading}
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 opacity-50 md:opacity-0 bg-black/70 group-hover:opacity-100">
                      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full cursor-pointer">
                        <button
                          onClick={() => {
                            setEditing(e);
                            setOpenModel(true);
                          }}
                        >
                          <Icon
                            icon="basil:edit-outline"
                            className="cursor-pointer text-[20px]"
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full cursor-pointer">
                        <button
                          onClick={() => {
                            setEditing(e);
                            setDeleteConfirmation(true);
                          }}
                        >
                          <Icon
                            className="cursor-pointer "
                            color="#E90761"
                            height="18"
                            width="24"
                            icon="mingcute:delete-fill"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-full py-10 text-center text-gray-500">
                No events found.
              </p>
            )}
          </div>
        </div>
      </div>
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="relative bg-white mx-3 rounded-xl w-250 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xs font-semibold text-heading1">
                {" "}
                {editing ? "Update Event" : "Add Event"}
              </h2>
              <button
                className="cursor-pointer"
                onClick={() => setOpenModel(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-6 p-4">
              <div>
                {" "}
                <CustomImagePicker
                  placeholder="Upload Cover Photos"
                  label="Cover Photos"
                  // fileType="Hr-Management"
                  // type="image"
                  value={formik.values.coverImage}
                  onChange={(val: any) =>
                    formik.setFieldValue("coverImage", val)
                  }
                />
                {formik.touched.coverImage &&
                  formik.errors.coverImage &&
                  typeof formik.errors.coverImage === "string" && (
                    <div className="text-xs text-red-500">
                      * {formik.errors.coverImage}
                    </div>
                  )}
              </div>
              <div>
                {" "}
                <CustomDatePicker
                  label="Date"
                  placeholder="Select the Date"
                  value={formik.values.date}
                  onChange={(date) => formik.setFieldValue("date", date)}
                />
                {formik.touched.date &&
                  formik.errors.date &&
                  typeof formik.errors.date === "string" && (
                    <div className="text-xs text-red-500">
                      * {formik.errors.date}
                    </div>
                  )}
              </div>

              <div>
                {" "}
                <CustomSelect
                  placeholder="Category"
                  label="Category"
                  value={formik.values.category}
                  options={[
                    { value: "Office Staff", label: "Office Staff" },
                    { value: "Field Staff", label: "Field Staff" },
                    { value: "HR", label: "HR" },
                  ]}
                  onChange={(val) => formik.setFieldValue("category", val)}
                />
                {formik.touched.category &&
                  formik.errors.category &&
                  typeof formik.errors.category === "string" && (
                    <div className="text-xs text-red-500">
                      * {formik.errors.category}
                    </div>
                  )}
              </div>

              <div>
                {" "}
                <CustomInput
                  label="Heading"
                  placeholder="Write the Heading"
                  value={formik.values.heading}
                  onChange={formik.handleChange}
                  name="heading"
                />
                {formik.touched.heading &&
                  formik.errors.heading &&
                  typeof formik.errors.heading === "string" && (
                    <div className="text-xs text-red-500">
                      * {formik.errors.heading}
                    </div>
                  )}
              </div>

              <div>
                <CustomTextarea
                  label="Overview Detail"
                  placeholder="Write the Overview Detail"
                  value={formik.values.overview}
                  onChange={formik.handleChange}
                  name="overview"
                />{" "}
                {formik.touched.overview &&
                  formik.errors.heading &&
                  typeof formik.errors.overview === "string" && (
                    <div className="text-xs text-red-500">
                      * {formik.errors.overview}
                    </div>
                  )}
              </div>

              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  className="h-10 w-full md:w-32 text-sm bg-primary rounded-md gap-3 cursor-pointer flex justify-center items-center text-white font-medium"
                >
                  {isloading ? (
                    <SyncLoader color="#fff" size={6} />
                  ) : editing ? (
                    "Update Event"
                  ) : (
                    "Add Event"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl w-100 rounded-2xl">
            <div className="p-4 flex justify-end border-b-[0.5px] border-[#304250]/36">
              <p
                onClick={() => setDeleteConfirmation(false)}
                className="cursor-pointer"
              >
                ✕
              </p>
            </div>
            <div className="p-4 mx-auto w-60">
              <p className="text-2xl font-semibold text-center">Delete Event</p>
              <p className="text-center text-heading1">
                Are you sure to delete this Event?
              </p>
            </div>
            <div className="flex justify-between gap-2 p-4 pt-0">
              <button
                className="h-10 rounded-md cursor-pointer w-25"
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                onClick={() => setDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                className="h-10 w-25 cursor-pointer rounded-md text-white bg-[#FF0000]"
                onClick={handleDelete}
              >
                {isloadingDelete ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
