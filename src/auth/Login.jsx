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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-indigo-600 hover:underline"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Create new account"}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Admin email: <b>admin@dashboard.com</b>
        </p>
      </div>
    </div>
  );
}
