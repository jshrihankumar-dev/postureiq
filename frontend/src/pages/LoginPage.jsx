import { useState } from "react";
import {
  useNavigate,
  useLocation
} from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.message;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Login failed"
        );
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/");
    } catch (error) {
      setError("Invalid credentials");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1020] p-10 shadow-2xl">
        <h1 className="mb-2 text-4xl font-black text-white">
          Welcome Back
        </h1>

        <p className="mb-8 text-gray-400">
          Login to continue using PostureIQ
        </p>

        {successMessage && (
          <p className="mb-5 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300">
            {successMessage}
          </p>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              className="w-full rounded-xl border border-white/10 bg-[#11182d] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              className="w-full rounded-xl border border-white/10 bg-[#11182d] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-sm font-bold text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 py-3 font-black text-black transition hover:bg-cyan-300 disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}