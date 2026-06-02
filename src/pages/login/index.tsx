import { useFormik } from "formik";
import bgimage from "../../assets/loginBg.png";
import logo from "../../assets/logo.png";
import berryboostlogo from "../../assets/BerryBoost Logo.jpg";
import CustomInput from "../../components/customInput";
import CustomToggles from "../../components/custontogles";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setToken, setUser } from "../../redux/userSlice";
import PasswordFeild from "../../components/passwordFeild";
import { LoginvalidationSchema } from "../../utils/validations";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useAppNavigate } from "../../hooks/navigation";
import { UserLogin } from "../../api/userServices";
import { notifyError, notifySuccess } from "../../components/toast";

export default function Login() {
  const { goTo } = useAppNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginvalidationSchema,

    onSubmit: async (values) => {
      if (isLoading) return;
      try {
        setIsloading(true);
        const res = await UserLogin(values);
        const data = res.data;
        notifySuccess("Login successful!");
        dispatch(setToken(data.token));
        dispatch(setIsLoggedIn(true));
        dispatch(setUser({ _id: data.user._id }));
        localStorage.setItem("token", data.token);
        goTo("/360-dashboard");
      } catch (error: any) {
        console.log("Login failed", error);
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";
        notifyError(message);
      } finally {
        setIsloading(false);
      }
    },
  });
  useEffect(() => {
    document.title = "Login — BB-360";
  }, []);
  return (
    <div className="flex items-center h-screen ">
      <div className="w-0 h-screen md:w-1/2 xl:w-3/4">
        <div
          className="w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${bgimage})` }}
        ></div>
      </div>

      <div className="flex flex-col justify-between w-full h-screen p-12 ite md:w-1/2 xl:w-1/4">
        <div>
          <img src={logo} alt="logo" className="mx-auto h-21 w-21" />{" "}
          <p className="text-[20px] font-semibold mt-12 text-[#1A1A1A]">
            Nice to see you again
          </p>
          <form className="mt-6 space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <CustomInput
                label="Email"
                name="email"
                placeholder="Enter User Name"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div>
              <PasswordFeild
                label="Password"
                name="password"
                placeholder="Enter Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-2">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <CustomToggles />
                </div>
                <p className="text-xs text-[#1A1A1A]">Remember me</p>
              </div>
              <p className="text-xs text-[#007AFF]">Forgot password?</p>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full h-10 mt-8 text-base font-bold text-white rounded-md cursor-pointer bg-secondary"
            >
              {isLoading ? (
                <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <div className="border-t border-[#E5E5E5] mt-8"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={berryboostlogo}
              alt="berryboostlogo"
              className="w-6 h-6"
            />{" "}
            <p className="text-xs text-heading1">BerryBoost</p>
          </div>
          <p className="text-xs text-heading2">© BerryBoost Login 2026</p>
        </div>
      </div>
    </div>
  );
}
