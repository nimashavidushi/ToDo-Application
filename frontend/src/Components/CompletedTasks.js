import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import api from "../api";
import "./CompletedTasks.css";

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
    <div className="completed-container">
      <h2>Completed Tasks</h2>
      <ul className="completed-list">
        {tasks.map((task) => (
          <li key={task.id} className="completed-item">
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
