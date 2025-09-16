"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // GET
  const fetch_user = async () => {
    try {
      const res = await axios.get("/api/users");
      setInfo(res.data);
    } catch (err) {
      console.error("fetch_user:", err?.message || err);
    }
  };

  // POST
  const addName = async () => {
    if (!name.trim()) return;
    try {
      await axios.post("/api/users", { name });
      setName("");
      fetch_user();
    } catch (err) {
      console.error("addName:", err?.message || err);
    }
  };

  // Start Editing (prefill input)
  const startEdit = (id, currentName) => {
    setEditingId(id);
    setName(currentName);
  };

  // Save edited name
  const saveEdit = async () => {
    if (!editingId) return;
    if (!name.trim()) return;
    try {
      await axios.put(`/api/users/${editingId}`, { name });
      setEditingId(null);
      setName("");
      fetch_user();
    } catch (err) {
      console.error("saveEdit:", err?.response?.data || err?.message || err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
  };

  // DELETE
  const deleteName = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      if (editingId === id) cancelEdit();
      fetch_user();
    } catch (err) {
      console.error("deleteName:", err?.message || err);
    }
  };

  useEffect(() => {
    fetch_user();
  }, []);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder=" Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {editingId ? (
          <>
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={addName}>Add</button>
        )}
      </div>
      <div>
        {info.map((val) => (
          <div key={val._id} style={{ marginBottom: 6 }}>
            <span style={{ marginRight: 8 } }>{val.name}</span>
            <button onClick={() => startEdit(val._id, val.name)}>Edit</button>
            <button onClick={() => deleteName(val._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
