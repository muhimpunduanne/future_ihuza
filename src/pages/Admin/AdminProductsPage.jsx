import { useEffect, useState, Fragment } from "react";
import { Package } from "@untitledui/icons";
import { Listbox, Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";

const statuses = [
    { name: "In Stock", color: "bg-green-100 text-green-700" },
    { name: "Low Stock", color: "bg-yellow-100 text-yellow-700" },
    { name: "Out of Stock", color: "bg-red-100 text-red-700" },
];

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState(statuses[0]);
    const [category, setCategory] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem("auth_session"));
    if (!currentUser || currentUser.role !== "ADMIN") {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                Access Denied. Admin only.
            </div>
        );
    }

    const fetchProducts = () => setProducts(JSON.parse(localStorage.getItem("products")) || []);
    const fetchCategories = () => setCategories(JSON.parse(localStorage.getItem("categories")) || []);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setTitle(product.title);
            setType(product.type);
            setStatus(statuses.find(s => s.name === product.status));
            setCategory(categories.find(c => c.name === product.category) || null);
        } else {
            setEditingProduct(null);
            setTitle("");
            setType("");
            setStatus(statuses[0]);
            setCategory(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const saveProduct = () => {
        if (!title || !type || !category) return;

        if (editingProduct) {
            const updatedProducts = products.map(p =>
                p.id === editingProduct.id
                    ? { ...p, title, type, status: status.name, category: category.name }
                    : p
            );
            localStorage.setItem("products", JSON.stringify(updatedProducts));
        } else {
            const newProduct = {
                id: crypto.randomUUID(),
                title,
                type,
                status: status.name,
                category: category.name,
                assignedTo: null
            };
            const updatedProducts = [...products, newProduct];
            localStorage.setItem("products", JSON.stringify(updatedProducts));
        }

        fetchProducts();
        closeModal();
    };

    const deleteProduct = (id) => {
        const data = products.filter(p => p.id !== id);
        localStorage.setItem("products", JSON.stringify(data));
        fetchProducts();
    };

    return (
        <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6 p-4">
                <h1 className="text-2xl font-bold">Products</h1>
                <button
                    onClick={() => openModal()}
                    className="px-5 py-2 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600 transition"
                >
                    Add Product
                </button>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-gray-500 text-lg font-medium">
                    No products found
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map(p => {
                        const statusColor = p.status === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : p.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700";

                        return (
                            <div key={p.id} className="p-5 bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <Package className="h-6 w-6 text-indigo-600" />
                                    <h2 className="font-semibold text-lg">{p.title}</h2>
                                </div>
                                <p className="text-gray-500 mb-1">{p.type}</p>
                                <p className="text-gray-500 mb-2 text-sm font-medium">Category: {p.category}</p>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>{p.status}</span>

                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => openModal(p)}
                                        className="text-blue-600 text-sm font-medium hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(p.id)}
                                        className="text-red-500 text-sm font-medium hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-visible rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                                    <Dialog.Title className="text-xl font-medium mb-6">
                                        {editingProduct ? "Edit Product" : "Add Product"}
                                    </Dialog.Title>

                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Product Title"
                                        className="p-3 border rounded-2xl w-full mb-4 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        placeholder="Product Type"
                                        className="p-3 border rounded-2xl w-full mb-4 focus:ring-2 focus:ring-blue-500"
                                    />

                                    {/* Category Input */}
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            value={category || ""}
                                            onChange={(e) => setCategory(e.target.value)}
                                            placeholder="Category"
                                            className="w-full p-3 border rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Status Dropdown */}
                                    <Listbox value={status} onChange={setStatus}>
                                        <div className="relative w-full mb-4">
                                            <Listbox.Button className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white py-3 px-4 text-left shadow-sm flex justify-between items-center">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>{status.name}</span>
                                                <CheckIcon className="w-5 h-5 text-gray-400" />
                                            </Listbox.Button>

                                            <Listbox.Options className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-lg max-h-80 overflow-auto">
                                                {statuses.map((s) => (
                                                    <Listbox.Option
                                                        key={s.name}
                                                        value={s}
                                                        className={({ active }) =>
                                                            `cursor-pointer select-none px-4 py-2 flex justify-between items-center ${
                                                                active ? "bg-blue-50" : ""
                                                            }`
                                                        }
                                                    >
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.name}</span>
                                                        {status.name === s.name && <CheckIcon className="w-5 h-5 text-blue-500" />}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>

                                    <div className="flex justify-end gap-2">
                                        <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-2xl hover:bg-gray-400 transition">
                                            Cancel
                                        </button>
                                        <button onClick={saveProduct} className="px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition">
                                            {editingProduct ? "Update" : "Add"}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
