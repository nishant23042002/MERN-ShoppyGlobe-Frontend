import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../utils/cartSlice';
import ProductRating from "./ProductRating";
import { MdArrowBack } from "react-icons/md";
import { useSelector } from 'react-redux';
import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa6";


function ProductDetails() {
    const [product, setProduct] = useState({});
    const params = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems)
    //Retrieve token from local storage
    const token = localStorage.getItem("token");

    //Fetch product details from backend on component mount or ID change
    useEffect(() => {
        fetch(`http://localhost:3001/api/products/${params.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.product);
                setProduct(data.product)
            })
    }, [params.id])

    //Get the quantity of the current product in the cart
    const cartItemQuantity = (itemId) => {
        const found = cartItems.find(item => item._id === itemId);
        return found ? found.quantity : 0;
    }

    function handleaddItem(item) {
        dispatch(addToCart({ ...item, id: item._id }));

        fetch("http://localhost:3001/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId: item._id,
                quantity: 1
            })
        }).catch(err => console.error("Add to cart failed:", err));
    }

    //Handle removing item from cart (both Redux and backend)
    function handleRemoveItem(item) {
        const foundCartItem = cartItems.find(ci => ci._id === item._id);

        if (!foundCartItem) return;

        const currentQty = foundCartItem.quantity;
        dispatch(removeFromCart(item))

        //Decrease quantity in backend
        if (currentQty > 1) {
            fetch(`http://localhost:3001/api/cart/${item._id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ quantity: currentQty - 1 })
            }).catch(err => console.error("Update qty failed:", err));
        } else {
            //Delete item from backend
            fetch(`http://localhost:3001/api/cart/${item._id}`, {
                method: 'DELETE',
                headers: { "Authorization": `Bearer ${token}` }
            }).catch(err => console.error("Delete item failed:", err));
        }
    }


    return (
        <>
            <div className="max-w-4xl mx-auto p-4 my-10">

                <Link to="/">
                    <button className="cursor-pointer mt-2 underline hover:text-green-600 flex gap-2 font-semibold text-xl my-2">
                        <span><MdArrowBack size={"30px"} /></span>Back
                    </button>
                </Link>

                <div className="flex flex-col md:flex-row gap-6 border p-4 rounded-xl shadow-lg border-gray-300">
                    <img src={product.thumbnail} alt={product.title} className="w-full md:w-1/2 object-cover rounded-lg" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700">{product.title}</h1>
                        <p className="mt-2 text-gray-600 font-semibold">{product.description}</p>
                        <p className="underline text-blue-600 hover:text-black">Brand: {product.brand}</p>
                        <p className="mt-2 text-lg font-semibold text-green-600"><span className="text-red-700">-{product.discountPercentage}%</span>     ₹ {(product.price * 85).toLocaleString()}</p>
                        <div className="text-md flex gap-3 items-center my-2">{product.rating}<ProductRating rating={product.rating} /></div>
                        <div>
                            {
                                cartItemQuantity(product._id) === 0 ? (
                                    <button onClick={() => handleaddItem(product)} className="flex flex-col p-2 px-3 bg-yellow-500 rounded-md border hover:bg-green-600 border-gray-300 font-bold cursor-pointer hover:text-white duration-200">ADD to Cart</button>
                                ) : (
                                    <div className="flex items-center justify-between border w-30 border-gray-300 rounded-full overflow-hidden py-[6px] bg-yellow-400">
                                        <button onClick={() => handleRemoveItem(product)} className=" text-green-700 px-3 py-1 text-lg font-bold cursor-pointer"><FaMinus /></button>
                                        <span className="px-3 py-1 text-sm font-bold text-green-700">{cartItemQuantity(product._id)}</span>
                                        <button onClick={() => handleaddItem(product)} className="text-green-700 px-3 py-1 text-lg font-bold cursor-pointer"><TiPlus /></button>
                                    </div>
                                )
                            }
                        </div>
                        <p className="my-2 text-gray-700 font-semibold">{product.shippingInformation}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductDetails