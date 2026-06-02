import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDepartments, setEmployees, setWorkCalendars } from "./userSlice";
import { getAllEmployees } from "../api/employeesServices";
import { getAllDepartments } from "../api/classificationServices";
import { getAllWorkCalendar } from "../api/hrServices";
import type { RootState } from "./store";

export default function AppLoader() {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.user.employees);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn || employees.length > 0) return;

    const load = async () => {
      try {
        const [emp, dep, cal] = await Promise.all([
          getAllEmployees(),
          getAllDepartments(),
          getAllWorkCalendar(),
        ]);

        const mappedEmployees = emp.data.data.map(
          (e: { _id: string; name: string }) => ({
            _id: e._id,
            name: e.name,
          }),
        );

        dispatch(setEmployees(mappedEmployees));
        dispatch(setDepartments(dep.data.data));
        dispatch(setWorkCalendars(cal.data.data));
      } catch (err) {
        console.error("AppLoader failed:", err);
      }
    };

    load();
  }, [isLoggedIn]);

  return null;
}
