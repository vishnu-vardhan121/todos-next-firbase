"use client";
import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { BarData, LineData, Piedata, users } from "@/lib/resource";
import { useSelector } from "react-redux";

ChartJS.register(
  ArcElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
};

function Visualization() {
  const { user } = useSelector((s) => s);
  const [order, setOrder] = useState("default");
  const handleChange = (e) => {
    setOrder(e.target.value);
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className="text-lg font-semibold text-gray-800 mb-4">
        Hi, {user?.name} 👋
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 bg-gray-200 text-gray-700 font-semibold py-3 px-4">
            <p>ID</p>
            <p>Username</p>
            <p>Gender</p>
            <p>Age</p>
            <p>Profile Views</p>
          </div>

          <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-300">
            {users.map((user, index) => (
              <div
                key={user.user_id}
                className={`grid grid-cols-5 py-3 px-4 text-gray-800 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-all duration-200`}
              >
                <p className="font-medium">{user.user_id}</p>
                <p>{user.username}</p>
                <p className="capitalize">{user.gender}</p>
                <p>{user.age}</p>
                <p className="text-blue-600 font-semibold">
                  {user.profile_views}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="w-full h-[250px] mb-6">
            <Bar data={BarData} options={options} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full h-[250px] flex items-center justify-center">
              <Pie data={Piedata} />
            </div>

            <div className="w-full h-[250px]">
              <select value={order} onChange={handleChange}>
                <option value="default">Default</option>
                <option value="ascending">1-100</option>
                <option value="descending">100-1</option>
              </select>

              <Line data={LineData(order)} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visualization;
