"use client";

import { useState, useEffect } from "react";
import OilCalculator from "../components/OilCalculator";

export default function Home() {
  const [config, setConfig] = useState(null);
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const correctPassword = "drc";
  const [showEditControls, setShowEditControls] = useState(false);
  const [topValue, setTopValue] = useState({number: null, box: null});

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

      const handleKeyDown = (event) => {
  if (event.ctrlKey && event.shiftKey && event.key === "E") {
    setShowEditControls((prev) => !prev); // Toggle visibility
  }
};

window.addEventListener("keydown", handleKeyDown);
return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!config) return <div>Error loading configuration.</div>;

  const computeN = () => {
    if (selectedA != null && selectedB != null && selectedA !== 0) {
      return selectedB / (selectedA * 10);
    }
    return null;
  };

  const n = computeN();

  const handleInputChange = (group, index, field, value) => {
    const newConfig = { ...config };
    newConfig[group][index][field] = field === "value" ? Number(value) : value;
    setConfig(newConfig);
  };

  const saveConfig = async () => {
    const res = await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    if (!res.ok) {
      alert("Failed to save configuration.");
    } else {
      alert("Configuration saved successfully!");
      setEditMode(false);
    }
  };

  const handleEditModeToggle = () => {
    if (!editMode) {
      if (!isAuthorized) {
        if (passwordInput === correctPassword) {
          setIsAuthorized(true);
          setEditMode(true);
        } else {
          alert("Incorrect password.");
        }
      } else {
        setEditMode(true);
      }
    } else {
      setEditMode(false);
    }
  };

  const handleOilCalculatorChange = (number, box) => {
    setTopValue({number,box});
  }

  return (

    <div className="container">
    <OilCalculator onChange={handleOilCalculatorChange} />
    {showEditControls && (
      <div className="edit-toggle">
        {!editMode && !isAuthorized && (
          <div className="password-input">
            <input
              type="password"
              placeholder="Enter edit mode password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
        )}
        <button onClick={handleEditModeToggle}>
          {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        </button>
      </div>
    )}

      {/* Oil calcuator */}


      {/* Group A */}
      <div class="grouplabel"><label>Sortenauswahl</label></div>
      <div className="grid gridA">
        {config.groupA.map((box, index) => (
          <div
            key={`groupA-${index}`}
            className={`box ${selectedA === box.value ? "active" : ""}`}
            onClick={() => {
              if (!editMode) setSelectedA(box.value);
            }}
          >
            {editMode ? (
              <>
                <input
                  type="text"
                  value={box.title}
                  onChange={(e) =>
                    handleInputChange("groupA", index, "title", e.target.value)
                  }
                />
                <input
                  type="number"
                  value={box.value}
                  onChange={(e) =>
                    handleInputChange("groupA", index, "value", e.target.value)
                  }
                />
              </>
            ) : (
              <>
                <div className="title">{box.title}</div>
                <div className="val">{box.value}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Group B */}
      <div class="grouplabel"><label>Wunschdosierung</label></div>
      <div className="grid gridB">
        {config.groupB.map((box, index) => (
          <div
            key={`groupB-${index}`}
            className={`box ${selectedB === box.value ? "active" : ""}`}
            onClick={() => {
              if (!editMode) setSelectedB(box.value);
            }}
          >
            {editMode ? (
              <>
                <input
                  type="text"
                  value={box.title}
                  onChange={(e) =>
                    handleInputChange("groupB", index, "title", e.target.value)
                  }
                />
                <input
                  type="number"
                  value={box.value}
                  onChange={(e) =>
                    handleInputChange("groupB", index, "value", e.target.value)
                  }
                />
              </>
            ) : (
              <>
                <div className="title">{box.title}</div>
                <div className="val">{box.value}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {editMode && (
        <button onClick={saveConfig} className="save-button">
          Save Config
        </button>
      )}

      {/* Result Box - Always Visible */}
      <div className={`result ${n !== null ? "active" : ""}`}>
        {n !== null ? n.toFixed(4) : "Benötigte Dosis in Gramm"}
      </div>

      <style jsx>{`
        :root {
          --bg-color: FFE6FB;
          --text-color: black;
          --box-bg: #f0f0f0;
          --box-text: black;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg-color: #121212;
            --text-color: white;
            --box-bg: #1e1e1e
            --box-text: white;
          }
        }


        .container {
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
        }

        .edit-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .password-input input {
          padding: 5px;
          font-size: 1em;
        }

        button {
          padding: 10px;
          font-size: 1em;
        }

        .gridA {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }

        .gridB {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }

        .box {
          border: 1px solid var(--text-color);
          color: var(--box-text);
          background-color: var(--box-bg);
          padding: 10px;
          text-align: center;
          cursor: pointer;
          user-select: none;
          font-size: 1em;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .box.active {
          border: 2px solid #84ff00;
          background-color: #e0f0ff;
        }
        @media (prefers-color-scheme: dark) {
          .box.active {
            border: 2px solid #84ff00;
            background-color: #312A2D;
          }
        }


        .result {
          margin-top: 20px;
          padding: 20px;
          text-align: center;
          font-size: 2em;
          font-weight: bold;
          background-color: rgba(33, 135, 91, 0);
          border: 2px solid rgba(33, 135, 91, 0.5);
          color: rgba(0, 0, 0, 0.3);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .grouplabel {
          margin-top: 10px;
          padding: 10px;
          text-align: center;
          font-size: 1.3em;
          font-weight: bold;
          background-color: rgba(33, 135, 91, 0);
          border: 2px solid rgba(33, 135, 91, 0.5);
          color: rgba(0, 0, 0, 0.3);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        }
        .result.active {
          background-color: #21875b;
          color: white;
          border: 2px solid #21875b;
        }

        input {
          display: block;
          margin: 5px auto;
          padding: 5px;
          width: 80%;
        }

        .title {
          font-weight: bold;
        }

        .val {
          margin-top: 5px;
        }

        .save-button {
          display: block;
          margin: 20px auto;
          padding: 10px 20px;
        }
      `}</style>
    </div>
  );
}
