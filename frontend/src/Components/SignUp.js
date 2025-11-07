import React, { useState } from "react";
import { Button, Input, Card, Typography, message } from "antd";
import axios from "axios";
import "./SignUp.css";

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
    <Card className="signup-card">
      <Title className="signup-title">Signup</Title>

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="signup-input-styles"
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="signup-input-styles"
      />

      <Button type="primary" block onClick={handleSignup}>
        Signup
      </Button>
    </Card>
  );
}

export default Signup;
