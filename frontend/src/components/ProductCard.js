import React, { useContext } from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Button } from '@mui/material';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        className="product-image"
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">{product.category}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>₹{product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
