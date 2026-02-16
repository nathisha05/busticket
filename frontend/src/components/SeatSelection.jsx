import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SeatSelection({ bus }) {
  const navigate = useNavigate();
  // Handle both API data (totalSeats, busType) and default data (seats, type)
  const totalSeats = bus.totalSeats || bus.seats;
  const busType = bus.busType || bus.type;
  const TOTAL_SEATS = totalSeats;
  const SEATS_PER_ROW = busType === 'sleeper' || busType === 'Sleeper' ? 2 : 6;
  const bookedSeatNumbers = [3, 7, 10, 14, 21, 25, 31, 37, 42, 45];
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
 
  const createSeatRows = () => {
    const rows = [];
    if (busType === 'sleeper' || busType === 'Sleeper') {
      for (let i = 0; i < TOTAL_SEATS; i += 2) {
        rows.push([i + 1, i + 2]);
      }
    } else {
      for (let i = 0; i < TOTAL_SEATS; i += SEATS_PER_ROW) {
        rows.push(Array.from({ length: SEATS_PER_ROW }, (_, j) => i + j + 1));
      }
    }
    return rows;
  };

  const seatRows = createSeatRows();

  const handleSeatClick = (seatNumber) => {
    setSelectedSeat(seatNumber);
    setShowConfirm(true);
  };

  const handleConfirmSeat = () => {
    navigate("/passenger-details", { state: { bus, seat: selectedSeat } });
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedSeat(null);
  };

  return (
    <div className="seat-container" style={{ marginTop: "-20px" }}>
      <h3 style={{ margin: "0 0 20px 0" }}>Select Your Seat</h3>

      {/* Legend */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "25px",
        fontSize: "0.85em",
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>
        <div>
          <span style={{ display: "inline-block", width: "16px", height: "16px", background: "white", border: "1px solid #ddd", marginRight: "6px" }}></span>
          Available
        </div>
        <div>
          <span style={{ display: "inline-block", width: "16px", height: "16px", background: "#27ae60", marginRight: "6px" }}></span>
          Selected
        </div>
        <div>
          <span style={{ display: "inline-block", width: "16px", height: "16px", background: "#ecf0f1", border: "1px solid #ddd", marginRight: "6px" }}></span>
          Booked
        </div>
      </div>

      {/* Seats Grid */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "25px",
        maxWidth: "400px",
        margin: "0 auto 25px"
      }}>
        {seatRows.map((row, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: `repeat(${SEATS_PER_ROW}, 1fr)`,
            gap: "8px"
          }}>
            {row.map((seatNumber) => {
              const isBooked = bookedSeatNumbers.includes(seatNumber);
              const isSelected = selectedSeat === seatNumber;
              return (
                <button
                  key={seatNumber}
                  onClick={() => !isBooked && handleSeatClick(seatNumber)}
                  className={`seat ${isSelected ? "selected" : ""} ${isBooked ? "booked" : ""}`}
                  style={{
                    padding: "10px 6px",
                    minHeight: "36px"
                  }}
                  disabled={isBooked}
                >
                  {seatNumber}{busType === 'sleeper' || busType === 'Sleeper' ? (seatNumber % 2 === 1 ? 'L' : 'U') : ''}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "1000"
        }}>
          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "6px",
            textAlign: "center",
            maxWidth: "300px"
          }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#2c3e50" }}>Confirm Seat Selection</h3>
            <p style={{ margin: "10px 0", color: "#555" }}>
              You selected Seat <strong>#{selectedSeat}{busType === 'sleeper' || busType === 'Sleeper' ? (selectedSeat % 2 === 1 ? ' (Lower)' : ' (Upper)') : ''}</strong>
            </p>
            <p style={{ margin: "15px 0", fontSize: "0.9em", color: "#666" }}>
              Price: <strong>₹{bus.price}</strong>
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={handleCancel}
                style={{
                  flex: "1",
                  padding: "10px",
                  background: "#95a5a6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSeat}
                style={{
                  flex: "1",
                  padding: "10px",
                  background: "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeatSelection;
