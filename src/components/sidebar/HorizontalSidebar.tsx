import React from "react";
import { Link, useLocation } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import { Box } from "@mui/material";
import HomeIcon from "/icons/home-10.svg"; 
import book from "/icons/book-03.svg"; 
import userSharing from "/icons/user-sharing.svg"; 
import userStar from "/icons/user-star-01.svg"; 
import SOPMain from "/icons/SOP Main.svg"; 

const HorizontalSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      path: "/user-dashboard",
      label: "Home",
      icon: HomeIcon,
    },
    {
      path: "/AddSmartJournal/:id",
      label: "Smart Journal",
      icon: book,
    },
    {
      path: "/AIPetAssistant",
      label: "Pet Assistant",
      icon: userStar,
    },
    {
      path: "/My-profile",
      label: "Profile",
      icon: userSharing,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#FFAA00",
        borderStartEndRadius:"24px",
        borderTopLeftRadius:"24px",
        height: "80px",
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
        padding: "10px 0",
      }}
    >
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            color: isActive(item.path) ? "black" : "#black",
            textDecoration: "none",
            textAlign: "center",
            padding: "6px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "12px",
              "&:hover": {
                color: "blue",
              },
            }}
          >
            <img src={item.icon} alt="" />
            <span style={{ marginTop: "2px", fontSize: "10px" }}>
              {item.label}
            </span>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default HorizontalSidebar;
