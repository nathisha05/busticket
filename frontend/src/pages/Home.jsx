import Navbar from "../components/Navbar";
import SearchBus from "../components/SearchBus";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e6f7ff 0%, #ffffff 100%)" }}>
      <Navbar />
      
      {/* Welcome message without card */}
      <div style={{ 
        textAlign: "center", 
        padding: "40px 20px 20px",
        margin: "0 auto"
      }}>
        <h1 style={{ 
          fontSize: "3em", 
          color: "#1e90ff",
          marginBottom: "15px",
          fontWeight: "800"
        }}>
          Welcome, {user?.name}! 👋
        </h1>
        <p style={{ 
          color: "#555", 
          fontSize: "1.3em",
          marginBottom: "10px"
        }}>
          Book your favorite bus and travel with comfort
        </p>
        <p style={{ 
          color: "#777", 
          fontSize: "1em",
          fontStyle: "italic"
        }}>
          🚌 Fast • Safe • Comfortable
        </p>
      </div>
      
      {/* Search component */}
      <SearchBus />
      
    </div>
  );
}

export default Home;
