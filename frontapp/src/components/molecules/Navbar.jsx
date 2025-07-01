import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:4000/users/auth/logout", {
        withCredentials: true,
      })
      .then(() => {
        // localStorage.removeItem("idToken");
        navigate("/login");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="text-xl font-bold text-blue-400 hover:text-blue-300"
        >
          🎮 Steam Gameradar
        </Link>
        <Link to="/" className="hover:text-blue-300">
          Home
        </Link>
        <Link to="/wishlist" className="hover:text-blue-300">
          My Wishlist
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
