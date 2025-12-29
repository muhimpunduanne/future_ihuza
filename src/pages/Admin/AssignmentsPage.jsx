import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function AdminAssignmentsPage() {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem("auth_session"));
    if (!currentUser || currentUser.role !== "ADMIN") {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                Access Denied. Admin only.
            </div>
        );
    }

    useEffect(() => {
        setProducts(JSON.parse(localStorage.getItem("products")) || []);
        setUsers(JSON.parse(localStorage.getItem("users_db")) || []);
    }, []);

    const assignProduct = () => {
        if (!selectedProduct || !selectedUser) return;

        // Update product assignment
        const updatedProducts = products.map((p) =>
            p.id === selectedProduct.id ? { ...p, assignedTo: selectedUser.name } : p
        );
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        // Update assignments
        const storedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
        const newAssignment = {
            productId: selectedProduct.id,
            productTitle: selectedProduct.title,
            userName: selectedUser.name,
            date: new Date().toLocaleDateString(),
            status: "Assigned",
            statusColor: "bg-green-100 text-green-700",
        };
        storedAssignments.push(newAssignment);
        localStorage.setItem("assignments", JSON.stringify(storedAssignments));

        setSelectedProduct(null);
        setSelectedUser(null);
        setIsModalOpen(false); // if using modal
    };



    const unassigned = products.filter((p) => !p.assignedTo);
    const assigned = products.filter((p) => p.assignedTo);

    const getStatusColor = (assigned) =>
        assigned ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";

    return (
        <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between p-4">
                <h1 className="text-3xl font-bold mb-6">Assignments</h1>

                {/* Button to open assignment modal */}
                {unassigned.length > 0 && users.length > 0 && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600 transition mb-8"
                    >
                        Assign a Product
                    </button>
                )}
            </div>


            {/* Modal */}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setIsModalOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/50 bg-opacity-25" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title className="text-lg font-bold">
                                            Assign Product
                                        </Dialog.Title>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Product dropdown */}
                                        <Listbox value={selectedProduct} onChange={setSelectedProduct}>
                                            <div className="relative">
                                                <Listbox.Button className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white py-3 px-4 text-left shadow-sm flex justify-between items-center hover:ring-1 hover:ring-blue-500 transition">
                                                    {selectedProduct ? selectedProduct.title : "Select Product"}
                                                    <CheckIcon className="w-5 h-5 text-gray-400" />
                                                </Listbox.Button>
                                                <Listbox.Options className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
                                                    {unassigned.map((p) => (
                                                        <Listbox.Option
                                                            key={p.id}
                                                            value={p}
                                                            className={({ active }) =>
                                                                `cursor-pointer select-none px-4 py-2 ${
                                                                    active ? "bg-blue-50" : ""
                                                                }`
                                                            }
                                                        >
                                                            {p.title}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </div>
                                        </Listbox>

                                        {/* User dropdown */}
                                        <Listbox value={selectedUser} onChange={setSelectedUser}>
                                            <div className="relative">
                                                <Listbox.Button className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white py-3 px-4 text-left shadow-sm flex justify-between items-center hover:ring-1 hover:ring-blue-500 transition">
                                                    {selectedUser ? selectedUser.name : "Select User"}
                                                    <CheckIcon className="w-5 h-5 text-gray-400" />
                                                </Listbox.Button>
                                                <Listbox.Options className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
                                                    {users.map((u) => (
                                                        <Listbox.Option
                                                            key={u.id}
                                                            value={u}
                                                            className={({ active }) =>
                                                                `cursor-pointer select-none px-4 py-2 ${
                                                                    active ? "bg-blue-50" : ""
                                                                }`
                                                            }
                                                        >
                                                            {u.name} ({u.role})
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </div>
                                        </Listbox>

                                        <button
                                            onClick={assignProduct}
                                            className="w-full px-6 py-3 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600 transition"
                                        >
                                            Assign
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Assigned Products */}
            <div className="mb-6">
                <h2 className="font-semibold text-xl mb-4">Assigned Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assigned.map((p) => (
                        <div
                            key={p.id}
                            className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">{p.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">Assigned to: {p.assignedTo}</p>
                            </div>
                            <span
                                className={`mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${getStatusColor(
                                    true
                                )}`}
                            >
  Assigned
</span>

                        </div>
                    ))}
                </div>
            </div>

            {/* Unassigned Products */}
            <div>
                <h2 className="font-semibold text-xl mb-4">Unassigned Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unassigned.map((p) => (
                        <div
                            key={p.id}
                            className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">{p.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">Not assigned</p>
                            </div>
                            <span
                                className={`mt-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    false
                                )}`}
                            >
                Unassigned
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
