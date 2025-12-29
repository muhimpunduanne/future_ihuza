import { useEffect, useState } from "react";
import { Users02 } from "@untitledui/icons";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Staff");
    const [status, setStatus] = useState("Active");

    const currentUser = JSON.parse(localStorage.getItem("auth_session"));
    if (!currentUser || currentUser.role !== "ADMIN") {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                Access Denied. Admin only.
            </div>
        );
    }

    const fetchUsers = () => {
        setUsers(JSON.parse(localStorage.getItem("users_db")) || []);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const resetForm = () => {
        setName("");
        setEmail("");
        setRole("Staff");
        setStatus("Active");
        setEditingUser(null);
    };

    const saveUser = () => {
        if (!name || !email) return;
        let data = [...users];
        if (editingUser) {
            data = data.map(u => (u.id === editingUser.id ? { ...u, name, email, role, status } : u));
        } else {
            const newUser = { id: crypto.randomUUID(), name, email, role, status };
            data.push(newUser);
        }
        localStorage.setItem("users_db", JSON.stringify(data));
        fetchUsers();
        setModalOpen(false);
        resetForm();
    };

    const deleteUser = (id) => {
        const data = users.filter(u => u.id !== id);
        localStorage.setItem("users_db", JSON.stringify(data));
        fetchUsers();
    };

    return (
        <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6 p-4">
                <h1 className="text-2xl font-bold">Users</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Add User
                </button>
            </div>

            {users.length === 0 ? (
                <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
                    No users found
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-gray-100 p-4 font-medium text-gray-500">
                        <span>Name / Email</span>
                        <span className="text-center">Role</span>
                        <span className="text-center">Status</span>
                        <span className="text-center">Actions</span>
                    </div>

                    {users.map(user => (
                        <div
                            key={user.id}
                            className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                            <div>
                                <span className="font-medium">{user.name}</span>
                                <br />
                                <span className="text-sm text-gray-500">{user.email}</span>
                            </div>

                            <div className="text-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    user.role === "Admin"
                                        ? "bg-purple-100 text-purple-700"
                                        : user.role === "Manager"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-gray-100 text-gray-700"
                                }`}>
                                    {user.role}
                                </span>
                            </div>

                            <div className="text-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    user.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}>
                                    {user.status}
                                </span>
                            </div>

                            <div className="flex justify-center gap-2">
                                <button
                                    className="text-yellow-600 text-sm"
                                    onClick={() => {
                                        setEditingUser(user);
                                        setName(user.name);
                                        setEmail(user.email);
                                        setRole(user.role);
                                        setStatus(user.status);
                                        setModalOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 text-sm"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        <h2 className="text-xl font-bold mb-4">{editingUser ? "Edit User" : "Add User"}</h2>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border border-gray-100 p-4 rounded-2xl"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-100 p-4 rounded-2xl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <select
                                className="w-full border border-gray-100 p-4 rounded-2xl"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <div className="">
                                    <option>Admin</option>
                                    <option>Manager</option>
                                    <option>Staff</option>
                                </div>

                            </select>
                            <select
                                className="w-full border border-gray-100 p-4 rounded-2xl"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => { setModalOpen(false); resetForm(); }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={saveUser}
                            >
                                {editingUser ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
