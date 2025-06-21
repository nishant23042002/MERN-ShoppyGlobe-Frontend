import { useEffect, useState } from "react"


// Custom hook to fetch product data from the backend API
export function useFetch() {
    // Initialize local state to store fetched products
    const [products, setProducts] = useState([]);

    // Fetch products only once when the component mounts
    useEffect(() => {
        fetch("http://localhost:3001/api/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data?.product)
            })

    }, []);

    // Return the fetched product list for the component using this hook
    return { products }
}

