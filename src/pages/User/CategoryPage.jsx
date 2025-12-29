import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag01 } from "@untitledui/icons";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        setCategories(storedCategories);
    }, []);

    if (categories.length === 0) {
        return (
            <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg font-medium">No Category found</p>
            </div>
        );
    }

    return (
        <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">All Categories</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white rounded-md shadow cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => navigate(`/categories/${index}`)}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Tag01 className="h-5 w-5 text-indigo-600" />
                            <h2 className="text-lg font-medium">{category.name}</h2>
                        </div>
                        <p className="text-sm text-gray-500">{category.description || "No description available"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
