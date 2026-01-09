package com.todoapp.repository;

import com.todoapp.entity.User;
import org.springframework.stereotype.Repository;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class UserRepository {
    
    private static final Map<Long, User> users = new ConcurrentHashMap<>();
    private static final Map<String, User> usersByUsername = new ConcurrentHashMap<>();
    private static final Map<String, User> usersByEmail = new ConcurrentHashMap<>();
    private static final AtomicLong nextId = new AtomicLong(1);
    
    public User save(User user) {
        if (user.getId() == null) {
            user.setId(nextId.getAndIncrement());
        }
        
        users.put(user.getId(), user);
        usersByUsername.put(user.getUsername(), user);
        usersByEmail.put(user.getEmail(), user);
        
        return user;
    }
    
    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(usersByUsername.get(username));
    }
    
    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(usersByEmail.get(email));
    }
    
    public boolean existsByUsername(String username) {
        return usersByUsername.containsKey(username);
    }
    
    public boolean existsByEmail(String email) {
        return usersByEmail.containsKey(email);
    }
    
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(users.get(id));
    }
}