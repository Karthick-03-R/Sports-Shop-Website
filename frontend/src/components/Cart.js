import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Typography,
  Button,
  Stack,
  Paper,
  Divider,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Your cart is empty
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Add a few products to get started.
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Your Cart
      </Typography>

      <Paper sx={{ borderRadius: 3 }}>
        <List>
          {cart.map((item, index) => (
            <Box key={item.id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={item.image} variant="rounded" sx={{ width: 60, height: 60, mr: 1 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`₹${item.price} × ${item.qty} = ₹${item.price * item.qty}`}
                />
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mr: 5 }}>
                  <IconButton onClick={() => updateQty(item.id, item.qty - 1)} size="small">
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ minWidth: 24, textAlign: 'center' }}>{item.qty}</Typography>
                  <IconButton onClick={() => updateQty(item.id, item.qty + 1)} size="small">
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </ListItem>
              {index !== cart.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2.5, borderRadius: 3 }}>
        <Typography variant="h6">Total: ₹{totalPrice}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} sx={{ mt: 1.5 }}>
          <Button
            variant="contained"
            onClick={() => alert('Checkout flow not implemented in sample.')}
          >
            Checkout
          </Button>
          <Button variant="outlined" color="inherit" onClick={clearCart}>
            Clear Cart
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
