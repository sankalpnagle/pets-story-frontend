import React, { useState, useRef, useEffect } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";

const notificationCount = 5;

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        <Badge overlap="circular" badgeContent={notificationCount} color="info">
          <div className="flex items-center justify-center w-10 h-10 border border-slate-200 rounded-full bg-slate-50">
            <NotificationsNoneOutlinedIcon
              className="text-slate-500"
              style={{ fontSize: "24px" }}
            />
          </div>
        </Badge>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white border border-gray-200 z-10">
          <div className="px-4 py-3 border-b border-gray-200">
            <h5 className="text-sm font-medium text-gray-800">Notifications</h5>
          </div>
          <ul className="flex flex-col max-h-60 overflow-y-auto">
            {/* Example Notifications */}
            <li className="border-b border-gray-200">
              <Link to="/notifications" className="flex gap-4 px-4 py-3 hover:bg-gray-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                  <NotificationsNoneOutlinedIcon />
                </div>
                <div>
                  <h6 className="text-sm font-medium text-gray-800">New Comment</h6>
                  <p className="text-sm text-gray-600">
                    Someone commented on your post.
                  </p>
                  <p className="text-xs text-gray-400">5min ago</p>
                </div>
              </Link>
            </li>
            <li className="border-b border-gray-200">
              <Link to="/notifications" className="flex gap-4 px-4 py-3 hover:bg-gray-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-500">
                  <NotificationsNoneOutlinedIcon />
                </div>
                <div>
                  <h6 className="text-sm font-medium text-gray-800">Task Completed</h6>
                  <p className="text-sm text-gray-600">
                    Your recent task has been marked as complete.
                  </p>
                  <p className="text-xs text-gray-400">10min ago</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
