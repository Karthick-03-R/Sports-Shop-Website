import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice, clearCart } = useContext(CartContext);

  if (cart.length === 0) return <Typography variant="h6">Your cart is empty</Typography>;

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Your Cart</Typography>
      <List>
        {cart.map(item => (
          <ListItem key={item.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemAvatar>
              <Avatar src={item.image} variant="square" />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={<>₹{item.price} × {item.qty} = ₹{item.price * item.qty}</>}
            />
            <TextField
              type="number"
              size="small"
              value={item.qty}
              onChange={(e) => {
                const q = Math.max(1, Number(e.target.value));
                updateQty(item.id, q);
              }}
              inputProps={{ min: 1, style: { width: 60 } }}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 2 }}>Total: ₹{totalPrice}</Typography>
      <Button variant="contained" sx={{ mt: 2, mr: 1 }} onClick={() => alert('Checkout flow not implemented in sample.')}>Checkout</Button>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => clearCart()}>Clear Cart</Button>
    </div>
  );
}
