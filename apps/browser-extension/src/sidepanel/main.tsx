import type { Listing } from "@buyguard/core";
import { render } from "preact";

function App() {
  const handleAnalyze = () => {
    console.log("Analyze clicked!");
    // Comunicherà con il content script per ottenere i dati
  };

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h2>BuyGuard</h2>
      <p>Analyze this listing to spot potential risks.</p>
      <button
        type="button"
        onClick={handleAnalyze}
        style={{
          padding: "8px 16px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Analyze Page
      </button>
    </div>
  );
}

const root = document.getElementById("app");
if (root) {
  render(<App />, root);
}
