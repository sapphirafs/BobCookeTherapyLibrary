import { useState } from "react";
import { ADMIN_PASSWORD } from "../../config/adminPassword";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [allowed, setAllowed] = useState(false);

  const submit = () => {
    if (password === ADMIN_PASSWORD) {
      setAllowed(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!allowed) {
    return (
      <div className="page">
        <h1>Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Admin password"
        />
        <button onClick={submit}>Login</button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Admin</h1>
      <p>
        To add new videos or podcasts, run the fetch scripts on the server.
      </p>
    </div>
  );
};

export default AdminPage;
