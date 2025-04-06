"use client";

import { Blog } from "@/types";
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
      <div className="bg-gray-900 bg-opacity-95 text-white p-3 rounded shadow-lg text-sm">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p>Blogs: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const BlogChart = ({ blogData }: { blogData: Blog[] }) => {
  if (!blogData || !Array.isArray(blogData)) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  // Group blogs by category
  const categoryCounts = blogData.reduce((acc, blog) => {
    acc[blog.category] = (acc[blog.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert data to chart format with assigned colors
  const chartData = Object.keys(categoryCounts).map((category, index) => ({
    name: category,
    count: categoryCounts[category],
    color: COLORS[index % COLORS.length], // Assign a color dynamically
  }));

  return (
    <div className="w-full min-h-[400px] max-h-[500px] p-5 shadow-md rounded-lg ">
      <h2 className="text-xl font-bold text-center mb-4 t">
        Blogs by Category
      </h2>
      <ResponsiveContainer width="100%" aspect={2}>
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

export default BlogChart;
