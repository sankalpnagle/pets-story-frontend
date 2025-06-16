import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderToggle } from "../../redux/slice/HeaderSlice";
import { Link, useLocation } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = () => {
  const headToggle = useSelector((state: any) => state.header.head);
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`${
          headToggle ? "translate-x-0 w-64 z-50" : "-translate-x-full w-0"
        } fixed inset-y-0 left-0 bg-slate-500 transform md:translate-x-0 md:static md:inset-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex h-screen flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 h-screen bg-[#1c2434]">
            <div className="flex fixed right-2 justify-end sm:hidden">
              <CloseIcon
                onClick={() => dispatch(HeaderToggle())}
                className="text-white"
              />
            </div>
            <div className="flex justify-center leading-1 mb-2 mt-3 text-3xl text-center">
              <h1 className="text-slate-50">Super Admin</h1>
            </div>

            <div className="mt-10">
              <h1 className="px-4 py-2 text-slate-300">MENU</h1>
              <div className="mt-2">
                <Link
                  to="/"
                  className={`${
                    isActive("/") ? "bg-gray-700 text-white" : "text-slate-200"
                  } flex items-center px-4 py-2 hover:bg-gray-700`}
                >
                  <GridViewOutlinedIcon fontSize="small" className="mr-2" />
                  Dashboard
                </Link>
                {/* <Link
                  to="/adminList"
                  className={`${
                    isActive("/adminList")
                      ? "bg-gray-700 text-white"
                      : "text-slate-200"
                  } flex items-center px-4 py-2 mt-1 hover:bg-gray-700`}
                >
                  <HowToRegOutlinedIcon fontSize="small" className="mr-2" />
                  Admin Management
                </Link>
                <Link
                  to="/userList"
                  className={`${
                    isActive("/userList")
                      ? "bg-gray-700 text-white"
                      : "text-slate-200"
                  } flex items-center px-4 py-2 mt-1 hover:bg-gray-700`}
                >
                  <ListIcon fontSize="small" className="mr-2" />
                  User Management
                </Link> */}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {headToggle && (
        <div
          className="fixed inset-0 md:hidden"
          onClick={() => dispatch(HeaderToggle())}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
