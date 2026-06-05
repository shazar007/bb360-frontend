import { useFormik } from "formik";
import bgimage from "../../assets/loginScreen.jpg";
import logo from "../../assets/BB360 degree logo 1.png";
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
        dispatch(setUser(data.user));
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
    <div className="flex items-center w-screen h-screen">
      <div
        className="relative flex items-center justify-end w-0 md:w-1/2  lg:w-[65%] xl:w-3/4  h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        {" "}
      </div>
      <div className="w-full h-full p-4 md:w-1/2 lg:w-[35%] xl:w-1/4 md:p-6 bg-linear-to-b from-[#2E5E7E]/80 via-[#204B6A]/85 to-primary/40 backdrop-blur-xl  shadow-2xl">
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex flex-col justify-between h-[calc(100vh-48px)] w-full  overflow-y-auto 2xl:p-8 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl"
        >
          <div>
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={logo}
                alt="logo"
                className="w-auto h-20 xl:h-20 2xl:h-30 mx-auto"
              />
            </div>

            <p className="text-[20px] text-center montserrat font-medium mt-10 text-white tracking-wide">
              Powering your operations. Sign in to continue.
            </p>

            <form className="mt-6 space-y-5" onSubmit={formik.handleSubmit}>
              <div>
                <CustomInput
                  whitelabel
                  label="Email"
                  name="email"
                  placeholder="Enter User Name"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="bg-transparent border-b border-white/70 rounded-none text-white placeholder:text-white/50"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-xs text-red-400">
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
                  <p className="mt-1 text-xs text-red-400">
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
                  <p className="text-xs text-white/80">Remember me</p>
                </div>
                <p className="text-xs text-white/90 hover:underline cursor-pointer italic">
                  Forgot password?
                </p>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full h-11 mt-8 text-base font-semibold text-white transition-all duration-300 rounded-lg cursor-pointer bg-secondary hover:bg-[#10b3ab] shadow-lg shadow-primary/20"
              >
                {isLoading ? (
                  <SyncLoader color="#ffffff" size={6} speedMultiplier={0.6} />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <p className="mt-6 text-xs text-center text-white/70">
              Need an account?{" "}
              <span className="text-white underline font-medium cursor-pointer">
                Sign up here
              </span>
            </p>

            <div className="border-t border-white/30 mt-8"></div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/30">
            <div className="flex items-center gap-2">
              <img
                src={berryboostlogo}
                alt="berryboostlogo"
                className="w-6 h-6 rounded-full"
              />
              <p className="text-xs text-white/80 font-medium">BerryBoost</p>
            </div>
            <p className="text-xs text-white/60">© BerryBoost Login 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
