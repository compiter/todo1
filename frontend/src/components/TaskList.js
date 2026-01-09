import React from 'react';
import { Card, Badge, Button, Row, Col, Spinner } from 'react-bootstrap';

function TaskList({ tasks = [], loading, onEdit, onDelete }) {
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'URGENT': return 'danger';
      case 'NORMAL': return 'warning';
      case 'LOW': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'DONE': return 'success';
      case 'IN_PROGRESS': return 'primary';
      case 'NOT_STARTED': return 'secondary';
      case 'MISSED_DEADLINE': return 'danger';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleString();
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'URGENT': return 'priority-urgent';
      case 'NORMAL': return 'priority-normal';
      case 'LOW': return 'priority-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'DONE': return 'status-done';
      case 'IN_PROGRESS': return 'status-in-progress';
      case 'MISSED_DEADLINE': return 'status-missed-deadline';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <Card>
        <Card.Body className="text-center">
          <h5>No tasks found</h5>
          <p>Create your first task to get started!</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <Card 
          key={task.id} 
          className={`mb-3 task-item ${getPriorityClass(task.priority)} ${getStatusClass(task.status)}`}
        >
          <Card.Body>
            <Row>
              <Col md={8}>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg={getPriorityVariant(task.priority)} className="me-2">
                    {task.priority}
                  </Badge>
                  <Badge bg={getStatusVariant(task.status)}>
                    {task.status.replace('_', ' ')}
                  </Badge>
                </div>
                <Card.Text className={task.status === 'DONE' ? 'text-decoration-line-through' : ''}>
                  {task.description}
                </Card.Text>
                <small className="text-muted">
                  Deadline: {formatDate(task.deadline)}
                </small>
              </Col>
              <Col md={4} className="text-end">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default TaskList;