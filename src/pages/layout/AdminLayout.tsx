import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import UserSidebar from "../../components/sidebar/UserSidebar";
import { useMediaQuery } from "@mui/material";
import { theme } from "../../theme";
import HorizontalSidebar from "../../components/sidebar/HorizontalSidebar";

const AdminLayout = () => {
  const auth = useSelector((state: any) => state.auth.user);
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  // const role = auth?.role;
  return (
    <div className="flex h-screen min-w-[280px] overflow-hidden">
      {!isMobile && <UserSidebar />}
      <div className=" flex bg-slate-50 flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* {!isMobile && <Header />} */}
        <div className=" ">
          <div className="h-3/6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
