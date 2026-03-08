//import React, { useState } from "react";
import { ADMIN_PASSWORD } from "../config/adminPassword";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) setLoggedIn(true);
    else alert("Wrong password!");
  };

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:4000/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Error updating videos/podcasts");
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p className="mb-4">Click the button below to update videos and podcasts:</p>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Videos/Podcasts"}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default AdminPage;
