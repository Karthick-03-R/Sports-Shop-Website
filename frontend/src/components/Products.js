import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { API_URL } from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  // Dynamic categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered = category === "All"
    ? products
    : products.filter(p => p.category === category);

  const searched = filtered.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...searched].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ minWidth: 250 }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort by Price</InputLabel>
          <Select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="highToLow">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={3}>
        {sorted.length > 0 ? (
          sorted.map(p => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Grid>
    </div>
  );
}
