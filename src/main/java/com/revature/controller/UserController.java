package com.revature.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.User;
import com.revature.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	private UserService userService;
	
	@Autowired
	public UserController(UserService service) {
		this.userService = service;
	}
	
	@GetMapping("/{username}")
	public ResponseEntity<User> findByUsername(@PathVariable("username") String username) {
		return ResponseEntity.ok(userService.findByUsername(username));
	}
	
	@PostMapping("/")
	public ResponseEntity<User> insert(@RequestBody User u) {
		return ResponseEntity.ok(userService.insert(u));
	}
	
	@GetMapping
	public ResponseEntity<List<User>> findAll() {
		return ResponseEntity.ok(userService.findAll());
	}
	
	
}
