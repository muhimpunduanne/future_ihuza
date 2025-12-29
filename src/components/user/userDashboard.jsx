import { useEffect, useState } from "react";
import { AlertTriangle, Box, CheckDone01, Package } from "@untitledui/icons";

function UserDashboardContent() {
    const [products, setProducts] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        // Fetch products from localStorage
        const storedProducts = JSON.parse(localStorage.getItem("products"));
        setProducts(storedProducts || []);

        // Fetch recent activities from localStorage
        const storedActivities = JSON.parse(localStorage.getItem("recentActivities"));
        setRecentActivities(storedActivities || []);
    }, []);

    const stats = [
        {
            title: "Total Products",
            value: products.length,
            icon: Package,
            bg: "bg-indigo-50",
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
        },
        {
            title: "Assigned Products",
            value: products.filter(p => p.assignedTo).length,
            icon: CheckDone01,
            bg: "bg-green-50",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            title: "Unassigned Products",
            value: products.filter(p => !p.assignedTo).length,
            icon: Package,
            bg: "bg-yellow-50",
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
        }
]

    const QuickActions = [
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
                    <CheckDone01 className="h-5 w-5 text-green-600" />
                </div>
            ),
            title: "View Assignments",
            description: "View all product assignments",
            bg: "bg-green-50",
            button: "bg-green-500 hover:bg-green-600",
        },
    ];

    return (
        <main className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">
            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-6 p-4 md:grid-cols-3">
                {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.title}
                            className="rounded-2xl bg-white p-6 shadow-sm flex"
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
                                <Icon className={`h-6 w-6 ${item.iconColor}`} />
                            </div>
                            <div className=" px-2 gap-4">
                                <h1 className="text-4xl font-bold text-black/80">{item.value}</h1>
                                <p className="text-sm font-semibold text-gray-500">{item.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Products */}
            <div className="p-4">
                <div className="bg-white rounded-md p-6 shadow-sm">
                    <h3 className="font-semibold mb-2">Recent Added Products</h3>
                    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
                        {products.length === 0 ? (
                            <p className="text-gray-500 col-span-full text-center">No data found</p>
                        ) : (
                            products.map((product, index) => (
                                <div
                                    key={index}
                                    className="p-4 flex justify-between gap-8 border border-gray-100 rounded-md"
                                >
                                    <div className="fitems-start gap-4">
                                        <h1 className="text-md text-black font-semibold mb-2">{product.title}</h1>
                                        <p className="text-sm text-gray-500 mb-1">{product.type}</p>
                                        <p className="text-sm text-gray-500">{product.date}</p>
                                    </div>
                                    <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.statusColor || "bg-gray-100 text-gray-700"}`}>
                      {product.status || "No status"}
                    </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="p-4">
                <div className="flex gap-4">
                    {/* Recent Activity */}
                    <div className="w-full md:w-1/2 rounded-md bg-white p-6 shadow-sm">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-gray-500 text-center align-middle">Recent Activity</h3>
                            <span className="text-gray-600 hover:text-gray-500 text-sm cursor-pointer">View all</span>
                        </div>
                        {recentActivities.length === 0 ? (
                            <p className="text-gray-500 text-center align-middle">No data found</p>
                        ) : (
                            recentActivities.map((activity, index) => (
                                <div key={index} className="flex w-full gap-4 p-4">
                                    <div className="shrink-0">{activity.icon}</div>
                                    <div>
                                        <h1 className="font-medium">{activity.title}</h1>
                                        <p className="text-sm text-gray-500">{activity.description}</p>
                                        <p className="text-sm text-gray-400">{activity.date}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="w-full md:w-1/2 rounded-md bg-white p-6 shadow-sm">
                        <h3 className="mb-6 text-2xl font-semibold">Quick Actions</h3>
                        <div className="space-y-4">
                            {QuickActions.map((quick, index) => (
                                <div
                                    key={index}
                                    className={`flex w-full items-center justify-between rounded-lg p-4 ${quick.bg}`}
                                >
                                    <div className="flex items-center gap-4">
                                        {quick.icon}
                                        <div>
                                            <h1 className="font-medium text-gray-900">{quick.title}</h1>
                                            <p className="text-sm text-gray-600">{quick.description}</p>
                                        </div>
                                    </div>
                                    <button className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${quick.button}`}>
                                        Go
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UserDashboardContent;
