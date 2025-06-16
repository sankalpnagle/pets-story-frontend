import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileIcon from "/icons/user.svg";
import HomeIcon from "/icons/home-10.svg";
import left from "/icons/arrowLeft.svg";
import pen from "/icons/pen-01.svg";
import creditCard from "/icons/credit-card-pos.svg";
import settings from "/icons/settings-02.svg";
import helpCircle from "/icons/help-circle.svg";
import logoutSquare from "/icons/logout-square-02.svg";
import customerService from "/icons/customer-service-02.svg";
import MuiButton from "../../../components/button/MuiButton";
import Google from "../../../assets/icons/Google";
import Apple from "../../../assets/icons/Apple";
import FaceBook from "../../../assets/icons/FaceBook";
import MuiAccordion from "../../../components/accordion/MuiAccordion";
import HorizontalSidebar from "../../../components/sidebar/HorizontalSidebar";
import EditProfile from "./EditProfile";
import { Logout } from "../../../redux/slice/AuthSlice";
import ManIcon from "/icons/userDefault.png";

interface RootState {
  header: { head: boolean };
  auth: { user: any };
}

const Myprofile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state?.auth?.user);
  const email = user?.email;
  const fullName = user?.fullName;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  console.log('userImage', user)
  const userValues = location?.state?.initialValues;
  console.log('userValues', userValues)

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      path: "/user-dashboard",
      label: "Sign out",
      icon: logoutSquare,
    },
  ];
   const handleLogout = () => {
     dispatch(Logout());
     navigate("/");
   };
  const items = [
    {
      title: "My Subscription",
      content: [
        { label: "Tier list", url: "" },
        { label: "Payment Method", url: "" },
      ],
      icon: creditCard,
    },
    {
      title: "Settings",
      content: [
        { label: "General App Settings", url: "" },
      ],
      icon: settings,
    },
    {
      title: "FAQ",
      content: [
        { label: "List of FAQ", url: "https://www.google.com" },
      ],
      icon: helpCircle,
    },
    {
      title: "Need Help?",
      content: [
        { label: "Visit Google", url: "https://www.google.com" },
        { label: "Visit Example", url: "https://www.example.com" },
      ],
      icon: customerService,
    },
  ];
  return (
    <>
      {isTablet ? (
        <div className="relative overflow-y-auto">
          <div
            className={`${
              isTablet ? "translate-x-0 z-50" : "-translate-x-full "
            } fixed inset-y-0 left-0  bg-[#fbf8ff] w-full transform md:translate-x-0 md:static md:inset-0 transition-transform duration-200 ease-in-out`}
          >
            <div className="flex h-screen flex-col overflow-y-auto  bg-[#0b1a97]  border-r">
              <div className="flex justify-between mx-3 bg-[#0b1a97] items-center mt-3 py-7">
                <button onClick={() => navigate("/user-dashboard")}>
                  {" "}
                  <img src={left} width={33} alt="" />
                </button>
                <h1 className="text-2xl text-white">My Profile</h1>
                <h1></h1>
              </div>
              <nav className="flex-1 bg-[#fbf8ff] mb-4 rounded-t-3xl px-4 py-6 ">
                <div className="flex items-center justify-between mx-1.5 gap-x-1">
                  <div className="flex items-center gap-x-5">
                    <div className="bg-white w-[70px] h-[70px] rounded-full overflow-hidden border border-black justify-center items-center flex">
                      <h1 className="">
                        {/* {fullName?.charAt(0).toUpperCase()} */}
                        <img
                className={`object-cover object-center ${user?.profileImage ? "w-full" : "w-6 h-6"
                  }`}
                src={user?.profileImage ? user?.profileImage : ManIcon}
                alt=""
                
              />
                      </h1>
                    </div>
                    <div className="leading-5">
                      <h1 className="font-bold text-lg">{fullName}</h1>
                      <p className="font-medium text-sm">{email}</p>
                    </div>
                  </div>
                  <button onClick={() => navigate("/Profile-edit")}>
                    {" "}
                    <img src={pen} width={25} alt="" />
                  </button>
                </div>
                <div className="mt-7 mx-3">
                  {/* <h1 className="font-normal text-lg">Connected Account</h1> */}
                  <div className="flex justify-between mt-4  items-center">
                    <div className="flex items-center gap-x-5">
                      {/* <Google /> */}
                      <p>{user?.loginBy}</p>
                    </div>
                    {/* <MuiButton size="small" color="#ffb647">
                      Unlink
                    </MuiButton> */}
                  </div>
                  {/* <div className="flex justify-between my-4 items-center">
                    <div className="flex items-center gap-x-5">
                      <Apple />
                      <p>Apple</p>
                    </div>
                    <MuiButton size="small" color="#0b1a97">
                      Connect
                    </MuiButton>
                  </div>
                  <div className="flex justify-between  items-center">
                    <div className="flex items-center gap-x-5">
                      <FaceBook />
                      <p>Facebook</p>
                    </div>
                    <MuiButton size="small" color="#0b1a97">
                      Connect
                    </MuiButton>
                  </div> */}
                </div>
                <div className="mt-7 mx-3 ">
                  <MuiAccordion items={items} />
                </div>
                <button
                  onClick={handleLogout}
                  className="flex text-[#BA1A1A] hover:text-sky-600 items-center gap-3.5 px-4 justify-center py-1 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <svg
                    className="fill-current -ml-1"
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
                  <h1 className="text-base ml-2"> Sign Out</h1>
                </button>
              </nav>
            </div>
            {isTablet && <HorizontalSidebar />}
          </div>
        </div>
      ) : (
        <>
          <EditProfile />
        </>
      )}
    </>
  );
};

export default Myprofile;
