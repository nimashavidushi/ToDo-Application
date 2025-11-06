import React, { useState } from "react";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";
import CompletedTasks from "./Components/CompletedTasks";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import { Layout, Menu, Typography, Button } from "antd";
import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";


const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [page, setPage] = useState("add"); // "add" | "tasks" | "completed"

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: 50 }}>
        <Title level={2} style={{ textAlign: "center" }}>Welcome</Title>

        {showSignup ? (
          <>
            <Signup onSignupSuccess={() => setShowSignup(false)} />
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Button type="link" onClick={() => setShowSignup(false)}>
                Login
              </Button>
            </p>
          </>
        ) : (
          <>
            <Login onLoginSuccess={handleLoginSuccess} />
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Button type="link" onClick={() => setShowSignup(true)}>
                Signup
              </Button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" collapsible>
        <div style={{ textAlign:"center", padding:"20px 0", fontWeight:"bold" }}>
          Task Manager
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[page]}
          onClick={(e) => setPage(e.key)}
          items={[
            { key:"add", icon:<PlusCircleOutlined />, label:"Add Task" },
            { key:"tasks", icon:<UnorderedListOutlined />, label:"Task List" },
            { key:"completed", icon:<CheckCircleOutlined />, label:"Completed Tasks" },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background:"#fff", paddingLeft:20 }}>
          <Title level={3}>{page === "add" ? "Add New Task" : page === "tasks" ? "Task List" : "Completed Tasks"}</Title>
        </Header>

        <Content style={{ padding:20 }}>
          {page === "add" && <TaskForm />}
          {page === "tasks" && <TaskList />}
          {page === "completed" && <CompletedTasks />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
