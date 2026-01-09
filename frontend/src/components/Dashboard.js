import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import axios from 'axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    sortBy: 'createdAt'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.status) params.append('status', filters.status);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const response = await axios.get(`/api/tasks?${params.toString()}`);
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]); // Set empty array on error
    }
    setLoading(false);
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await axios.put(`/api/tasks/${editingTask.id}`, taskData);
      } else {
        await axios.post('/api/tasks', taskData);
      }
      fetchTasks();
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>My Tasks</h1>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleNewTask}>
            Add New Task
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <TaskFilters filters={filters} onFiltersChange={setFilters} />
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col>
            <TaskForm
              task={editingTask}
              onSubmit={handleTaskSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;