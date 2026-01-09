import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';

function TaskFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFiltersChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Filters & Sorting</Card.Title>
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Filter by Priority</Form.Label>
              <Form.Select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
              >
                <option value="">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Filter by Status</Form.Label>
              <Form.Select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
                <option value="MISSED_DEADLINE">Missed Deadline</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Sort by</Form.Label>
              <Form.Select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
              >
                <option value="createdAt">Created Date</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
                <option value="deadline">Deadline</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TaskFilters;