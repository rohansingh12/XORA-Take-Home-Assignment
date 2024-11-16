import React, { useState } from "react";
import "./MyForm.css"; // Import the CSS file

export default function MyForm() {
  const [rows, setRows] = useState([
    { item: "", price: "", quantity: "", total: 0 },
    { item: "", price: "", quantity: "", total: 0 },
    { item: "", price: "", quantity: "", total: 0 },
    { item: "", price: "", quantity: "", total: 0 },
    { item: "", price: "", quantity: "", total: 0 },
    { item: "", price: "", quantity: "", total: 0 },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    const oldTotal = newRows[index].total;

    if (field === "price" || field === "quantity") {
      newRows[index][field] = parseFloat(value) || 0; // Update price or quantity
      newRows[index].total = newRows[index].price * newRows[index].quantity; // Recalculate total
    } else {
      newRows[index][field] = value; // Update item
    }

    const updatedGrandTotal =
      grandTotal - oldTotal + newRows[index].total; // Adjust grand total
    setRows(newRows);
    setGrandTotal(updatedGrandTotal);
  };

  const addRow = () => {
    setRows([...rows, { item: "", price: 0, quantity: 0, total: 0 }]);
  };

  return (
    <div className="form-container">
      <h2>Xora Client Order Form</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.item}
                  className="input-field"
                  placeholder="Enter item"
                  onChange={(e) => handleChange(index, "item", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.price}
                  className="input-field"
                  placeholder="Enter price"
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.quantity}
                  className="input-field"
                  placeholder="Enter quantity"
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                />
              </td>
              <td>{row.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-row-button" onClick={addRow}>
        Add Row
      </button>
      <h3 className="grand-total">Grand Total: {grandTotal.toFixed(2)}</h3>
    </div>
  );
}
