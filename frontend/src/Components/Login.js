import React, { useState } from "react";
import { Button, Input, Card, Typography, message } from "antd";
import axios from "axios";

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
      localStorage.setItem("token", token);  // <-- ADD THIS
      onLoginSuccess(token);
      
      message.success("Login successful");
    } catch (error) {
      message.error("Invalid credentials");
    }
  };

  return (
    <Card style={{ width: 350, margin: "auto" }}>
      <Title level={4} style={{ textAlign: "center" }}>Login</Title>

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 15 }}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 15 }}
      />

      <Button type="primary" block onClick={handleLogin}>
        Login
      </Button>
    </Card>
  );
}

export default Login;
