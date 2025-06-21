import { Link } from "react-router-dom"
import ProductRating from "./ProductRating"
import { useDispatch } from "react-redux"
import { addToCart } from "../utils/cartSlice"


function ProductItem({ product }) {
    const dispatch = useDispatch()
    //Get token to determine if user is authenticated
    const token = localStorage.getItem("token");


    // Handle adding product to cart: update Redux + sync with backend
    const handleAddToCart = async () => {
        dispatch(addToCart(product)); // Update cart in Redux

        try {
            const response = await fetch("http://localhost:3001/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1,
                }),
            });

            if (!response.ok) throw new Error("Failed to add item to DB");

            const data = await response.json();
            console.log("Synced to DB:", data);
        } catch (error) {
            console.error("Sync error:", error);
        }
    };

    return (
        <>
            <div className="w-[350px] rounded-2xl overflow-hidden border-1 border-gray-300 shadow-xl" key={product._id}>
                <div className="p-2 flex items-center justify-center flex-col">
                    <div className="w-50 my-2">
                        <img src={product?.thumbnail} alt={product?.title} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg text-gray-600 hover:text-orange-700">{product.title}</h2>
                        <p className="text-sm text-gray-500 mt-2">Price ₹ {(product.price * 85).toLocaleString()}</p>
                        <ProductRating rating={product.rating} />
                    </div>
                    <div className="flex gap-2">
                        <div className="relative group inline-block">
                            <Link to={`product/${product._id}`} key={product._id}>
                            {/* View Details Button (disabled if not logged in) */}
                                <button
                                    disabled={!token}
                                    className={`m-3 p-3 ${!token ? " border-1 rounded-2xl font-semibold border-gray-300  bg-yellow-500 hover:bg-red-600 cursor-not-allowed duration-300" : "border-gray-300 border-1 font-semibold bg-yellow-500 hover:bg-green-700 rounded-2xl hover:text-white cursor-pointer duration-300"}`}>
                                    View Details
                                </button>
                            </Link>
                            {/* Add to Cart Button (disabled if not logged in) */}
                            <button
                                disabled={!token}
                                onClick={handleAddToCart}
                                className={`my-3 p-3 ${!token ? " border-1 rounded-2xl font-semibold border-gray-300  bg-yellow-500 hover:bg-red-600 cursor-not-allowed duration-300" : "border-gray-300 border-1 font-semibold bg-yellow-500 hover:bg-green-700 rounded-2xl hover:text-white cursor-pointer duration-300"}`} >
                                Add to Cart
                            </button>
                            <span className="absolute right-2 bottom-full opacity-0 group-hover:opacity-100 transition  text-black font-extrabold text-sm px-2 py-1 rounded">
                                {!token ? "Please Login" : ""}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem