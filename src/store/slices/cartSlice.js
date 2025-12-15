import { createSelector, createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  const saved = localStorage.getItem('cartItems');
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  items: loadCart(),
  isOpen: false,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToCart: (state, action) => {
      const { id, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === id);

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id,
          );
        } else {
          state.items[index].quantity = action.payload.quantity;
        }
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  toggleCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotals = createSelector([selectCartItems], (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  return {
    subtotal,
    shipping,
    tax,
    total,
  };
});

export default cartSlice.reducer;
