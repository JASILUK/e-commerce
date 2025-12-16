import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Clock, Layers, TrendingUp, Package, AlertCircle, Ban } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { getSellerDashboard } from "../api/sellerapi";
import SummaryCard from "./summerycard";
import { ChartCard } from "./charfield";
import { TableCard } from "./tablcard";
import styles from './sellerdashboard.module.css';

export default function SellerDashboard() {
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState("month");

  const handleFetch = async (period) => {
    try {
      const res = await getSellerDashboard(period);
      setData(res);
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };

  useEffect(() => {
    handleFetch(period);
  }, [period]);

  if (!data) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your store overview</p>
        </div>
        
        <select
          className={styles.periodSelect}
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="week">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <SummaryCard
          title="Total Sales"
          value={`₹${data.summary.total_sales.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<DollarSign size={24} />}
          colorScheme="green"
          trend="+12.5%"
          trendUp={true}
        />
        <SummaryCard
          title="Total Orders"
          value={data.summary.total_orders}
          icon={<ShoppingBag size={24} />}
          colorScheme="blue"
          trend="+8.2%"
          trendUp={true}
        />
        <SummaryCard
          title="Pending Orders"
          value={data.summary.pending_orders}
          icon={<Clock size={24} />}
          colorScheme="amber"
        />
        <SummaryCard
          title="Active Products"
          value={`${data.products.active} / ${data.products.total}`}
          icon={<Layers size={24} />}
          colorScheme="purple"
        />
        <SummaryCard
          title="Blocked Products"
          value={`${data.products.blocked} / ${data.products.total}`}
          icon={<Ban size={24} />}
          colorScheme="danger"
        />
      </div>

      {/* Charts Row 1: Sales & Orders Trend */}
      <div className={styles.chartsRow}>
        <ChartCard title="Sales Trend" subtitle="Daily sales performance">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.sales_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders Trend" subtitle="Daily order volume">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.order_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Full Width Chart: Monthly Sales */}
      <div className={styles.fullWidthChart}>
        <ChartCard title="Monthly Sales Overview" subtitle="Last 6 months performance">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.monthly_sales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="total" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables & Pie Chart Row */}

      <div className={styles.bottomSection}>
        <div className={styles.tablesContainer}>
         <TableCard 
            title="Best Selling Products" 
            subtitle="Top performers this period"
            icon={<TrendingUp size={20} />}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeaderLeft}>Product</th>
                  <th className={styles.tableHeaderRight}>Units Sold</th>
                </tr>
              </thead>
              <tbody>
                {data.best_sellers.map((p, idx) => (
                  <tr key={p.product_id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <div className={styles.productCell}>
                        <span className={styles.productRank}>
                          {idx + 1}
                        </span>
                        {p.product__name}
                      </div>
                    </td>
                    <td className={styles.tableCellRight}>{p.total_sold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>

            <ChartCard title="Order Status" subtitle="Current distribution">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={Object.entries(data.order_status).map(([status, count]) => ({
                  name: status,
                  value: count,
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.keys(data.order_status).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={['#10b981', '#3b82f6', '#f59e0b', '#ef4444'][index % 4]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        </div>
        <div className={styles.tablesContainer}>
                
         

           <TableCard 
            title="Out of Stock" 
            subtitle="Products completely unavailable"
            icon={<AlertCircle size={20} />}
            alert={true}
          >
            {data.out_of_stock.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeaderLeft}>Product Name</th>
                    <th className={styles.tableHeaderRight}>Color</th>
                  </tr>
                </thead>
                <tbody>
                  {data.out_of_stock.map((p) => (
                    <tr key={p.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{p.name}</td>
                      <td className={styles.tableCellRight}>{p.product_colors__color__name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.emptyMessage}>Great! No product is out of stock.</p>
            )}
          </TableCard>
     
          <TableCard 
            title="Low Stock Alert" 
            subtitle="Products requiring attention"
            icon={<AlertCircle size={20} />}
            alert={true}
          >
            {data.low_stock.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeaderLeft}>Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  {data.low_stock.map((p) => (
                    <tr key={p.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        <div className={styles.productCell}>
                          <Package size={16} className={styles.packageIcon} />
                          {p.name}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.emptyMessage}>All products are well stocked!</p>
            )}
          </TableCard>
        </div>
        
      </div>
    </div>
  );
}
