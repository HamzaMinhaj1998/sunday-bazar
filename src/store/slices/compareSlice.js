import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isOpen: false,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      if (
        state.items.length < 3 &&
        !state.items.find((i) => i.id === action.payload.id)
      ) {
        state.items.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCompare: (state) => {
      state.items = [];
    },
    toggleCompareDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addToCompare,
  removeFromCompare,
  clearCompare,
  toggleCompareDrawer,
} = compareSlice.actions;
export default compareSlice.reducer;
