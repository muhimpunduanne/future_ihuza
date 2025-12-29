import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout";
import Login from "./auth/Login.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import AdminDashboard from "./pages/Admin/Dashboard.jsx";
import UserDashboard from "./pages/User/Dashboard";
import { useAuth } from "./context/AuthContext";
import ProductsPage from "./pages/User/ProductsPage.jsx";
import ProductDetail from "./pages/User/ProductDetail.jsx";
import CategoriesPage from "./pages/User/CategoryPage.jsx";
import AssignmentsPage from "./pages/User/AssignmentPage.jsx";
import AdminProductsPage from "./pages/Admin/AdminProductsPage.jsx";
import UsersPage from "./pages/Admin/UsersPage.jsx";
import AdminAssignmentsPage from "./pages/Admin/AssignmentsPage.jsx";
import AdminCategoriesPage from "./pages/Admin/CategoriesPage.jsx";

export default function App() {
    const { isAuthenticated, isAdmin } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            isAdmin ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="products" element={<AdminProductsPage />} />
                    <Route path="assignments" element={<AdminAssignmentsPage />} />
                    <Route path="categories" element={<AdminCategoriesPage />} />
                </Route>

                {/* User Routes */}
                <Route path="/dashboard" element={<UserLayout />}>
                    <Route index element={<UserDashboard />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="assignments" element={<AssignmentsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
