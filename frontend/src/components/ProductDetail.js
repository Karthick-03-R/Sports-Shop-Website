import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../api';
import {
  Grid,
  Typography,
  Button,
  CardMedia,
  CircularProgress,
  Chip,
  Stack,
  Paper,
  TextField,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{ width: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 2, bgcolor: '#fafafa' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={1.5}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Chip label={product.category} variant="outlined" />
              <Chip icon={<StarIcon />} label={product.rating} color="warning" />
            </Stack>

            <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
              ₹{product.price}
            </Typography>
            <Typography color="text.secondary">{product.description}</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
            </Typography>

            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 1 }}>
              <TextField
                type="number"
                size="small"
                label="Qty"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                inputProps={{ min: 1, max: product.stock || 1 }}
                sx={{ width: 100 }}
              />
              <Button
                variant="contained"
                onClick={() => addToCart(product, qty)}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
