import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Header from "./../components/Header.jsx";
import Sidebar from "./../components/Sidebar.jsx";

export default function UserLayout() {
    const { isAuthenticated, isAdmin, logout, loading } = useAuth();

    if (loading) return null;
    if (!isAuthenticated || isAdmin) return <Navigate to="/login" />;

    return (
        <div className="min-h-screen">
            <Header />
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
