import React, { useEffect, useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import api from "../api";
import "./TaskForm.css";

function TaskForm({ editTask, onTaskSaved, clearEditTask, onViewCompleted }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      form.setFieldsValue({
        title: editTask.title,
        description: editTask.description,
      });
    } else {
      form.resetFields();
    }
  }, [editTask, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editTask) {
        await api.put(`/tasks/${editTask.id}`, {
          ...values,
          completed: editTask.completed,
        });
        message.success("Task updated successfully!");
        clearEditTask();
      } else {
        await api.post("/tasks", { ...values, completed: false });
        message.success("Task added successfully!");
      }
      form.resetFields();
      onTaskSaved();
    } catch (error) {
      message.error("Error saving task");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card
        title={editTask ? "Edit Task" : "Add New Task"}
        bordered={false}
        className="form-card"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter a task title!" }]}
          >
            <Input placeholder="Task title" autoFocus />
          </Form.Item>

          <Form.Item name="description">
            <Input.TextArea rows={4} placeholder="Description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {editTask ? "Update Task" : "Add Task"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Button
        type="default"
        block
        className="form-button"
        onClick={onViewCompleted}
      >
        View Completed Tasks
      </Button>
    </div>
  );
}

export default TaskForm;
