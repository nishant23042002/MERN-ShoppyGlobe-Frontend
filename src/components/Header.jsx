import { Link } from "react-router-dom"
import { FaCartShopping } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

function Header({ openModal, user, onLogout }) {
    // Get cart items from Redux store
    const cartItems = useSelector(state => state.cart.cartItems)
    // Calculate total quantity of items in cart
    const totalItem = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
    // Get token to check if user is logged in
    const token = localStorage.getItem("token")

    return (
        <>
            <div className="flex justify-between p-4 gap-9 shadow-xl bg-gray-200  text-xs xs:text-sm sm:text-xl">
                <div className="flex gap-8 justify-center items-center">
                    <div className="flex justify-center items-center gap-3 text-gray-700 font-bold">{!token ? "" : "Welcome to"} {" "}
                        <h1 className="text-3xl font-bold">
                            <span className="text-red-500">S</span>
                            <span className="text-orange-500">h</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-green-500">p</span>
                            <span className="text-blue-500">p</span>
                            <span className="text-indigo-500">y</span>
                            <span className="text-purple-500">G</span>
                            <span className="text-pink-500">l</span>
                            <span className="text-rose-500">o</span>
                            <span className="text-teal-500">b</span>
                            <span className="text-emerald-500">e</span>
                        </h1>
                    </div>

                </div>
                <div className="flex gap-8">
                    <div className="flex items-center justify-center gap-2 font-bold text-gray-700 hover:text-gray-500 hover:underline duration-250">
                        <span><IoHome size={"18px"} /></span>
                        <Link to="/">Home</Link>
                    </div>
                    <div onClick={openModal} className="flex items-center justify-center gap-2 cursor-pointer font-bold text-gray-700 hover:text-gray-500 hover:underline duration-250">
                        <FaUserCircle size={"19px"} />
                        {user ? <span>Welcome,{user.name.toUpperCase()}</span> : "Login"}
                    </div>
                    <div className="flex items-center justify-center gap-2 font-bold text-gray-700 hover:text-gray-500 hover:underline duration-250">
                        <span><FaCartShopping size={"18px"} /></span>
                        <Link to="cart">Cart {totalItem}</Link>
                    </div>
                    <div className="flex items-center justify-center gap-2 font-bold text-gray-700 hover:text-gray-500 hover:underline duration-250">
                        <div onClick={onLogout} className="cursor-pointer">
                            {
                                !token ? "" : (
                                    <span className="flex justify-center items-center gap-2"><PiSignOutBold size={"18px"} />Sign Out</span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header