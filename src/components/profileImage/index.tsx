import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import Cookies from "js-cookie";
import { Avatar } from "@mui/material";
import { UserLogout } from "../../api/userServices";
import { SyncLoader } from "react-spinners";
export default function ProfileImage() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest(".profile-menu")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await UserLogout();
    } catch (error) {
      console.log(error);
    } finally {
      Cookies.remove("token");
      dispatch(logout());
      navigate("/");
      setLoading(false);
    }
  };

  return (
    <div className="relative profile-menu">
      <Avatar
        onClick={() => setOpen(!open)}
        src={
          user?.image ||
          "https://img.magnific.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-623.jpg?semt=ais_hybrid&w=740&q=80"
        }
        alt="profile"
        className="rounded-md cursor-pointer"
        variant="rounded"
      />

      {open && (
        <div className="absolute z-50 w-48 py-2 mt-2 overflow-hidden -translate-x-1/2 bg-white shadow-lg left-1/2 rounded-xl">
          {" "}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-10 px-4 py-2 text-xs text-left cursor-pointer hover:bg-gray-100"
          >
            Change Profile Image
          </button>
          <button className="w-full h-10 px-4 py-2 text-xs text-left cursor-not-allowed hover:bg-gray-100">
            Setting
          </button>
          <div className="border-t-[0.5px] border-[#304250]/36"></div>
          <button
            onClick={handleLogout}
            className="w-full h-10 px-4 py-2 text-xs text-left text-red-500 cursor-pointer hover:bg-gray-100"
          >
            <button onClick={handleLogout} disabled={loading}>
              {loading ? (
                <SyncLoader color="#FF0000" size={6} speedMultiplier={0.6} />
              ) : (
                "Logout"
              )}
            </button>
          </button>
        </div>
      )}
    </div>
  );
}
