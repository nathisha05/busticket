import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookingForm from "../components/BookingForm";

function PassengerDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, seat } = location.state || {};

  
  if (!bus || !seat) {
    return (
      <div style={{ textAlign: "center", padding: "40px", background: "linear-gradient(135deg, #e6f7ff 0%, #ffffff 100%)", minHeight: "100vh" }}>
        <Navbar />
        <h2 style={{ color: "#1e90ff", marginTop: "60px" }}>No Bus or Seat Selected</h2>
        <button
          onClick={() => navigate("/booking")}
          style={{ marginTop: "20px", background: "#1e90ff", padding: "12px 24px", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", boxShadow: "0 2px 8px rgba(30, 144, 255, 0.3)" }}
        >
          Go Back to Buses
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e6f7ff 0%, #ffffff 100%)" }}>
      <Navbar />
      <div className="container" style={{ maxWidth: "500px", margin: "0 auto", padding: "15px" }}>
        {/* Back button centered */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <button
            onClick={() => navigate("/booking", { state: { bus } })}
            style={{
              padding: "10px 24px",
              background: "#1e90ff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.95em",
              fontWeight: "600",
              boxShadow: "0 2px 8px rgba(30, 144, 255, 0.3)"
            }}
          >
            ← Back to Bus Selection
          </button>
        </div>

        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "15px" }}>
          <h2 style={{ marginTop: "0", color: "#1e90ff", textAlign: "center", fontSize: "1.5em", marginBottom: "15px" }}>Passenger Details</h2>
          
          {/* Show booking summary */}
          <div style={{ padding: "12px", background: "#e6f7ff", borderRadius: "6px", marginBottom: "15px", border: "1px solid #b3e0ff" }}>
            <h3 style={{ margin: "0 0 8px 0", color: "#1e90ff", fontSize: "1em" }}>Booking Summary</h3>
            <div style={{ display: "grid", gap: "6px" }}>
              <p style={{ margin: "0", color: "#555", fontSize: "0.9em" }}><strong>Bus:</strong> {bus.name}</p>
              <p style={{ margin: "0", color: "#555", fontSize: "0.9em" }}><strong>Seat Number:</strong> {seat}</p>
              <p style={{ margin: "0", color: "#555", fontSize: "0.9em" }}><strong>Fare:</strong> <span style={{ color: "#1e90ff", fontWeight: "bold" }}>₹{bus.price}</span></p>
            </div>
          </div>
          
          {/* Booking form component */}
          <BookingForm bus={bus} seat={seat} />
        </div>
      </div>
    </div>
  );
}

export default PassengerDetailsPage;
