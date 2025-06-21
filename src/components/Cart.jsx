import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import CartItems from "./CartItems";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";



function Cart() {
    // Access cart items from Redux store
    const cartItems = useSelector(state => state.cart.cartItems)
    //navigating hook
    const navigate = useNavigate();
    const { openModal } = useOutletContext();


    //Protect Cart Page: Redirect to homepage and show login modal if no token found
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // User is not logged in; redirect and open login modal
            navigate("/", { replace: true });
            openModal(true)
        }
    }, []);

    // Calculate the total price of items in the cart
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <Link to="/">
                <button className="cursor-pointer mt-2 underline hover:text-green-600 flex gap-2 font-semibold text-xl my-2">
                    <span><MdArrowBack size={"30px"} /></span>Back
                </button>
            </Link>
            <div className="mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

                <div className="py-4">
                    {/* List all cart items with quantity > 0 */}
                    {cartItems
                        .filter(item => item.quantity > 0)
                        .map((item) => (
                            <div key={item._id} className="flex items-center justify-between border border-gray-200 p-4 rounded-xl shadow-md">
                                <CartItems item={item} />
                            </div>
                        ))}
                    <h3 className="text-sm sm:text-lg font-semibold text-center sm:text-left w-full sm:w-auto">Total: ₹ {(total * 85).toLocaleString()}</h3>
                </div>

            </div>
        </>
    )
}

export default Cart