import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { Suspense, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadCartFromServer } from './utils/cartSlice.js'


function App() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  // Local state to track currently logged-in user
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  // Functions to open and close login/register modal
  const openModal = () => setIsOpenModal(true)
  const closeModal = () => setIsOpenModal(false)


  // Effect runs once on mount: checks login status, fetches cart, and sets modal
  useEffect(() => {
    // Load user from localStorage if present
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch user's cart items from server and load into Redux
    async function fetchCart() {

      const token = localStorage.getItem("token");


      // Show login modal automatically after 15 seconds if user is not logged in
      if (!token) {
        setTimeout(() => {
          setIsOpenModal(true);
        }, 15000)
      } else {
        setIsOpenModal(false)
      }


      try {
        let url = !token ? "" : "http://localhost:3001/api/cart"

        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // Transform backend cart data to shape expected by Redux
        const transformed = data.map(item => ({
          ...item.productId,
          quantity: item.quantity
        }));
        // Load the transformed cart data into Redux store
        dispatch(loadCartFromServer(transformed));
      } catch {
        if(!token){
          console.log("Please Login");
        }else{
          console.log("You are Logged In")
        }
      }
    }

    fetchCart();
  }, [dispatch]);

  // Logout function: clears localStorage and resets user state
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      {/* Passes user and modal controls */}
      <Header openModal={openModal} user={user} onLogout={handleLogout} />
      <Suspense fallback={<p>Loading.....</p>}>
        {/* Pass modal controls and user context to nested routes */}
        <Outlet context={{ isOpenModal, closeModal, openModal, setUser, user }} />
      </Suspense>
    </>

  )
}

export default App
