import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SeatSelection from "./SeatSelection";
import api from "../api";

function BusList() {
  const location = useLocation();
  const [filterType, setFilterType] = useState('all');
  const [selectedBus, setSelectedBus] = useState(null);
  const [hoveredBus, setHoveredBus] = useState(null);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.bus) {
      setSelectedBus(location.state.bus);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchBuses = async () => {
      // Check if we have buses passed from SearchBus
      if (location.state?.buses && location.state.buses.length > 0) {
        setBuses(location.state.buses);
        setLoading(false);
        return;
      }

      // Otherwise, fetch all buses from API
      try {
        setLoading(true);
        const response = await api.get('/buses');
        console.log('API Response:', response.data); // Debug log
        setBuses(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching buses:", err);
        setError("Failed to load buses. Please try again.");
        setBuses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [location.state]);

  // Default mock data as fallback if no buses and no error
  const defaultBuses = [
    { id: 1, name: "Express Plus", price: 450, time: "6:00 AM", duration: "12h", seats: 42, type: "seater" },
    { id: 2, name: "Super Comfort", price: 650, time: "8:30 AM", duration: "12h", seats: 38, type: "seater" },
    { id: 3, name: "AC Sleeper", price: 800, time: "10:00 AM", duration: "11.5h", seats: 20, type: "sleeper" },
    { id: 4, name: "Deluxe Club", price: 550, time: "1:00 PM", duration: "12h 30m", seats: 40, type: "seater" },
    { id: 5, name: "Premium Travel", price: 900, time: "3:30 PM", duration: "11h", seats: 20, type: "sleeper" },
    { id: 6, name: "City Express", price: 500, time: "5:45 PM", duration: "12.5h", seats: 45, type: "seater" },
    { id: 7, name: "Night Runner", price: 400, time: "9:00 PM", duration: "13h", seats: 48, type: "seater" },
  ];

  // Use API data if available, otherwise use default
  const displayBuses = buses.length > 0 ? buses : defaultBuses;

  // Helper function to normalize bus type for filtering
  // API returns: 'AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'
  // We map them to: 'seater' (for AC, Non-AC, Semi-Sleeper) and 'sleeper' (for Sleeper)
  const normalizeBusType = (busType) => {
    if (!busType) return 'unknown';
    const lowerType = busType.toLowerCase();
    if (lowerType === 'sleeper') return 'sleeper';
    return 'seater'; // AC, Non-AC, Semi-Sleeper all map to seater
  };

  const filteredBuses = displayBuses.filter(bus => {
    const busType = bus.type || bus.busType || 'unknown';
    const normalizedType = normalizeBusType(busType);
    return filterType === 'all' || normalizedType === filterType.toLowerCase();
  });

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
  };

  const handleBackToList = () => {
    setSelectedBus(null);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  if (selectedBus) {
    return (
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleBackToList}
          style={{
            padding: "10px 15px",
            background: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          ← Back to Bus List
        </button>
        <SeatSelection bus={selectedBus} />
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: "40px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px", padding: "20px" }}>
        <p style={{ color: "#e74c3c", fontWeight: "bold" }}>Note: Sleeper buses have limited availability.</p>
        <label htmlFor="filter" style={{ marginRight: "10px", fontWeight: "bold" }}>Filter by Type:</label>
        <select id="filter" value={filterType} onChange={handleFilterChange} style={{ padding: "5px", borderRadius: "4px" }}>
          <option value="all">All</option>
          <option value="seater">Seater</option>
          <option value="sleeper">Sleeper</option>
        </select>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {filteredBuses.map((bus) => (
          <div
            key={bus.id || bus._id}
            className="bus-card"
            onMouseEnter={() => setHoveredBus(bus.id || bus._id)}
            onMouseLeave={() => setHoveredBus(null)}
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: hoveredBus === (bus.id || bus._id) ? "#f8f9fa" : "white",
              boxShadow: hoveredBus === (bus.id || bus._id) ? "0 4px 12px rgba(0,0,0,0.15)" : "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
          >
            <h3 style={{ marginBottom: "12px", color: "#3498db" }}>{bus.name || bus.operator || 'Unknown Bus'}</h3>
            <p style={{ margin: "8px 0", fontWeight: "bold", color: "#e74c3c" }}>{bus.busType || bus.type || 'Unknown Type'}</p>
            <p style={{ margin: "8px 0" }}>Time: {bus.time || new Date(bus.departureTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            <p style={{ margin: "8px 0" }}>Duration: {bus.duration || 'N/A'}</p>
            <p style={{ margin: "8px 0" }}>Seats: {bus.seats || bus.availableSeats || 'N/A'}</p>
            <p style={{ margin: "12px 0", fontSize: "1.1em", fontWeight: "bold", color: "#3498db" }}>
              ₹{bus.price}
            </p>
            <button
              onClick={() => handleSelectBus(bus)}
              style={{
                width: "100%",
                marginTop: "12px",
                background: "#3498db",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.background = "#2980b9"}
              onMouseLeave={(e) => e.target.style.background = "#3498db"}
            >
              Select Bus →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusList;
