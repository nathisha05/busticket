function Ticket({ bookingData }) {
  // Use the passed booking data directly
  const ticketData = bookingData || {};

  return (
    <div className="ticket" style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ color: "#27ae60", fontSize: "1.5em", marginBottom: "8px" }}>✓ Order Successful!</h2>
      <p style={{ color: "#22c55e", fontSize: "1em", marginBottom: "15px" }}>Your ticket has been booked successfully</p>

      <div style={{ marginTop: "15px", textAlign: "left", background: "rgba(0,0,0,0.1)", padding: "12px", borderRadius: "4px", fontSize: "0.9em" }}>
        <p style={{ margin: "4px 0" }}><strong>Ticket ID:</strong> {ticketData.id || "N/A"}</p>
        <p style={{ margin: "4px 0" }}><strong>Passenger:</strong> {ticketData.name || "N/A"}</p>
        <p style={{ margin: "4px 0" }}><strong>Phone:</strong> {ticketData.phone || "N/A"}</p>
        <p style={{ margin: "4px 0" }}><strong>Bus:</strong> {ticketData.bus || "N/A"}</p>
        <p style={{ margin: "4px 0" }}><strong>Seat:</strong> {ticketData.seat || "N/A"}</p>
        <p style={{ margin: "4px 0" }}><strong>Price:</strong> ₹{ticketData.price || "N/A"}</p>
        {ticketData.journeyDate && (
          <p style={{ margin: "4px 0" }}><strong>Travel Date:</strong> {ticketData.journeyDate}</p>
        )}
        {ticketData.bookingDate && <p style={{ margin: "4px 0" }}><strong>Booked On:</strong> {ticketData.bookingDate}</p>}
      </div>

      <p style={{ marginTop: "15px", fontSize: "0.85em" }}>
        Check your booking history for all tickets
      </p>
    </div>
  );
}

export default Ticket;
