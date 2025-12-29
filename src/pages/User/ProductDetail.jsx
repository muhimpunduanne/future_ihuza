import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Package } from "@untitledui/icons";

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const selected = storedProducts[id];
        setProduct(selected || null);
    }, [id]);

    if (!product) {
        return (
            <div className="mt-16 ml-64 p-6">
                <p className="text-gray-500">Product not found</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => navigate("/dashboard/products")}
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => navigate("/dashboard/products")}
            >
                Back to Products
            </button>

            <div className="p-6 bg-white rounded-md shadow">
                <div className="flex items-center gap-2 mb-4">
                    <Package className="h-6 w-6 text-indigo-600" />
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                </div>
                <p className="text-gray-600 mb-2">
                    <strong>Type:</strong> {product.type}
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Date Added:</strong> {product.date}
                </p>
                <p
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${product.statusColor}`}
                >
                    {product.status}
                </p>
            </div>
        </div>
    );
}
