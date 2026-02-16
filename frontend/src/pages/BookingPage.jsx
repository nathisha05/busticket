import Navbar from "../components/Navbar";
import BusList from "../components/BusList";

function BookingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginTop: "0" }}>Available Buses</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
          Select a bus and proceed to seat selection
        </p>
        <BusList />
      </div>
    </div>
  );
}

export default BookingPage;
