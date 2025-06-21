import { createSlice } from '@reduxjs/toolkit'


// Create a Redux slice for managing cart state
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addToCart(state, action) {
            // Check if item already exists in cart
            const existing = state.cartItems.find(item => item._id === action.payload._id);
            if (existing) {
                // If it exists, increment quantity
                existing.quantity += 1;
            } else {
                // If not, add new item with quantity = 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },

        // Remove an item from the cart
        removeFromCart(state, action) {
            const itemId = action.payload._id;
            const existingItem = state.cartItems.find(item => item._id === itemId);

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    // If quantity is 1, remove the item entirely from the cart
                    state.cartItems = state.cartItems.filter(item => item._id !== itemId);
                } else {
                    // Else, just decrement the quantity
                    existingItem.quantity -= 1;
                }
            }
        },

        // Load cart items from server (used when syncing cart on login)
        loadCartFromServer(state, action) {
            // Set cart to payload directly
            state.cartItems = action.payload;
        }
    }
});


export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart, loadCartFromServer } = cartSlice.actions;