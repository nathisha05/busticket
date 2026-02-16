import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SeatSelection from "../components/SeatSelection";

function SeatSelectionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state?.bus;

  
  if (!bus) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <Navbar />
        <div style={{ textAlign: "center", marginTop: "50px", color: "#999" }}>
          <p>No bus selected. Please go back and select a bus.</p>
          <button
            onClick={() => navigate("/")}
            style={{ marginTop: "20px", background: "blue", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <div>
            <h2 style={{ margin: "0 0 10px 0" }}>Select Your Seat</h2>
            <p style={{ color: "#666", margin: "0" }}>
              Bus: <strong>{bus.name}</strong> | Price: <strong>₹{bus.price}</strong> | Time: <strong>{bus.time}</strong>
            </p>
          </div>
          <button
            onClick={() => navigate("/booking")}
            style={{
              background: "#e74c3c",
              padding: "10px 20px",
              fontSize: "0.95em",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Back
          </button>
        </div>
        <SeatSelection bus={bus} />
      </div>
    </div>
  );
}

export default SeatSelectionPage;
