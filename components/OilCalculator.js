"use client";
import { useState } from "react";

const OilCalculator = ({ onChange }) => {
  const [inputValue, setInputValue] = useState(1);
  const [selectedValue, setSelectedValue] = useState(null);

  const boxValues = [5, 10, 20, 40];

  // Handle number input
  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 1) value = 1;
    if (value > 99) value = 99;
    setInputValue(value);
    onChange(value, selectedValue); // Send updated values to parent
  };

  // Handle box selection
  const handleBoxClick = (value) => {
    setSelectedValue(value);
    onChange(inputValue, value); // Send updated values to parent
  };

  return (
    <div className="top-selector">
      {/* Number Input */}
      <input
        type="number"
        value={inputValue}
        min="1"
        max="99"
        onChange={handleInputChange}
        className="number-input"
      />

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

      <style jsx>{`
        .top-selector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .number-input {
          width: 50px;
          height: 40px;
          text-align: center;
          font-size: 1.5rem;
          border: 2px solid #21875B;
          border-radius: 5px;
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
      `}</style>
    </div>
  );
};

export default OilCalculator;
