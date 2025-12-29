import { createContext, useContext, useEffect, useState } from "react";
import { hashPassword } from "./../utils/utils.js";

const AuthContext = createContext(null);

const ADMIN_EMAIL = "admin@dashboard.com";
const USERS_KEY = "users_db";
const SESSION_KEY = "auth_session";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session
    useEffect(() => {
        const session = localStorage.getItem(SESSION_KEY);
        if (session) setUser(JSON.parse(session));
        setLoading(false);
    }, []);

    // Register user
    const register = async ({ name, email, password }) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

        if (users.find((u) => u.email === email)) {
            throw new Error("User already exists");
        }

        const passwordHash = await hashPassword(password);

        const newUser = {
            id: crypto.randomUUID(),
            name,
            email,
            passwordHash,
            role: email === ADMIN_EMAIL ? "ADMIN" : "USER",
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        return newUser;
    };

    // Login
    const login = async ({ email, password }) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        const passwordHash = await hashPassword(password);

        const foundUser = users.find(
            (u) => u.email === email && u.passwordHash === passwordHash
        );

        if (!foundUser) {
            throw new Error("Invalid credentials");
        }

        const sessionUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
        };

        setUser(sessionUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
                isAdmin: user?.role === "ADMIN",
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
