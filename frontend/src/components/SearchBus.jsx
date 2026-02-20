import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function SearchBus() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const cities = ["Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Jaipur"];

  const handleSearch = async () => {
    if (!from || !to || !date) {
      setError("Please fill all fields");
      return;
    }
    if (from === to) {
      setError("From and To cities must be different");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Make API call to search buses
      const response = await api.get('/buses', {
        params: { from, to, date }
      });
      
      // Navigate to booking page with search params and buses data
      navigate("/booking", {
        state: { from, to, date, buses: response.data }
      });
    } catch (err) {
      console.error("Error searching buses:", err);
      // Still navigate even if API fails - will show empty list
      navigate("/booking", {
        state: { from, to, date, buses: [] }
      });
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = () => setError("");
  return (
    <div className="search-container">
      <h3>Find Your Bus</h3>

      {error && (
        <p style={{ color: "#e74c3c", marginBottom: "15px", fontWeight: "600", fontSize: "0.9em" }}>
          {error}
        </p>
      )}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center", marginBottom: "15px" }}>
        <div style={{ flex: "1", minWidth: "160px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#2c3e50", fontSize: "0.9em" }}>
            From
          </label>
          <select
            value={from}
            onChange={(e) => { setFrom(e.target.value); handleInputChange(); }}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "0.95em",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit"
            }}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: "1", minWidth: "160px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#2c3e50", fontSize: "0.9em" }}>
            To
          </label>
          <select
            value={to}
            onChange={(e) => { setTo(e.target.value); handleInputChange(); }}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "0.95em",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit"
            }}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: "1", minWidth: "160px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#2c3e50", fontSize: "0.9em" }}>
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); handleInputChange(); }}
            min={new Date().toISOString().split('T')[0]}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "0.95em",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit"
            }}
          />
        </div>
      </div>
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          width: "100%",
          maxWidth: "300px",
          display: "block",
          margin: "15px auto 0",
          background: loading ? "#ccc" : "#1e90ff",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Searching..." : "Search Buses"}
      </button>
    </div>
  );
}
export default SearchBus;
