function Ticket() {
  const tickets = JSON.parse(localStorage.getItem("tickets"));
  const lastTicket = tickets[tickets.length - 1];

  return (
    <div className="ticket">
      <h2 style={{ color: "#27ae60", fontSize: "1.8em", marginBottom: "10px" }}>✓ Order Successful!</h2>
      <p style={{ color: "#22c55e", fontSize: "1.1em", marginBottom: "20px" }}>Your ticket has been booked successfully</p>

      <div style={{ marginTop: "20px", textAlign: "left", background: "rgba(0,0,0,0.1)", padding: "15px", borderRadius: "4px" }}>
        <p><strong>Ticket ID:</strong> {lastTicket.id}</p>
        <p><strong>Passenger:</strong> {lastTicket.name}</p>
        <p><strong>Phone:</strong> {lastTicket.phone || "N/A"}</p>
        <p><strong>Bus:</strong> {lastTicket.bus}</p>
        <p><strong>Seat:</strong> {lastTicket.seat}</p>
        <p><strong>Price:</strong> ₹{lastTicket.price}</p>
        {lastTicket.travelDate && <p><strong>Travel Date:</strong> {lastTicket.travelDate}</p>}
        {lastTicket.bookingDate && <p><strong>Booked On:</strong> {lastTicket.bookingDate}</p>}
      </div>

      <p style={{ marginTop: "20px", fontSize: "0.95em" }}>
        Check your booking history for all tickets
      </p>
    </div>
  );
}

export default Ticket;
