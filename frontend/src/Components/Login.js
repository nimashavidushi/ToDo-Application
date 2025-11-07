import React, { useState } from "react";
import { Button, Input, Card, Typography, message } from "antd";
import axios from "axios";
import "./Login.css";

const { Title } = Typography;

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      onLoginSuccess(token);

      message.success("Login successful");
    } catch (error) {
      message.error("Invalid credentials");
    }
  };

  return (
    <Card className="Card-style">
      <Title level={4} className="Title-Style ">
        Login
      </Title>

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="Input"
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="Input"
      />

      <Button type="primary" block onClick={handleLogin}>
        Login
      </Button>
    </Card>
  );
}

export default Login;
