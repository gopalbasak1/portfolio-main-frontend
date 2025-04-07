"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import { IUser } from "@/types";

const COLORS = ["#4F46E5", "#F97316", "#10B981", "#EC4899", "#6366F1"];

const UserChart = ({ userData }: { userData: IUser }) => {
  const [selectedMonth, setSelectedMonth] = useState("");

  // Ensure userData is always an array
  const validUserData = Array.isArray(userData) ? userData : [];

  // Filter data based on selected month
  const filteredData = selectedMonth
    ? validUserData.filter(
        (user) => dayjs(user.createdAt).format("YYYY-MM") === selectedMonth
      )
    : validUserData;

  // Count users by role (ensure it's always an object)
  const roleCounts =
    filteredData.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {}) || {};

  // Generate unique months for the filter dropdown
  const uniqueMonths = [
    ...new Set(
      validUserData.map((user) => dayjs(user?.createdAt).format("YYYY-MM"))
    ),
  ].sort();

  return (
    <div className="w-full">
      {/* Month Filter Dropdown */}
      <div className="mb-4">
        <label className="text-white text-lg mr-2">Filter by Month:</label>
        <select
          className="px-4 py-2 border rounded-md "
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All</option>
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {dayjs(month).format("MMMM YYYY")}
            </option>
          ))}
        </select>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
        <div className="flex items-center border justify-center border-accent shadow-lg shadow-[#13413a] text-xl font-medium gap-2 h-16">
          <h2 className="text-xl">Total Users:</h2>
          <p>{filteredData.length || 0}</p>
        </div>

        <div className="flex items-center border justify-center border-accent shadow-lg shadow-[#13413a] text-xl font-medium gap-2 h-16">
          <h2 className="text-xl">Admins:</h2>
          <p>{roleCounts.admin || 0}</p>
        </div>

        <div className="flex items-center border justify-center border-accent shadow-lg shadow-[#13413a] text-xl font-medium gap-2 h-16">
          <h2 className="text-xl">Users:</h2>
          <p>{roleCounts.user || 0}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={Object.entries(roleCounts || {}).map(([role, count]) => ({
                name: role,
                value: count,
              }))}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {Object.entries(roleCounts || {}).map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserChart;
