import { useDispatch } from "react-redux";
import { removeFromCart } from "../utils/cartSlice";
import { useSelector } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa6";


function CartItems({ item }) {
    const dispatch = useDispatch();

    // Get current cart items from Redux store
    const cartItems = useSelector(state => state.cart.cartItems)

    // Helper function to get current quantity of a specific item in the cart
    const cartItemQuantity = (itemId) => {
        const found = cartItems.find(item => item._id === itemId);
        return found ? found.quantity : 0;
    }


    //Handle Add Item: Update Redux & sync with backend DB
    async function handleaddItem(item) {
        // Add item to Redux cart
        dispatch(addToCart({ ...item, id: item._id }));

        try {
            const token = localStorage.getItem("token");

            // Send POST request to server to add item to DB cart
            const response = await fetch("http://localhost:3001/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: item._id,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                console.log("Server response:", response.status, await response.text());
                throw new Error("Failed to add item to DB");
            }

            const data = await response.json();
            console.log("Synced to DB:", data);
        } catch (error) {
            console.error("Sync error:", error);
        }
    }


    // Handle Remove Item: Update Redux & sync with backend DB
    function handleRemoveItem(item) {
        const foundCartItem = cartItems.find(ci => ci._id === item._id);
        if (!foundCartItem) return;

        const currentQty = foundCartItem.quantity;

        // Remove item from Redux cart
        dispatch(removeFromCart(item))
        const token = localStorage.getItem("token");

        // If more than 1 item, update quantity on server
        if (currentQty > 1) {
            fetch(`http://localhost:3001/api/cart/${item._id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: currentQty - 1 })
            }).catch(err => console.error("Update qty failed:", err));
        } else {
            // If last item, remove it from DB
            fetch(`http://localhost:3001/api/cart/${item._id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            }).catch(err => console.error("Delete item failed:", err));
        }
    }

    return (
        <>
            <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-9 justify-between">

                <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <img src={item.thumbnail} alt={item.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md" />
                    <div className="text-sm sm:text-base">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-gray-600">₹ {(item.price * 85).toLocaleString()}</p>
                    </div>
                </div>


                <div className="relative flex items-center bg-yellow-400 rounded-3xl w-full sm:w-auto justify-center">
                    {
                        cartItemQuantity(item._id) === 0 ? null : (
                            <div className="flex items-center justify-between w-full sm:w-auto border border-gray-300 rounded-full overflow-hidden py-[6px]">
                                <button onClick={() => handleRemoveItem(item)} className="text-green-700 px-3 py-1 text-lg font-bold cursor-pointer">
                                    <FaMinus />
                                </button>
                                <span className="px-3 py-1 text-sm font-bold text-green-700">{cartItemQuantity(item._id)}</span>
                                <button onClick={() => handleaddItem(item)} className="text-green-700 px-3 py-1 text-lg font-bold cursor-pointer">
                                    <TiPlus />
                                </button>
                            </div>
                        )
                    }
                </div>

            </div>

        </>
    )
}

export default CartItems