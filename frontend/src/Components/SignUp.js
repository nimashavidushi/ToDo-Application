import React, { useState } from "react";
import { Button, Input, Card, Typography, message } from "antd";
import axios from "axios";

const { Title } = Typography;

function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        username,
        password,
      });

      message.success("Signup successful. You can now login.");
      onSignupSuccess();
    } catch (error) {
      message.error("Signup failed (username may already exist)");
    }
  };

  return (
    <Card style={{ width: 350, margin: "auto" }}>
      <Title level={4} style={{ textAlign: "center" }}>Signup</Title>

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

      <Button type="primary" block onClick={handleSignup}>
        Signup
      </Button>
    </Card>
  );
}

export default Signup;
