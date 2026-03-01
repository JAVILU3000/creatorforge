"use client";

import { useState } from "react";

export default function Page() {
  const [niche, setNiche] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateIdeas = async () => {
    if (!niche) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ niche }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      setResult("Error generando ideas.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Generador de Ideas Virales</h1>

      <input
        type="text"
        placeholder="Ej: Finanzas para jóvenes"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={generateIdeas}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generando..." : "Generar Ideas"}
      </button>

      {result && (
        <div style={{ marginTop: "30px", whiteSpace: "pre-wrap" }}>
          {result}
        </div>
      )}
    </div>
  );
}