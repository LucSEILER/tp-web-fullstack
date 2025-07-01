import React, { useState } from "react";
import Input from "../../components/atoms/Input";
import Button from "../atoms/Button";
import api from "../../helpers/request";
import { Link } from "react-router-dom";
import Card from "../../components/molecules/Card";

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
    <Card title="Register">
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
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

        <p className="text-sm textPrimary flex gap-2">
          Already have an account ?
          <Link to="/login" className="underline text-sm textPrimary">
            Log In
          </Link>
        </p>

        <Button
          label="Register"
          onClick={handleRegister}
          backgroundColor="buttonPrimary"
          size="xl"
        />
      </form>
    </Card>
  );
};

export default RegisterForm;
