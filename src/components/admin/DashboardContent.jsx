import {AlertTriangle, Box, CheckCircle, CheckDone01, Package, Users01, Users02, UsersUp} from "@untitledui/icons";
import { useEffect, useState } from "react";
import {useTheme} from "../../context/ThemeContext.jsx";
export default function DashboardContent() {
    const { theme } = useTheme();
    const [stats, setStats] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch products from localStorage or fallback to empty array
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);

        // Fetch users from localStorage or fallback to empty array
        const storedUsers = JSON.parse(localStorage.getItem("users_db")) || [];
        setUsers(storedUsers);

        // Compute stats dynamically based on real data
        const totalProducts = storedProducts.length;
        const assignedProducts = storedProducts.filter(p => p.assignedTo).length;

        const unassignedProducts = totalProducts - assignedProducts;
        const totalUsers = storedUsers.length;

        setStats([
            {
                title: "Total Users",
                value: totalUsers,
                icon: UsersUp,
                bg: "bg-blue-50",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
            },
            {
                title: "Total Products",
                value: totalProducts,
                icon: Package,
                bg: "bg-indigo-50",
                iconBg: "bg-indigo-100",
                iconColor: "text-indigo-600",
            },
            {
                title: "Assigned Products",
                value: assignedProducts,
                icon: CheckDone01,
                bg: "bg-green-50",
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
            },
            {
                title: "Unassigned Products",
                value: unassignedProducts,
                icon: AlertTriangle,
                bg: "bg-yellow-50",
                iconBg: "bg-yellow-100",
                iconColor: "text-yellow-600",
            },
        ]);
    }, []);



    const RecentActivities = [
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Box className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "Product added to inventory",
            description: "MacBook Pro 16” M3 (PROD2024001)",
            date: "Dec 4, 2024",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Users02 className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "Product assigned to Sarah Johnson",
            description: "Dell ThinkPad X1 Carbon (PROD2024001)",
            date: "Dec 3, 2024",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Users02 className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "Product assigned to Michael Brown",
            description: "Apple MacBook Air M2 (PROD2024001)",
            date: "Dec 2, 2024",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Box className="h-5 w-5 text-yellow-500" />
                </div>
            ),
            title: "Product sent for maintenance",
            description: "HP Spectre x360 – Screen replacement required",
            date: "Jan 16, 2024",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200/20">
                    <Users02 className="h-5 w-5 text-green-500" />
                </div>
            ),
            title: "New user registered",
            description: "Amanda White – Staff Member",
            date: "Jan 14, 2024",
        },
    ];




    const QuickActions = [
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                    <Box className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "View Users",
            description: "View all registered users",
            bg: "bg-blue-50",
            button: "bg-blue-500 hover:bg-blue-600",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                    <Box className="h-5 w-5 text-blue-500" />
                </div>
            ),
            title: "View Products",
            description: "View all registered products",
            bg: "bg-blue-50",
            button: "bg-blue-500 hover:bg-blue-600",
        },
        {
            icon: (
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                    <Users02 className="h-5 w-5 text-purple-800" />
                </div>
            ),
            title: "View Assignments",
            description: "View all product assignments",
            bg: "bg-purple-50",
            button: "bg-purple-500 hover:bg-purple-600",
        },
    ];





    return (
        <main
            className={`mt-16 ml-64 p-6 min-h-screen ${
                theme === "light"
                    ? "bg-gray-50 text-black"
                    : "bg-gray-900 text-white"
            }`}
        >

            <div className="flex flex-wrap items-center justify-center w-full mb-6">
                <div className={`m-4 w-full rounded-xl p-8 shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-700 text-white"}`}>
                    <div className="flex items-start gap-4">

                        {/* Icon */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-200/40">
                            <Box className="h-5 w-5 text-white" />
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-bold text-white">
                                IHUZA INVENTORY - System Overview
                            </h1>

                            <p className="text-sm text-gray-300 mb-2">
                                Monitor your IHUZA inventory and product assignments in real-time.
                            </p>
                            <div className="flex gap-2">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                <p className="text-sm text-white">
                                    All Systems Operational
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
                {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.title}
                            className={`rounded-2xl p-6 flex shadow-sm transition-colors ${
                                theme === "light" ? "bg-white" : "bg-gray-800"
                            }`}
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                    item.iconBg
                                }`}
                            >
                                <Icon className={`h-6 w-6 ${item.iconColor}`} />
                            </div>
                            <div className="px-2 gap-4">
                                <h1
                                    className={`text-4xl font-bold ${
                                        theme === "light" ? "text-black/80" : "text-white"
                                    }`}
                                >
                                    {item.value}
                                </h1>
                                <p
                                    className={`text-sm font-semibold ${
                                        theme === "light" ? "text-gray-500" : "text-gray-300"
                                    }`}
                                >
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>



            {/* Content Card */}
            <div className="p-4">
                <div
                    className={`rounded-md p-6 shadow-sm transition-colors ${
                        theme === "light" ? "bg-white" : "bg-gray-800"
                    }`}
                >
                    <h3
                        className={`font-semibold mb-2 ${
                            theme === "light" ? "text-black" : "text-white"
                        }`}
                    >
                        Recent Added Products
                    </h3>

                    {products.length === 0 ? (
                        <p
                            className={`text-center p-6 ${
                                theme === "light" ? "text-gray-500" : "text-gray-300"
                            }`}
                        >
                            No products found
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
                            {products.map((product, index) => (
                                <div
                                    key={index}
                                    className={`p-4 flex justify-between gap-8 rounded-md border transition-colors ${
                                        theme === "light"
                                            ? "bg-white border-gray-100"
                                            : "bg-gray-700 border-gray-600"
                                    }`}
                                >
                                    <div className="flex flex-col gap-1">
                                        <h1
                                            className={`text-md font-semibold mb-2 ${
                                                theme === "light" ? "text-black" : "text-white"
                                            }`}
                                        >
                                            {product.title}
                                        </h1>
                                        <p
                                            className={`text-sm ${
                                                theme === "light" ? "text-gray-500" : "text-gray-300"
                                            }`}
                                        >
                                            {product.type}
                                        </p>
                                        <p
                                            className={`text-sm ${
                                                theme === "light" ? "text-gray-500" : "text-gray-300"
                                            }`}
                                        >
                                            {product.date}
                                        </p>
                                    </div>
                                    <div>
              <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.statusColor ||
                      (theme === "light"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-gray-600 text-gray-200")
                  }`}
              >
                {product.status || "Unknown"}
              </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>



            {/*{ users }*/}
            <div className="p-4">
                <div className="bg-white rounded-md p-6 shadow-sm">
                    <h3 className="font-semibold mb-2 text-2xl">Users</h3>
                    {users.length === 0 ? (
                        <p className="text-center text-gray-500 p-6">No users found</p>
                    ) : (
                        <div className="p-4">
                            <div className="grid grid-cols-[250px_1fr_1fr_1fr_1fr] items-center bg-gray-100 p-4 font-medium text-gray-500">
                                <span>USER</span>
                                <span className="text-center">ROLE</span>
                                <span className="text-center">STATUS</span>
                                <span className="text-center">LAST LOGIN</span>
                                <span className="text-center">ACTIONS</span>
                            </div>
                            {users.map((user, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[250px_1fr_1fr_1fr_1fr] items-center border-b border-gray-200 p-4 hover:bg-gray-50"
                                >
                                    <div className="flex gap-4">
                                        <div className="p-2">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                                                <Users02 className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col p-2">
                                            <span className="font-medium text-gray-900">{user.name}</span>
                                            <span className="text-sm text-gray-500">{user.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center justify-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.roleColor || "bg-gray-100 text-gray-700"}`}>{user.role}</span>
                                    </div>
                                    <div className="flex gap-4 items-center justify-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.statusColor || "bg-gray-100 text-gray-700"}`}>{user.status}</span>
                                    </div>
                                    <span className="text-center text-gray-700">{user.lastLogin || "N/A"}</span>
                                    <div className="flex justify-center gap-2">
                                        <button className="text-blue-600 text-sm">Edit</button>
                                        <button className="text-red-500 text-sm">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/*{ Recent Activity and Quick Actions}*/}

            <div className="p-4">
                <div className="flex gap-4 justify-between">
                    <div className="w-1/2 rounded-md bg-white p-6 shadow-sm">
                        <div className="flex justify-between gap-4">
                            <div className="p-4">
                                <h3 className="mb-2 text-2xl font-semibold">
                                    Recent Activity
                                </h3>
                            </div>
                            <div className="p-4">
                                <a
                                    href="#"
                                    className="cursor-pointer text-gray-600 hover:text-gray-500"
                                >
                                    view all
                                </a>
                            </div>
                        </div>

                        {RecentActivities.map((activity, index) => (
                            <div
                                key={index}
                                className="flex w-full gap-4 p-4"
                            >
                                {/* Icon */}
                                <div className="shrink-0">
                                    {activity.icon}
                                </div>

                                {/* Text */}
                                <div>
                                    <h1 className="font-medium">
                                        {activity.title}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        {activity.description}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {activity.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*{ right card }*/}
                    <div className="w-1/2 rounded-md bg-white p-6 shadow-sm">
                        <h3 className="mb-6 text-2xl font-semibold">Quick Actions</h3>

                        <div className="space-y-4">
                            {QuickActions.map((quick, index) => (
                                <div
                                    key={index}
                                    className={`flex w-full items-center justify-between rounded-lg p-4 ${quick.bg}`}
                                >
                                    {/* Left: Icon + Text */}
                                    <div className="flex items-center gap-4">
                                        {quick.icon}

                                        <div>
                                            <h1 className="font-medium text-gray-900">
                                                {quick.title}
                                            </h1>
                                            <p className="text-sm text-gray-600">
                                                {quick.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Button */}
                                    <button
                                        className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${quick.button}`}
                                    >
                                        Go
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>


            </div>
        </main>
    )
}