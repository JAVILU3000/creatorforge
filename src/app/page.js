"use client";
import { useState } from "react";

export default function Page() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateIdeas() {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST"
    });

    const data = await res.json();
    setResult(data.idea);
    setLoading(false);
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>CreatorForge</h1>

      <button
        onClick={generateIdeas}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Generar idea viral
      </button>

      {loading && <p>Generando...</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <b>Idea:</b>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}