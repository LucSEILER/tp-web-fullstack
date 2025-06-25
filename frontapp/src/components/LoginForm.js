import React, { useState } from "react";
import Cookies from "js-cookie";
import Button from "./atoms/Button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/users/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Login failed");
        return;
      }

      // Enregistrer le token JWT dans les cookies
      Cookies.set("idToken", result.data.token, {
        expires: 1, // 1 jour
        secure: true, // activé uniquement en HTTPS
        sameSite: "Strict", // protection CSRF
      });

      // Redirection ou autre action
      console.log("Login successful");
      window.location.href = "/dashboard"; // ou page d’accueil
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* <button type="submit">Login</button> */}
      <Button label="Login" onClick={handleLogin} />
    </form>
  );
};

export default LoginForm;
