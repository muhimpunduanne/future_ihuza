import {
    BarChartSquare02,
    Box,
    CheckDone01,
    LogOut01,
    Package,
    Tag01,
    Users01,
} from "@untitledui/icons";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Define full admin menu
    const adminMenuItems = [
        { name: "Dashboard", count: null, icon: BarChartSquare02, path: "/admin" },
        { name: "Users", count: 116, icon: Users01, path: "/admin/users" },
        { name: "Products", count: 100, icon: Package, path: "/admin/products" },
        { name: "Assignments", count: 10, icon: CheckDone01, path: "/admin/assignments" },
        { name: "Categories", count: null, icon: Tag01, path: "/admin/categories" },
    ];

    // Define user menu (only Products, Categories, Assignments)
    const userMenuItems = [
        { name: "Dashboard", count: null, icon: BarChartSquare02, path: "/dashboard" },
        { name: "Products", count: 100, icon: Package, path: "/dashboard/products" },
        { name: "Categories", count: null, icon: Tag01, path: "/dashboard/categories" },
        { name: "Assignments", count: 10, icon: CheckDone01, path: "/dashboard/assignments" },
    ];


    // Choose menu based on role
    const menuItems = user?.role === "ADMIN" ? adminMenuItems : userMenuItems;

    return (
        <aside className="fixed inset-y-0 left-0 z-20 w-64 border-r border-gray-200 bg-white">
            <div className="flex h-full flex-col p-4">

                {/* Logo */}
                <div className="mb-8 mt-2 flex items-center gap-4 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-md">
                        <Box className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-black">iHUZA</h1>
                        <p className="text-xs text-gray-500">INVENTORY</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`group flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left transition-colors ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="h-5 w-5 shrink-0 group-hover:text-blue-600" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </div>

                                {item.count !== null && (
                                    <span className="text-xs text-gray-400">{item.count}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Logout */}
                <button
                    onClick={() => {

                        localStorage.removeItem("user");
                        logout();
                    }}
                    className="mt-auto flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-colors hover:bg-gray-50 cursor-pointer"
                >
                    <span className="text-lg"><LogOut01 /></span>
                    <span className="text-sm font-medium">Logout</span>
                </button>

            </div>
        </aside>
    );
}

export default Sidebar;
