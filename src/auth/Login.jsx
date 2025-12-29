import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isRegister) {
                await register(form);
            }
            await login(form);

            const session = JSON.parse(localStorage.getItem("auth_session"));
            navigate(session.role === "ADMIN" ? "/admin" : "/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 w-96 space-y-4 shadow"
            >
                <h2 className="text-xl font-bold">
                    {isRegister ? "Create Account" : "Login"}
                </h2>

                {isRegister && (
                    <input
                        name="name"
                        placeholder="Full Name"
                        className="border p-2 w-full"
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    name="email"
                    placeholder="Email"
                    className="border p-2 w-full"
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full"
                    onChange={handleChange}
                    required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button className="w-full bg-black text-white p-2">
                    {isRegister ? "Register" : "Login"}
                </button>

                <button
                    type="button"
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-sm text-blue-600"
                >
                    {isRegister
                        ? "Already have an account?"
                        : "Create new account"}
                </button>

                <p className="text-xs text-gray-500">
                    Admin email: <b>admin@dashboard.com</b>
                </p>
            </form>
        </div>
    );
}
