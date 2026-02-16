import Navbar from "../components/Navbar";
import SearchBus from "../components/SearchBus";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Navbar />
      {/* Welcome message */}
      <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2.5em", color: "#2d3436", marginBottom: "10px" }}>
          Welcome, {user?.name}!
        </h1>
        <p style={{ color: "#666", fontSize: "1.1em" }}>
          Book your favorite bus and travel with comfort
        </p>
      </div>
      {/* Search component */}
      <SearchBus />
    </div>
  );
}

export default Home;
