// Simple loading spinner component
function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      minHeight: "200px"
    }}>
      {/* Spinner */}
      <div style={{
        width: "50px",
        height: "50px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #667eea",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }}></div>
      
      {/* Loading message */}
      <p style={{
        marginTop: "20px",
        color: "#666",
        fontSize: "1.1em",
        fontWeight: "500"
      }}>
        {message}
      </p>
      
      {/* Add spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;
