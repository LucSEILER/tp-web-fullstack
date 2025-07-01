import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (localStorage.getItem("idToken")) {
      localStorage.removeItem("idToken");
      navigate("/login");
    }
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
