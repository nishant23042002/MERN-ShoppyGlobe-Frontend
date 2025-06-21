import { useFetch } from "../customHook/useFetch"
import Auth from "./Auth";
import ProductItem from './ProductItem'
import { useState } from "react";
import { useOutletContext } from "react-router-dom";


function ProductList() {
    const { products } = useFetch();
    const { isOpenModal, user } = useOutletContext();
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <h1 className="m-6 font-semibold text-2xl text-gray-700">Top Rated Products</h1>
            {
                //saying that isOpenModal is shown only if thier is no user exist 
                //if their is user than the modal will not open}
            }
            {isOpenModal && !user && (
                <Auth />
            )}
            <div className="relative flex items-center justify-center w-[20%] mx-25 mt-8">
                <input className="shadow-xl p-3 pr-9 border border-gray-300 rounded-2xl outline-none" type="search" placeholder="Search products..." value={search} onChange={handleSearch} />
            </div>

            <div className="flex flex-wrap gap-15 justify-center my-10">
                {
                    filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductItem key={product._id} product={product} />
                        ))
                    ) : (
                        <p>No products found.</p>
                    )
                }
            </div>
        </>
    )
}

export default ProductList