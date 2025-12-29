import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Header from "./../components/Header.jsx";
import Sidebar from "./../components/Sidebar.jsx";

export default function AdminLayout() {
    const { isAdmin, logout, loading } = useAuth();

    if (loading) return null;
    if (!isAdmin) return <Navigate to="/unauthorized" />;

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
