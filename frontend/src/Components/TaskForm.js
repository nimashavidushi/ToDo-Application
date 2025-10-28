import React, { useEffect, useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import api from "../api";

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
        await api.put(`/tasks/${editTask.id}`, { ...values, completed: editTask.completed });
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
    <Card title={editTask ? "Edit Task" : "Add New Task"} bordered={false} style={{ borderRadius: 10, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
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
        style={{
          marginTop: 15,
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
        onClick={onViewCompleted}
      >
        View Completed Tasks
      </Button>
    </div>
    
  );
}

export default TaskForm;
