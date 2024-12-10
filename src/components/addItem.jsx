import React from "react";
import { useState } from "react";

export default function AddItem({ formData, setFormData }) {
  const [inputs, setInputs] = useState([]);

  // Function to add a new input field
  const addInput = () => {
    setInputs([...inputs, ""]); // Adds an empty string to represent a new input
  };

  // Function to handle changes in input fields
  const handleInputChange = (index, event) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = event.target.value;
    setInputs(updatedInputs);
  };

  // Function to remove an input field
  const removeInput = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index); // Removes input at the given index
    setInputs(updatedInputs);
    setFormData({ ...formData, menuItems: inputs });
  };

  function saveItems(event) {
    event.preventDefault();
    setFormData({ ...formData, menuItems: inputs });
  }

  return (
    <div>
      <button type="button" onClick={addInput}>
        Add Item
      </button>
      <div>
        {inputs.map((input, index) => (
          <div key={index}>
            <input
              type="text"
              value={input}
              onChange={(event) => handleInputChange(index, event)}
              placeholder={`Input ${index + 1}`}
              style={{ marginRight: "8px" }}
            />
            <button type="button" onClick={() => removeInput(index)}>
              X
            </button>
          </div>
        ))}

        <button type="button" onClick={saveItems}>
          Save Items!
        </button>
      </div>
    </div>
  );
}
