import React, { useEffect, useState } from "react";
import { getHelloMessage } from "../api/hello";

function App() {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await getHelloMessage();
        setMessage(response.message);
      } catch (err) {
        setError("Failed to fetch message from API");
      }
    };

    void fetchMessage();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        gap: "1rem",
      }}
    >
      <h1>Hello World!</h1>
      {message ? <p>Message from API: {message}</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
    </div>
  );
}

export default App;
