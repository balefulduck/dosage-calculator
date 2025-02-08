"use client";
import { useState } from "react";
import { PiPipetteFill } from "react-icons/pi"; // Import pipette icon

const OilCalculator = ({ onChange }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [showNumberPicker, setShowNumberPicker] = useState(false);

  const boxValues = [5, 10, 20, 40];
  const numberOptions = Array.from({ length: 20 }, (_, i) => i + 1); // Creates [1, 2, ..., 20]

  // Handle number selection
  const handleNumberSelect = (num) => {
    setSelectedNumber(num);
    setShowNumberPicker(false); // Close popup
    onChange(num, selectedValue); // Send updated values to parent
  };

  // Handle box selection
  const handleBoxClick = (value) => {
    setSelectedValue(value);
    onChange(selectedNumber, value); // Send updated values to parent
  };

  return (
    <div className="top-selector">
      {/* Pipette Icon (Tap to Open Number Picker) */}
      <div className="icon-container" onClick={() => setShowNumberPicker(true)}>
        <PiPipetteFill size={36} color="#21875B" />
        <span className="selected-number">{selectedNumber || "?"}</span>
      </div>

      {/* Number Picker Popup */}
      {showNumberPicker && (
        <div className="number-picker-overlay" onClick={() => setShowNumberPicker(false)}>
          <div className="number-picker">
            {numberOptions.map((num) => (
              <div key={num} className="number-box" onClick={() => handleNumberSelect(num)}>
                {num}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selectable Boxes */}
      <div className="box-container">
        {boxValues.map((value) => (
          <div
            key={value}
            className={`box ${selectedValue === value ? "selected" : ""}`}
            onClick={() => handleBoxClick(value)}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .top-selector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
          position: relative;
        }

        .icon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        .selected-number {
          font-size: 1.2rem;
          margin-top: 5px;
          color: #21875B;
          font-weight: bold;
        }

        .box-container {
          display: flex;
          gap: 10px;
        }

        .box {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #21875B;
          border-radius: 5px;
          font-size: 1.2rem;
          cursor: pointer;
          background-color: #f0f0f0;
        }

        .box.selected {
          background-color: #21875B;
          color: white;
        }

        /* Number Picker Overlay */
        .number-picker-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .number-picker {
          background: white;
          padding: 20px;
          border-radius: 10px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .number-box {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #21875B;
          color: white;
          font-size: 1.2rem;
          border-radius: 5px;
          cursor: pointer;
        }

        .number-box:hover {
          background: #186d45;
        }
      `}</style>
    </div>
  );
};

export default OilCalculator;
