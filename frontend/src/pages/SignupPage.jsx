import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Signup failed");
      }

      navigate("/login", {
        state: {
          message: "Account created! Please log in."
        }
      });
    } catch (error) {
      setError("Could not create account");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1020] p-10 shadow-2xl">
        <h1 className="mb-2 text-4xl font-black text-white">
          Create Account
        </h1>

        <p className="mb-8 text-gray-400">
          Sign up to start tracking your posture history.
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-[#11182d] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Create password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-[#11182d] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Confirm password"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 py-3 font-bold text-black transition hover:bg-cyan-300 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}