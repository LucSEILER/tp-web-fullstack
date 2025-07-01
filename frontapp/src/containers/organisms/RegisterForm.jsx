import React, { useState } from "react";
import Input from "../../components/atoms/Input";
import Button from "../atoms/Button";
import api from "../../helpers/request";
import { Field, Input as ChakraInput } from "@chakra-ui/react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      api
        .post("http://localhost:4000/users/auth/register", {
          name: username,
          email,
          password,
        })
        .then((response) => {
          const responseData = response.data.data;
          console.log("Response data: ", responseData);
          window.location.href = "/login";
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Input
        type="text"
        label="Username"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />

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

      <ChakraInput placeholder="Enter your email" />

      <Button
        label="Register"
        onClick={handleRegister}
        backgroundColor="primary"
        size="xl"
      />
    </form>
  );
};

export default RegisterForm;
