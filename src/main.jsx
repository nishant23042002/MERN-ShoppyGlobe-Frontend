import { createRoot } from 'react-dom/client'
import './index.css'
import { lazy } from 'react'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from './components/NotFound.jsx'
import appStore from './utils/cartStore'
import { Provider } from 'react-redux'
import Login from './components/Login.jsx'

// Lazily load other route components for performance
const Cart = lazy(() => import("./components/Cart.jsx"))
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"))
const ProductList = lazy(() => import("./components/ProductList.jsx"))


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <ProductList /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
    ]
  }
]);

// provide Redux + Routing context
createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>,
  </Provider>
)
