import React, { useState } from "react";
import Cookies from "js-cookie";
// import Button from "./atoms/Button";
import Input from "./atoms/Input";

// import Button from "./atoms/Button";
import { Button } from "@chakra-ui/react";
import api from "../config/api";

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

      localStorage.setItem("idToken", result.data.token);

      console.log("Login successful");
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong");
    }
  };

  const fetchUsers = async () => {
    const response = await api.get("http://localhost:4000/users");
    console.log(response)
    // const data = await response.json();
    // console.log(data)
    // setUsers(data);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Input
        type="email"
        label="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        label="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* <div>
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
      </div> */}

      {/* <button type="submit">Login</button> */}
      {/* <Button label="Login" onClick={handleLogin} colorPalette={"blue"} size={"xl"}>test</Button>
       */}
      <Button colorPalette="red" onClick={handleLogin} size="xl">
        test
      </Button>
      <Button colorPalette="red" onClick={fetchUsers} size="xl">
        users
      </Button>
    </form>
  );
};

export default LoginForm;
