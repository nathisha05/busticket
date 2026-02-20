import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";

function History() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/bookings/user/${user.id}`);
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load booking history");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Delete booking from backend
  const deleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      await api.delete(`/bookings/${bookingId}`);
      // Remove from local state
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking. Please try again.");
    }
  };

  const hasBookings = bookings.length > 0;

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center", marginTop: "30px", color: "#2c3e50" }}>Booking History</h2>

      {loading ? (
        <LoadingSpinner message="Loading your bookings..." />
      ) : error ? (
        <div style={{ textAlign: "center", marginTop: "50px", color: "#e74c3c", fontSize: "1.1em" }}>
          <p>{error}</p>
        </div>
      ) : !hasBookings ? (
        <div style={{ textAlign: "center", marginTop: "50px", color: "#999", fontSize: "1.1em" }}>
          <p>No bookings yet. Start your journey!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "15px", maxWidth: "800px", margin: "0 auto", padding: "15px" }}>
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "1px solid #e0e0e0"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: "inline-block", 
                    background: "#1e90ff", 
                    color: "white", 
                    padding: "3px 10px", 
                    borderRadius: "4px", 
                    fontSize: "0.8em",
                    marginBottom: "8px"
                  }}>
                    {booking.bookingReference}
                  </div>
                  
                  <h3 style={{ margin: "6px 0", color: "#2c3e50", fontSize: "1.1em" }}>
                    {booking.bus?.from} → {booking.bus?.to}
                  </h3>
                  
                  <div style={{ color: "#555", fontSize: "0.85em", lineHeight: "1.6" }}>
                    <p style={{ margin: "3px 0" }}>
                      <strong>Bus:</strong> {booking.bus?.busNumber} ({booking.bus?.operator})
                    </p>
                    <p style={{ margin: "3px 0" }}>
                      <strong>Type:</strong> {booking.bus?.busType}
                    </p>
                    <p style={{ margin: "3px 0" }}>
                      <strong>Journey Date:</strong> {new Date(booking.journeyDate).toLocaleDateString()}
                    </p>
                    
                    {booking.passengers && booking.passengers.length > 0 && (
                      <>
                        <p style={{ margin: "3px 0" }}>
                          <strong>Passenger:</strong> {booking.passengers[0].name}
                        </p>
                        <p style={{ margin: "3px 0" }}>
                          <strong>Age:</strong> {booking.passengers[0].age} | <strong>Gender:</strong> {booking.passengers[0].gender}
                        </p>
                        <p style={{ margin: "3px 0" }}>
                          <strong>Phone:</strong> {booking.passengers[0].phone}
                        </p>
                        <p style={{ margin: "3px 0" }}>
                          <strong>Seat:</strong> {booking.passengers[0].seatNumber}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <div style={{ textAlign: "right", marginLeft: "15px" }}>
                  <p style={{ 
                    fontSize: "1.4em", 
                    color: "#1e90ff", 
                    fontWeight: "bold",
                    margin: "0 0 8px 0"
                  }}>
                    ₹{booking.totalAmount}
                  </p>
                  
                  <div style={{ 
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "0.8em",
                    fontWeight: "600",
                    marginBottom: "10px",
                    background: booking.status === 'Confirmed' ? '#d4edda' : '#f8d7da',
                    color: booking.status === 'Confirmed' ? '#155724' : '#721c24'
                  }}>
                    {booking.status}
                  </div>
                  
                  <button
                    onClick={() => deleteBooking(booking._id)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "6px 12px",
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.8em",
                      fontWeight: "600"
                    }}
                    onMouseOver={(e) => e.target.style.background = "#c0392b"}
                    onMouseOut={(e) => e.target.style.background = "#e74c3c"}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
