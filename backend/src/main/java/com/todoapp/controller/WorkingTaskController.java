package com.todoapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tasks")
public class WorkingTaskController {
    
    // Simple in-memory storage that persists during server runtime
    private static final Map<Long, Map<String, Object>> tasks = new ConcurrentHashMap<>();
    private static final AtomicLong nextId = new AtomicLong(1);
    
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllTasks(
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "createdAt") String sortBy) {
        
        List<Map<String, Object>> taskList = new ArrayList<>(tasks.values());
        
        // Apply filters
        if (priority != null && !priority.isEmpty()) {
            taskList = taskList.stream()
                    .filter(task -> priority.equalsIgnoreCase((String) task.get("priority")))
                    .collect(ArrayList::new, (list, item) -> list.add(item), (list1, list2) -> list1.addAll(list2));
        }
        
        if (status != null && !status.isEmpty()) {
            taskList = taskList.stream()
                    .filter(task -> status.equalsIgnoreCase((String) task.get("status")))
                    .collect(ArrayList::new, (list, item) -> list.add(item), (list1, list2) -> list1.addAll(list2));
        }
        
        // Apply sorting
        switch (sortBy.toLowerCase()) {
            case "priority":
                taskList.sort((a, b) -> {
                    String priorityA = (String) a.get("priority");
                    String priorityB = (String) b.get("priority");
                    return getPriorityOrder(priorityA) - getPriorityOrder(priorityB);
                });
                break;
            case "status":
                taskList.sort(Comparator.comparing(task -> (String) task.get("status")));
                break;
            case "deadline":
                taskList.sort((a, b) -> {
                    String deadlineA = (String) a.get("deadline");
                    String deadlineB = (String) b.get("deadline");
                    if (deadlineA == null && deadlineB == null) return 0;
                    if (deadlineA == null) return 1;
                    if (deadlineB == null) return -1;
                    return deadlineA.compareTo(deadlineB);
                });
                break;
            default:
                taskList.sort((a, b) -> {
                    String createdA = (String) a.get("createdAt");
                    String createdB = (String) b.get("createdAt");
                    return createdB.compareTo(createdA); // Newest first
                });
        }
        
        return ResponseEntity.ok(taskList);
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createTask(@RequestBody Map<String, Object> taskData) {
        Long id = nextId.getAndIncrement();
        
        Map<String, Object> task = new HashMap<>();
        task.put("id", id);
        task.put("description", taskData.get("description"));
        task.put("priority", taskData.getOrDefault("priority", "NORMAL"));
        task.put("status", taskData.getOrDefault("status", "NOT_STARTED"));
        task.put("deadline", taskData.get("deadline"));
        task.put("createdAt", LocalDateTime.now().toString());
        
        tasks.put(id, task);
        return ResponseEntity.ok(task);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateTask(@PathVariable Long id, @RequestBody Map<String, Object> taskData) {
        Map<String, Object> task = tasks.get(id);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        
        task.put("description", taskData.get("description"));
        task.put("priority", taskData.get("priority"));
        task.put("status", taskData.get("status"));
        task.put("deadline", taskData.get("deadline"));
        
        return ResponseEntity.ok(task);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTask(@PathVariable Long id) {
        if (tasks.remove(id) == null) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Task deleted successfully!");
        return ResponseEntity.ok(response);
    }
    
    private int getPriorityOrder(String priority) {
        switch (priority.toUpperCase()) {
            case "URGENT": return 1;
            case "NORMAL": return 2;
            case "LOW": return 3;
            default: return 2;
        }
    }
}