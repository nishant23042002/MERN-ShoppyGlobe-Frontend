import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

const appStore = configureStore({
    reducer : {
        // The 'cart' key defines the name of this slice in the state
        cart: cartReducer,
    }
})

export default appStore