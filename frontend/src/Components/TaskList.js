import React, { useEffect, useState } from "react";
import { Card, Button, message, Space, Tooltip, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import api from "../api";
import "./TaskList.css";

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    console.log("TOKEN ===>", localStorage.getItem("token"));
    try {
      const response = await api.get("/tasks");
      setTasks(response.data.filter((task) => !task.completed));
    } catch (error) {
      message.error("Failed to load tasks");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      message.success("Task deleted!");
      fetchTasks();
    } catch (error) {
      message.error("Failed to delete task");
      console.error(error);
    }
  };

  const handleDone = async (task) => {
    try {
      await api.put(`/tasks/${task.id}`, { ...task, completed: true });
      message.success("Task marked as done!");
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (error) {
      message.error("Failed to mark task as done");
      console.error(error);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentTasks = tasks.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      {tasks.length > 0 && <h2 className="list-title">Tasks</h2>}

      <Space direction="vertical" style={{ width: "100%" }}>
        {currentTasks.map((task) => (
          <Card
            key={task.id}
            title={task.title}
            headStyle={{ borderBottom: "none" }}
            hoverable
            className="list-card"
            extra={
              <Space>
                <Tooltip title="Edit Task">
                  <Button
                    type="default"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(task)}
                  />
                </Tooltip>

                <Tooltip title="Delete Task">
                  <Button
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(task.id)}
                  />
                </Tooltip>

                <Tooltip title="Mark as Done">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CheckOutlined />}
                    onClick={() => handleDone(task)}
                  />
                </Tooltip>
              </Space>
            }
          >
            <p className="paragraph">{task.description}</p>
          </Card>
        ))}
      </Space>

      {tasks.length > pageSize && (
        <div className="pagination">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={tasks.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}

export default TaskList;
