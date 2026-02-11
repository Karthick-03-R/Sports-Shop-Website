import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Header() {
  const { totalItems } = useContext(CartContext);
  const location = useLocation();

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar sx={{ gap: 1.5 }}>
        <SportsSoccerIcon sx={{ mr: 0.5 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          <Link to="/">Sports Shop</Link>
        </Typography>

        <Button
          component={Link}
          to="/"
          color="inherit"
          startIcon={<StorefrontIcon />}
          variant={location.pathname === '/' ? 'outlined' : 'text'}
          sx={{ borderColor: 'rgba(255,255,255,0.4)' }}
        >
          Products
        </Button>

        <Box>
          <IconButton color="inherit" component={Link} to="/cart" aria-label="cart">
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
