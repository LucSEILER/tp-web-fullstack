import React, { useState } from "react";
import Input from "./atoms/Input";
import { Button } from "@chakra-ui/react";
import api from "../helpers/request";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      api
        .post("http://localhost:4000/users/auth/login", {
          email,
          password,
        })
        .then((response) => {
          const responseData = response.data.data;
          console.log("Response data: ", responseData);
          const token = responseData.token;
          const user = responseData.user;
          console.log("Login successfull, user: ", user);
          localStorage.setItem("idToken", token);
          window.location.href = "/";
        }).catch((error) => {
          setError(error.response.data.message);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("http://localhost:4000/users");
      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    }
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
      <Button colorPalette="orange" color="red" onClick={handleLogin} size="xl">
        test
      </Button>
      <Button colorPalette="purple" onClick={fetchUsers} size="xl">
        users
      </Button>
    </form>
  );
};

export default LoginForm;
