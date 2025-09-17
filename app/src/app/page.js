"use client";
import { useState, useEffect } from "react";
import axios from "axios";
// import "./styles.css"; // Make sure this path is correct

export default function Home() {
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch users (GET)
  const fetch_user = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users");
      setInfo(res.data);
    } catch (err) {
      console.error("fetch_user:", err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  // Add new name (POST)
  const addName = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await axios.post("/api/users", { name });
      setName("");
      fetch_user();
    } catch (err) {
      console.error("addName:", err?.message || err);
    }
  };

  // Start editing
  const startEdit = (id, currentName) => {
    setEditingId(id);
    setName(currentName);
  };

  // Save edited name (PUT)
  const saveEdit = async () => {
    if (!editingId || !name.trim()) return;
    setLoading(true);
    try {
      await axios.put(`/api/users/${editingId}`, { name });
      setEditingId(null);
      setName("");
      fetch_user();
    } catch (err) {
      console.error("saveEdit:", err?.response?.data || err?.message || err);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setName("");
  };

  // Delete user (DELETE)
  const deleteName = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/users/${id}`);
      if (editingId === id) cancelEdit();
      fetch_user();
    } catch (err) {
      console.error("deleteName:", err?.message || err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetch_user();
  }, []);

  return (
    <div className="page-container">
      <div className="form-container">
        <input
          placeholder=" Enter Some Text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {editingId ? (
          <>
            <button onClick={saveEdit} disabled={loading}>
              Save
            </button>
            <button onClick={cancelEdit} disabled={loading}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addName} disabled={loading}>
            Add
          </button>
        )}
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="user-list">
          {info.map((val) => (
            <div key={val._id} className="user-row">
              <span>{val.name}</span>
              <div className="actions">
                <button onClick={() => startEdit(val._id, val.name)}>Edit</button>
                <button onClick={() => deleteName(val._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
