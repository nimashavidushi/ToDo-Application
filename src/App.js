import React, { useState } from "react";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";
import CompletedTasks from "./Components/CompletedTasks";
import { Row, Col, Typography, Modal } from "antd";

const { Title } = Typography;

function App() {
  const [editTask, setEditTask] = useState(null);
  const [refresh, setRefresh] = useState(false);
   const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div className="App" style={{ padding: 30, minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
        Task Manager
      </Title>

      <Row gutter={24} justify="center">
        <Col xs={24} md={10}>
          <TaskForm
            editTask={editTask}
            onTaskSaved={() => setRefresh(!refresh)}
            clearEditTask={() => setEditTask(null)}
            onViewCompleted={() => setShowCompleted(true)}
          />
        </Col>
        <Col xs={24} md={14}>
          <TaskList
            key={refresh}
            onEdit={(task) => setEditTask(task)}
          />
        </Col>
      </Row>
       <Modal
        title="Completed Tasks"
        open={showCompleted}
        footer={null}
        width={800}
        onCancel={() => setShowCompleted(false)}
      >
        <CompletedTasks />
      </Modal>
    </div>
  );
}

export default App;
