import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    isLoading: false,
    errorMessage: null,
  };

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    addInventoryItems(state, action) {
      state.items = action.payload;
    },
    editInventoryItem(state, action) {
      const item = state.items.find(item => item.name === action.payload.name)
      if(item) {
        item.category = action.payload.category;
        item.price = action.payload.price;
        item.quantity = action.payload.quantity;
        item.value = action.payload.value;
      }
    },
    deleteInventoryItem(state,action) {
        console.log("Action: Deleting item name: " + action.payload);
        const newItems = state.items.filter(item => item.name!==action.payload);
        state.items = newItems;
    },
    toggleInventoryItem(state,action) {
        console.log("Action: Viewing item name: " + action.payload);
        const item = state.items.find(item => item.name === action.payload)
        if(item) {
            item.disabled = !item.disabled;
        }
    },
  }
})

export const { setLoading, setErrorMessage, addInventoryItems, editInventoryItem, deleteInventoryItem, toggleInventoryItem  } = inventorySlice.actions
export default inventorySlice.reducer