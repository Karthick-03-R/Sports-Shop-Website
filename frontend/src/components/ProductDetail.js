import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../api";
import { Grid, Typography, Button, CardMedia, CircularProgress } from "@mui/material";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
  console.log("Fetching product with ID:", id);
  console.log("API_URL:", API_URL);

  fetch(`${API_URL}/products/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      setProduct(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setProduct(null);
      setLoading(false);
    });
}, [id]);


  if (loading) return <CircularProgress />;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Grid container spacing={4} sx={{ padding: "20px" }}>
      <Grid item xs={12} md={6}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ width: "100%", maxHeight: 400, objectFit: "contain" }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{product.category}</Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>₹{product.price}</Typography>
        <Typography sx={{ mt: 2 }}>{product.description}</Typography>
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => addToCart(product)}>Add to Cart</Button>
      </Grid>
    </Grid>
  );
}
