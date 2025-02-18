import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "GI 1", uv: 40, pv: 60 },
  { name: "GE 1", uv: 50, pv: 30 },
  { name: "GI 2", uv: 30, pv: 20 },
  { name: "GE 2", uv: 60, pv: 40 },
  { name: "GI 1", uv: 70, pv: 50 },
  { name: "GI 2", uv: 50, pv: 30 }
];

export default function App() {
  return (
    <div style={{ width: "110%", height: "400px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barSize={30}
          margin={{ top: 20, right: 100, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* ✅ L'ordre des `Bar` est important : commencer par la couleur du bas */}
          <Bar dataKey="uv" stackId="a" fill="#8280FF" radius={[0, 0, 0, 0]} />
          <Bar dataKey="pv" stackId="a" fill="#FF9066" radius={[30, 40, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
