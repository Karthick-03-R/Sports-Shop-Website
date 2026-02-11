import React, { useEffect, useMemo, useState } from 'react';
import {
  Grid,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
import ProductCard from './ProductCard';
import { API_URL } from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not load products');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong while loading products.');
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    const filtered = category === 'All' ? products : products.filter((p) => p.category === category);
    const searched = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    return [...searched].sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });
  }, [category, products, search, sortOrder]);

  if (loading) {
    return (
      <Box sx={{ py: 10, display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Find your next game-day essential
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Search, filter, and compare top sports gear.
        </Typography>
      </Paper>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ mb: 3, alignItems: { xs: 'stretch', md: 'center' } }}
      >
        <TextField
          label="Search products"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: { xs: '100%', md: 320 } }}
        />

        <FormControl sx={{ minWidth: { xs: '100%', md: 220 } }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: { xs: '100%', md: 220 } }}>
          <InputLabel>Sort by price</InputLabel>
          <Select value={sortOrder} label="Sort by price" onChange={(e) => setSortOrder(e.target.value)}>
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="lowToHigh">Low to High</MenuItem>
            <MenuItem value="highToLow">High to Low</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography>No products found for the selected filters.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
