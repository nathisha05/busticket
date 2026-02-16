import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import PassengerDetailsPage from "./pages/PassengerDetailsPage";
import History from "./pages/History";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
      <Route path="/seat-selection" element={<ProtectedRoute><SeatSelectionPage /></ProtectedRoute>} />
      <Route path="/passenger-details" element={<ProtectedRoute><PassengerDetailsPage /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
