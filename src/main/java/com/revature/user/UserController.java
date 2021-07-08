package com.revature.user;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/user")
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

	@PostMapping("/login")
	public User login(@RequestBody UserCredentials creds, HttpSession session) {
		User loggedInUser = userService.validateCredentials(creds.getUsername(), creds.getPassword());
		session.setAttribute("user", loggedInUser);
		return loggedInUser;
	}

	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody UserCredentials userInfo, HttpSession session) {
		User u = userService.insert(new User(userInfo.getUsername(), userInfo.getPassword()));
		session.setAttribute("user", u);
		return ResponseEntity.ok(u);
	}
	
	@GetMapping("/auth")
	public User getSessionUser(HttpSession session) {
		return (User) session.getAttribute("user");
	}
	
	@GetMapping("/logout")
	public void logoutUser(HttpSession session) {
		session.removeAttribute("user");
	}

}
