import { Bell, Moon, Settings, User, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

function Header() {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            className={`h-20 border-b p-4 fixed top-0 left-64 right-0 z-10 ${
                theme === "light"
                    ? "bg-white border-gray-200 text-black"
                    : "bg-gray-900 border-gray-700 text-white"
            }`}
        >
            <div className="h-full flex items-center justify-between px-6">
                <div className="py-4">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <p className={`text-md ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                        Welcome Back, {user?.name || "User"}
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    {/* Theme toggle button */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full cursor-pointer ${
                            theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-700"
                        }`}
                    >
                        {theme === "light" ? (
                            <Moon className="text-gray-400 w-5 h-5" />
                        ) : (
                            <Sun className="text-yellow-400 w-5 h-5" />
                        )}
                    </button>

                    {/* Other buttons */}
                    <button
                        className={`p-2 rounded-full cursor-pointer ${
                            theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-700"
                        }`}
                    >
                        <Settings className={theme === "light" ? "text-gray-400 w-5 h-5" : "text-gray-300 w-5 h-5"} />
                    </button>

                    <button
                        className={`p-2 rounded-full relative cursor-pointer ${
                            theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700"
                        }`}
                    >
                        <Bell className={theme === "light" ? "text-gray-400 w-5 h-5" : "text-gray-300 w-5 h-5"} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="flex items-center gap-2">
            <span className={theme === "light" ? "text-black text-sm" : "text-white text-sm"}>
              {user?.email || "user@example.com"}
            </span>
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                            <User className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
