import React from "react";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RentedChart from "../statisticData/RentedChart";
import LineChart from "../statisticData/LineChart";

const VetDashboard = () => {
  // Stats data
  const stats = [
    {
      icon: (
        <QueryStatsIcon
          style={{ fontSize: "2rem" }}
          className="text-blue-500"
        />
      ),
      title: "Total Sales",
      value: "₹98,459",
      description: "We have sale +18.2k this week.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <GroupIcon style={{ fontSize: "2rem" }} className="text-yellow-500" />
      ),
      title: "Total Visitors",
      value: "54,156",
      description: "We have total +3.5k visitors this week.",
      bgColor: "bg-yellow-100",
    },
    {
      icon: (
        <ListAltIcon style={{ fontSize: "2rem" }} className="text-gray-500" />
      ),
      title: "Total Orders",
      value: "5,125",
      description: "We have total +5k orders this week.",
      bgColor: "bg-gray-100",
    },
    {
      icon: (
        <AttachMoneyIcon
          style={{ fontSize: "2rem" }}
          className="text-red-500"
        />
      ),
      title: "Refunded",
      value: "₹20,000",
      description: "We got +66k refund this week.",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>

      {/* Existing Stats and Other Content */}
      <div className="grid sm:grid-cols-12 gap-2 grid-cols-1">
        <div className="bg-white sm:col-span-7 rounded-lg shadow-lg m-2 p-4">
          <RentedChart />
        </div>
        <div className="bg-white rounded-lg sm:col-span-5 shadow-lg p-4 m-2">
          <div>
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center p-4">
                <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-md font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-md text-gray-500">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg m-2 p-4">
        <LineChart />
      </div>
    </div>
  );
};

export default VetDashboard;

