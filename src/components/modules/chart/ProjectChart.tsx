"use client";

import { Project } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// 🎨 Predefined color palette
const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
];

const CustomTooltip: React.FC<{ active?: boolean; payload?: any[] }> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 bg-opacity-90 text-white p-3 rounded shadow-md">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p>Projects: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ProjectChart = ({ projectData }: { projectData: Project[] }) => {
  if (!projectData || !Array.isArray(projectData)) {
    return <p>No data available</p>;
  }

  // Group projects by category
  const categoryCounts = projectData.reduce(
    (acc: Record<string, number>, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    },
    {}
  );

  // Convert data to chart format with assigned colors
  const chartData = Object.keys(categoryCounts).map((category, index) => ({
    name: category,
    count: categoryCounts[category],
    color: COLORS[index % COLORS.length], // Assign a color dynamically
  }));

  return (
    <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] p-5 shadow-md rounded-lg mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">
        Projects by Category
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="name" tick={{ fill: "#555" }} />
          <YAxis allowDecimals={false} tick={{ fill: "#555" }} />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: "none" }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectChart;
