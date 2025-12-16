import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/productCard';
import { searchcontext } from '../context/Productcontext';
import { getProducts } from '../api/products';

function Allproducts() {
  const { categorySlug } = useParams();  
  const { search, sort } = useContext(searchcontext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (search.trim().length < 2 && search.trim().length > 0) return;
    fetchProducts();
  }, [categorySlug, search, sort]);

  const fetchProducts = async () => {
    let params = {};

    if (categorySlug) params.category__slug = categorySlug; 
    if (search) params.search = search;

    if (sort === "low") params.ordering = "price";
    if (sort === "high") params.ordering = "-price";

    
  try {
    const res = await getProducts(params);
    console.log("API Response:", res.data); // 👈 log here
    setProducts(res.data);
  } catch (err) {
    console.error(err);
  }
    
  };
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "10px"
    }}>
      {products.length > 0 ? (
        products.map(item => (
          <ProductCard key={item.slug} value={item} />
        ))
      ) : (
        <p>No Products Found!</p>
      )}
    </div>
  );
}

export default Allproducts;
