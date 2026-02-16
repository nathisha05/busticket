import Ticket from "./Ticket";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";

function BookingForm({ bus, seat }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [showTicket, setShowTicket] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const { user } = useAuth();

  const handleBook = async () => {
    if (!name.trim()) {
      setError("❌ Name is required");
      return;
    }
    if (name.trim().length < 3) {
      setError("❌ Name must be at least 3 characters long");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError("❌ Name can only contain letters and spaces");
      return;
    }

    if (!phone.trim()) {
      setError("❌ Phone number is required");
      return;
    }
    if (!/^\d+$/.test(phone)) {
      setError("❌ Phone number must contain only digits");
      return;
    }
    if (phone.length < 10) {
      setError("❌ Phone number must be at least 10 digits");
      return;
    }
    if (phone.length > 15) {
      setError("❌ Phone number must not exceed 15 digits");
      return;
    }

    if (!age.trim()) {
      setError("❌ Age is required");
      return;
    }
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError("❌ Please enter a valid age (1-120)");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const bookingPayload = {
        busId: bus._id || bus.id,
        userId: user?.id,
        passengers: [{
          name: name.trim(),
          age: ageNum,
          gender: gender,
          seatNumber: seat.toString()
        }],
        journeyDate: bus.journeyDate || new Date().toISOString().split('T')[0],
        totalAmount: bus.price
      };
      
      const response = await api.post('/bookings', bookingPayload);
      
      // Store booking data for ticket display
      setBookingData({
        ...response.data,
        passengerName: name,
        passengerPhone: phone,
        passengerAge: age,
        passengerGender: gender
      });
      
      setShowTicket(true);
    } catch (err) {
      console.error("Booking error:", err);
      // Fallback to localStorage if API fails
      const newBooking = {
        id: Date.now(),
        bus: bus.name,
        busType: bus.busType || bus.type,
        price: bus.price,
        seat: seat.toString(),
        name: name.trim(),
        phone,
        age: age,
        gender: gender,
        email: user?.email,
        journeyDate: bus.journeyDate || new Date().toISOString().split('T')[0],
        bookingDate: new Date().toLocaleDateString(),
      };
      
      const allBookings = JSON.parse(localStorage.getItem("tickets")) || [];
      localStorage.setItem("tickets", JSON.stringify([...allBookings, newBooking]));
      
      setBookingData(newBooking);
      setShowTicket(true);
    } finally {
      setLoading(false);
    }
  };

  if (showTicket) {
    return <Ticket />;
  }

  return (
    <div className="form-container">
      <h3>Passenger Details</h3>

      <div style={{ textAlign: "left", marginBottom: "15px", fontSize: "0.9em" }}>
        <p style={{ margin: "6px 0", color: "#666" }}>
          <strong>Bus:</strong> {bus.name}
        </p>
        <p style={{ margin: "6px 0", color: "#666" }}>
          <strong>Seat:</strong> {seat}
        </p>
        <p style={{ margin: "6px 0", color: "#666" }}>
          <strong>Price:</strong> ₹{bus.price}
        </p>
      </div>

      {error && (
        <p style={{ color: "#e74c3c", marginBottom: "12px", fontWeight: "600", fontSize: "0.9em", padding: "8px", background: "#ffe6e6", borderRadius: "4px", borderLeft: "4px solid #e74c3c" }}>
          {error}
        </p>
      )}

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        style={{ width: "100%", marginBottom: "5px" }}
      />
      <p style={{ fontSize: "0.8em", color: "#999", marginBottom: "12px", marginTop: "0" }}>
        • Must be at least 3 characters • Letters and spaces only
      </p>

      <input
        placeholder="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          setError("");
        }}
        style={{ width: "100%", marginBottom: "5px" }}
      />
      <p style={{ fontSize: "0.8em", color: "#999", marginBottom: "12px", marginTop: "0" }}>
        • Must be 10-15 digits • Numbers only
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
        <div style={{ flex: 1 }}>
          <input
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setError("");
            }}
            style={{ width: "100%", marginBottom: "5px" }}
            min="1"
            max="120"
          />
          <p style={{ fontSize: "0.8em", color: "#999", marginBottom: "12px", marginTop: "0" }}>
            • Enter age (1-120)
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <p style={{ fontSize: "0.8em", color: "#999", marginBottom: "12px", marginTop: "0" }}>
            • Select gender
          </p>
        </div>
      </div>

      <button
        onClick={handleBook}
        disabled={loading}
        style={{ width: "100%", marginTop: "12px", background: "#3498db", opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Booking..." : "Book Ticket"}
      </button>
    </div>
  );
}

export default BookingForm;
