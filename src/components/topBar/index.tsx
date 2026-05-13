import { Icon } from "@iconify/react";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Logo from "../../assets/logo.png";
import { navItems } from "../../utils/constant";
import ProfileImage from "../profileImage";

export default function TopBar() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [submenuDirection, setSubmenuDirection] = useState<{
    [key: string]: "left" | "right";
  }>({});
  const [openSubMenu, setOpenSubMenu] = useState<{ [key: string]: boolean }>(
    {},
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = (index: number) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const toggleSubMenu = (key: string) => {
    setOpenSubMenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isParentActive = (item: any): boolean => {
    if (item.path?.trim() && location.pathname.startsWith(item.path))
      return true;
    if (item.children) {
      return item.children.some((child: any) => isParentActive(child));
    }

    return false;
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setOpenSubMenu({});
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex fles-wrap items-center lg:gap-13.75 gap-8 justify-between h-22 relative">
      <img src={Logo} alt="logo" className="h-auto w-21 mix-blend-multiply" />
      <div className="flex-wrap items-center hidden gap-2 xl:justify-start lg:justify-center lg:flex">
        {navItems.map((item: any, index) => (
          <div key={index} className="relative">
            {item.children ? (
              <button
                onClick={() => setOpenMenu(openMenu === index ? null : index)}
                className={`flex items-center h-10 gap-2 px-2 rounded-md cursor-pointer transition-all ${
                  isParentActive(item)
                    ? "bg-secondary text-white"
                    : "bg-white text-heading1"
                }`}
              >
                {isParentActive(item) && (
                  <Icon icon={item.icon} className="text-[18px]" />
                )}
                <p className="text-sm font-normal">{item.name}</p>
                <Icon
                  icon="weui:arrow-filled"
                  className={`text-lg transition-transform ${
                    openMenu === index ? "rotate-270" : "rotate-90"
                  }`}
                />
              </button>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 h-10 rounded-md transition ${
                    isActive
                      ? "bg-secondary text-white"
                      : "bg-white text-heading1"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <Icon icon={item.icon} className="text-[20px]" />
                    )}
                    <p className="text-sm font-normal">{item.name}</p>
                  </>
                )}
              </NavLink>
            )}
            {item.children && openMenu === index && (
              <div
                style={{ boxShadow: "0px 1px 12px 0px #0000001F" }}
                className="absolute left-0 z-50 py-2 mt-2 bg-white rounded-md w-60"
              >
                {item.children.map((child: any, i: any) => (
                  <div
                    key={i}
                    className="relative overflow-visible group"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const submenuWidth = 320;

                      const willOverflowRight =
                        rect.right + submenuWidth > window.innerWidth;

                      setSubmenuDirection((prev) => ({
                        ...prev,
                        [i]: willOverflowRight ? "left" : "right",
                      }));
                    }}
                  >
                    {child.children ? (
                      <div
                        className={`flex items-center text-sm justify-between px-3 py-2 cursor-pointer 
                            ${
                              isParentActive(child)
                                ? "bg-secondary text-white"
                                : "hover:bg-[#ECF0F4] text-heading1"
                            }`}
                      >
                        <span className="">{child.name}</span>
                        <Icon
                          icon="weui:arrow-filled"
                          className={`text-xl transition-transform ${
                            isParentActive(child) ? "text-white" : ""
                          }`}
                        />
                      </div>
                    ) : (
                      <NavLink
                        to={child.path}
                        onClick={() => setOpenMenu(null)}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm text-heading1 font-normal ${
                            isActive
                              ? "bg-secondary text-white "
                              : "bg-white hover:bg-[#ECF0F4]  "
                          }"`
                        }
                      >
                        {child.name}
                      </NavLink>
                    )}
                    {child?.children && (
                      <div
                        className={`absolute top-0 invisible py-2 transition-all duration-200 max-h-103 overflow-scroll bg-white rounded-md shadow-md opacity-0 max-w-60 min-w-60
                          ${submenuDirection[i] === "left" ? "right-full" : "left-full"}
                          group-hover:visible group-hover:opacity-100`}
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {child.children?.map((sub: any, j: any) => (
                          <NavLink
                            key={j}
                            to={sub.path}
                            onClick={() => setOpenMenu(null)}
                            className={({ isActive }) =>
                              `block px-3 py-2 text-sm text-heading1 font-normal  ${
                                isActive
                                  ? "bg-secondary text-white "
                                  : "bg-white hover:bg-[#ECF0F4]  "
                              }"`
                            }
                          >
                            {sub.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <ProfileImage />

        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-md">
          <Icon
            icon="iconoir:bell-notification-solid"
            className="text-base text-primary"
          />
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-white rounded-md"
          >
            <Icon
              icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"}
              className="text-2xl text-heading1"
            />
          </button>
        </div>
      </div>

      <div
        className={` fixed top-0 left-0 h-full rounded-tr-2xl rounded-br-2xl w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img
            src={Logo}
            alt="logo"
            className="w-auto h-12 mix-blend-multiply"
          />

          <button onClick={() => setMobileMenuOpen(false)}>
            <Icon icon="mdi:close" className="text-2xl text-heading1" />
          </button>
        </div>

        <div className="flex flex-col mt-4">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {item.children ? (
                <button
                  onClick={() => toggleMenu(index)}
                  className={`flex items-center justify-between w-full px-4 py-2  transition ${
                    isParentActive(item)
                      ? "text-primary font-semibold"
                      : "text-heading1 font-normal"
                  }`}
                >
                  {item.name}
                  <Icon
                    icon="weui:arrow-filled"
                    className={`transition-transform text-lg ${
                      openMenu === index ? "rotate-180" : "rotate-90"
                    }`}
                  />
                </button>
              ) : (
                <NavLink
                  to={item.path || "#"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-heading1 hover:bg-[#ECF0F4] rounded-md"
                >
                  {item.name}
                </NavLink>
              )}
              {item.children && openMenu === index && (
                <div className="flex flex-col mt-1 ml-4">
                  {item.children.map((child, childIndex) => (
                    <div key={childIndex} className="relative">
                      {child.children ? (
                        <div>
                          <button
                            onClick={() =>
                              toggleSubMenu(`${index}-${childIndex}`)
                            }
                            className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-md transition ${
                              isParentActive(child)
                                ? "text-primary font-semibold"
                                : "text-heading1 font-normal"
                            }`}
                          >
                            {child.name}
                            <Icon
                              icon="weui:arrow-filled"
                              className={`transition-transform text-lg ${
                                openSubMenu[`${index}-${childIndex}`]
                                  ? "rotate-180"
                                  : "rotate-90"
                              } ${isParentActive(child) ? "text-primary" : "text-heading1"}`}
                            />
                          </button>
                          {child.children &&
                            openSubMenu[`${index}-${childIndex}`] && (
                              <div className="flex flex-col mt-1 ml-4">
                                {child.children.map((sub, subIndex) => (
                                  <NavLink
                                    key={subIndex}
                                    to={sub.path || "#"}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                      `block px-4 py-2 text-sm rounded-md ${
                                        isActive
                                          ? "text-primary font-semibold"
                                          : "text-heading1 font-normal"
                                      }`
                                    }
                                  >
                                    {sub.name}
                                  </NavLink>
                                ))}
                              </div>
                            )}
                        </div>
                      ) : (
                        <NavLink
                          to={child.path || "#"}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-4 py-2 text-sm rounded-md ${
                              isActive
                                ? "text-primary font-semibold"
                                : "text-heading1 font-normal"
                            }`
                          }
                        >
                          <span>{child.name}</span>
                        </NavLink>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
