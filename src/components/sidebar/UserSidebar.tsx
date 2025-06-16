import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderToggle } from "../../redux/slice/HeaderSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileIcon from "/icons/user.svg"; // Ensure correct path
import HomeIcon from "/icons/home-10.svg"; // Ensure correct path
import Logo from "/icons/SOP Main.svg"; // Ensure correct path
import Logo2 from "/icons/SOP Logomark 2.svg"; // Ensure correct path
import book from "/icons/book-03.svg";
import userSharing from "/icons/user-sharing.svg";
import userStar from "/icons/user-star-01.svg";
import Profile from "../header/Profile";
import { Logout } from "../../redux/slice/AuthSlice";
interface RootState {
  header: { head: boolean };
  auth: { user: any }; // Replace `any` with your actual user type
}

const UserSidebar: React.FC = () => {
  const headToggle = useSelector((state: RootState) => state.header.head);
  const auth = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      path: "/user-dashboard",
      label: "Home",
      icon: HomeIcon,
    },
    {
      path: "/Profile-edit",
      label: "Profile",
      icon: userSharing,
    },
    {
      path: "/AIPetAssistant",
      label: "Pet Assistant",
      icon: userStar,
    },
    {
      path: "/AddSmartJournal",
      label: "Smart Journal",
      icon: book,
    },
  ];

  return (
    <div className="relative">
      <div
        className={`${
          isTablet ? "translate-x-0 z-50 w-20" : "-translate-x-full w-56"
        } fixed inset-y-0 left-0 bg-slate-500  transform md:translate-x-0 md:static md:inset-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex h-screen flex-col overflow-y-auto  bg-white border-r">
          <div className="flex justify-center items-center mt-7 py-5">
            {isTablet ? (
              <img src={Logo2} width={50} alt="" />
            ) : (
              <img src={Logo} width={150} alt="" />
            )}
          </div>
          <nav className="flex-1 px-4 py-6 ">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? "bg-gray-50 text-blue-800"
                    : "text-black"
                } flex items-center py-2 mb-2 rounded hover:bg-gray-100`}
              >
                <img src={item.icon} alt={item.label} className="w-6 h-6 " />
                {!isTablet && (
                  <span className="ml-2 text-sm font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="flex hover:text-red-500 gap-x-2  ml-4 mb-20  font-mediumhover:text-primary "
          >
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                fill=""
              />
              <path
                d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                fill=""
              />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
