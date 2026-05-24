import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link to="/" className="text-2xl font-black text-white">
          <span className="text-teal-300">Posture</span>IQ
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/" className="font-bold text-gray-300 hover:text-teal-300">
            Analyze
          </Link>

          <Link
            to="/history"
            className="font-bold text-gray-300 hover:text-teal-300"
          >
            History
          </Link>

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="ml-4 rounded-xl bg-red-500 px-5 py-2 font-bold text-white hover:bg-red-400"
            >
              Log Out
            </button>
          ) : (
            <div className="ml-4 flex items-center gap-4">
              <Link
                to="/login"
                className="rounded-xl border border-white/10 px-5 py-2 font-bold text-gray-300 hover:text-white"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="rounded-xl bg-teal-400 px-5 py-2 font-bold text-black hover:bg-teal-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}