import Navbar from "../components/Navbar";
import { useState } from "react";

function History() {
  const [tickets, setTickets] = useState(JSON.parse(localStorage.getItem("tickets")) || []);
  const hasBookings = tickets.length > 0;

  
  const deleteBooking = (id) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>Booking History</h2>

      {!hasBookings ? (
        
        <div style={{
          textAlign: "center",
          marginTop: "50px",
          color: "#999",
          fontSize: "1.1em"
        }}>
          <p>No bookings yet. Start your journey!</p>
        </div>
      ) : (
        
        <div style={{ display: "grid", gap: "15px", maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
          {tickets.map((ticket, index) => (
            <div key={ticket.id} className="history-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <p><strong>Booking #{index + 1}</strong></p>
                  <p><strong>Passenger:</strong> {ticket.name}</p>
                  <p><strong>Bus:</strong> {ticket.bus}</p>
                  <p><strong>Seat:</strong> {ticket.seat}</p>
                  {ticket.phone && <p><strong>Phone:</strong> {ticket.phone}</p>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "1.5em", color: "#667eea", fontWeight: "bold" }}>
                    ₹{ticket.price}
                  </p>
                  <p style={{ color: "#22c55e", fontSize: "0.9em", marginTop: "10px" }}>Confirmed</p>
                  <button
                    onClick={() => deleteBooking(ticket.id)}
                    style={{
                      marginTop: "10px",
                      padding: "6px 12px",
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85em"
                    }}
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
