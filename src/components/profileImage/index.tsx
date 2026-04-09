import { useState, useRef, useEffect } from "react";
import Avatar from "../../assets/Avatar.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import Cookies from "js-cookie";
export default function ProfileImage() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(Avatar);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImage(preview);
      console.log("Selected Image:", file);
    }
  };

  const handleLogout = () => {
    const dispatch = useDispatch();
    Cookies.remove("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="relative profile-menu">
      <div
        className="w-10 h-10 overflow-hidden bg-white rounded-md cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img
          src={image}
          className="object-cover w-full h-full rounded-md"
          alt="profile"
        />
      </div>

      {open && (
        <div className="absolute z-50 w-48 py-2 mt-2 overflow-hidden -translate-x-1/2 bg-white shadow-lg left-1/2 rounded-xl">
          {" "}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-10 px-4 py-2 text-xs text-left cursor-pointer hover:bg-gray-100"
          >
            Change Profile Image
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-10 px-4 py-2 text-xs text-left cursor-pointer hover:bg-gray-100"
          >
            Setting
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="border-t-[0.5px] border-[#304250]/36"></div>
          <button
            onClick={handleLogout}
            className="w-full h-10 px-4 py-2 text-xs text-left text-red-500 cursor-pointer hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
