export default function BestSellersTable({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Best Selling Products</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">Product</th>
            <th>Total Sold</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p.product_id} className="border-b">
              <td className="py-2">{p.product__name}</td>
              <td>{p.total_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
