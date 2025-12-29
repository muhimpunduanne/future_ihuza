import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "@untitledui/icons";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
    }, []);

    if (products.length === 0) {
        return (
            <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg font-medium">No products found</p>
            </div>
        );
    }

    return (
        <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">All Products</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white rounded-md shadow cursor-pointer hover:bg-gray-50"
                        onClick={() => navigate(`/dashboard/products/${index}`)}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="h-5 w-5 text-indigo-600" />
                            <h2 className="text-lg font-medium">{product.title}</h2>
                        </div>
                        <p className="text-sm text-gray-500">{product.type}</p>
                        <span
                            className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full ${product.statusColor}`}
                        >
                            {product.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
