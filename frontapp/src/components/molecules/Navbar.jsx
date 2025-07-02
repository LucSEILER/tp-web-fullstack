import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users/me", {
          withCredentials: true,
        });
        const { data, message } = response;

        setUsername(data.name);
        setMessage(message);
      } catch (err) {
        console.error("Failed to fetch me", err);
        // navigate("/login");
      }
    };

    fetchMe();
  }, []);

  const handleLogout = () => {
    if (localStorage.getItem("idToken")) {
      localStorage.removeItem("idToken");
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex justify-between items-center z-50">
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
      <div className="flex items-center space-x-4">
        <span>{username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
