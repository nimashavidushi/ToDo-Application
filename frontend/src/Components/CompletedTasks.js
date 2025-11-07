import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import api from "../api";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data.filter((task) => task.completed));
    } catch (error) {
      message.error("Failed to load completed tasks");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Completed Tasks</h2>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {tasks.map((task) => (
          <li key={task.id} style={{ width: "80%", maxWidth: "900px" }}>
            <Card title={task.title}>
              <p>{task.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedTasks;
