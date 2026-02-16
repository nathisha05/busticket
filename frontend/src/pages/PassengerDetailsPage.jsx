import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookingForm from "../components/BookingForm";

function PassengerDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, seat } = location.state || {};

  
  if (!bus || !seat) {
    return (
      <div style={{ textAlign: "center", padding: "40px", background: "#f8f9fa", minHeight: "100vh" }}>
        <h2>No Bus or Seat Selected</h2>
        <button
          onClick={() => navigate("/booking")}
          style={{ marginTop: "20px", background: "#3498db", padding: "10px 20px", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Go Back to Buses
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
        {/* Back button at top */}
        <button
        onClick={() => navigate("/booking", { state: { bus } })}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          background: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "0.9em"
        }}
      >
        Back
      </button>

      <div style={{ background: "white", padding: "20px", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
        <h2 style={{ marginTop: "0", color: "#2c3e50" }}>Passenger Details</h2>
        
        {/* Show booking summary */}
        <div style={{ padding: "12px", background: "#ecf7ff", borderRadius: "4px", marginBottom: "20px", fontSize: "0.9em" }}>
          <p style={{ margin: "6px 0" }}><strong>Bus:</strong> {bus.name}</p>
          <p style={{ margin: "6px 0" }}><strong>Seat:</strong> {seat}</p>
          <p style={{ margin: "6px 0" }}><strong>Price:</strong> ₹{bus.price}</p>
        </div>
        
        {/* Booking form component */}
        <BookingForm bus={bus} seat={seat} />
      </div>
      

      </div>
    </div>
  );
}

export default PassengerDetailsPage;
