import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const currentUser = JSON.parse(localStorage.getItem("auth_session"));
    if (!currentUser || currentUser.role !== "ADMIN") {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                Access Denied. Admin only.
            </div>
        );
    }

    const fetchCategories = () => setCategories(JSON.parse(localStorage.getItem("categories")) || []);

    useEffect(() => fetchCategories(), []);

    const addCategory = () => {
        if (!name) return;
        const newCat = { id: crypto.randomUUID(), name, description };
        const data = [...categories, newCat];
        localStorage.setItem("categories", JSON.stringify(data));
        fetchCategories();
        setName("");
        setDescription("");
    };

    const updateCategory = (id, updatedFields) => {
        const data = categories.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
        localStorage.setItem("categories", JSON.stringify(data));
        fetchCategories();
    };

    const deleteCategory = (id) => {
        const data = categories.filter((c) => c.id !== id);
        localStorage.setItem("categories", JSON.stringify(data));
        fetchCategories();
    };

    return (
        <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Categories</h1>

            {/* Add Category Form */}
            <div className="mb-8 flex flex-wrap gap-4 items-center">
                <input
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 w-64 border rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-3 w-96 border rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={addCategory}
                    className="px-6 py-3 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600 transition"
                >
                    Add Category
                </button>
            </div>

            {/* Categories Grid */}
            {categories.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-gray-500 text-lg font-medium">
                    No categories found
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((c) => (
                        <div
                            key={c.id}
                            className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{c.name}</h2>
                                <p className="text-gray-500 mt-1">{c.description || "No description"}</p>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => updateCategory(c.id, { description: "Updated description" })}
                                    className="text-green-600 text-sm font-medium hover:underline"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => deleteCategory(c.id)}
                                    className="text-red-500 text-sm font-medium hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
