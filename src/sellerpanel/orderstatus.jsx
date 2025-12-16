import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export default function StatusPieChart({ data }) {
  const chartData = Object.entries(data).map(([status, count]) => ({
    status,
    count,
  }));

  const colors = ["#16a34a", "#dc2626", "#2563eb", "#f59e0b"];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Order Status</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="status"
            outerRadius={100}
            label
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
