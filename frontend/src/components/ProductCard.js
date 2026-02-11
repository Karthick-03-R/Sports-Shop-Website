import React, { useContext, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Chip,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [showNotice, setShowNotice] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setShowNotice(true);
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          className="product-image"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Chip label={product.category} size="small" variant="outlined" />
            <Chip icon={<StarIcon />} size="small" label={product.rating} color="warning" />
          </Stack>
          <Typography variant="h6" sx={{ minHeight: 64 }}>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>
            ₹{product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
          <Button size="small" variant="outlined" fullWidth component={Link} to={`/product/${product.id}`}>
            View Details
          </Button>
          <Button
            size="small"
            variant="contained"
            fullWidth
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={showNotice}
        autoHideDuration={1800}
        onClose={() => setShowNotice(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowNotice(false)} severity="success" variant="filled">
          Added to cart
        </Alert>
      </Snackbar>
    </>
  );
}
