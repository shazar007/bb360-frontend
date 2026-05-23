import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDepartments, setEmployees, setWorkCalendars } from "./userSlice";
import { getAllEmployees } from "../api/employeesServices";
import { getAllDepartments } from "../api/classificationServices";
import { getAllWorkCalendar } from "../api/hrServices";

export default function AppLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      try {
        const [emp, dep, cal] = await Promise.all([
          getAllEmployees(),
          getAllDepartments(),
          getAllWorkCalendar(),
        ]);

        dispatch(setEmployees(emp.data.data));
        dispatch(setDepartments(dep.data.data));
        dispatch(setWorkCalendars(cal.data.data));
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  return null;
}
