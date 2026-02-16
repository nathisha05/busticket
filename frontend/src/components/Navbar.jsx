import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>BusHub</h1>
      </div>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/history" className="nav-link">History</Link>
      </div>

      <div className="nav-user">
        {user && (
          <>
            <span className="user-info">{user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
