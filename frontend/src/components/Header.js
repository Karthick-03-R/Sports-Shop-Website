import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Header() {
  const { totalItems } = useContext(CartContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <SportsSoccerIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/">Sports Shop</Link>
        </Typography>
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
