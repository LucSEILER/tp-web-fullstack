import React, { useState } from "react";
import Input from "../../components/atoms/Input";
import Button from "../atoms/Button";
import api from "../../helpers/request";
import { Link } from "react-router-dom";
import Card from "../../components/molecules/Card";

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
          const token = responseData.token;
          localStorage.setItem("idToken", token);
          window.location.href = "/";
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card title="Login">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

        <p className="text-sm textPrimary flex gap-2">
          Don't have an account ?
          <Link to="/register" className="underline text-sm textLink">
            Register
          </Link>
        </p>

        <Button
          label="Login"
          onClick={handleLogin}
          backgroundColor="buttonPrimary"
          size="xl"
        />
      </form>
    </Card>
  );
};

export default LoginForm;
