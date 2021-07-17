package com.revature.user;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.revature.user.errors.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * User Controller Class. Provides login, registration, finds user data, insert, delete, and update with HTTP requests.
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@CrossOrigin(allowCredentials="true", origins="http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
	
	private UserService userService;

	/**
	 * Constructor that injects user service class.
	 * @param service
	 */
	@Autowired
	public UserController(UserService service) {
		this.userService = service;
	}

	/**
	 * Method uses a get request to find a user by username.
	 * @param username
	 * @return a user 
	 */
	@GetMapping("/{username}")
	public ResponseEntity<User> findByUsername(@PathVariable("username") String username) {
		return ResponseEntity.ok(userService.findByUsername(username));
	}

	/**
	 * Method uses a post request to insert a user.
	 * @param user
	 * @return new inserted user
	 */
	@PostMapping("/")
	public ResponseEntity<User> insert(@RequestBody User u) {
		return ResponseEntity.ok(userService.insert(u));
	}

	/**
	 * Method uses a get request to find all users.
	 * @return a list of users 
	 */
	@GetMapping
	public ResponseEntity<List<User>> findAll() {
		return ResponseEntity.ok(userService.findAll());
	}
	
	/**
	 * A method that uses a post request to login a user.
	 * @param creds - user credentials
	 * @param session - session associated with user
	 * @return logged in user
	 */
	@PostMapping("/login")
	public User login(@RequestBody UserCredentials creds, HttpSession session) {
		User loggedInUser = userService.validateCredentials(creds.getUsername(), creds.getPassword());
        session.setAttribute("user", loggedInUser);
		return loggedInUser;
	}
	
	/**
	 * Method uses a post request to register a user.
	 * @param userInfo - user credentials
	 * @param session - session associated with user
	 * @return - user
	 */
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody UserCredentials userInfo, HttpSession session) {
		User u = userService.insert(new User(userInfo.getUsername(), userInfo.getPassword()));
		session.setAttribute("user", u);
		return ResponseEntity.ok(u);
	}
	
	/**
	 * Method uses a get request to authenticate a user.
	 * @param session
	 * @return user
	 */
	@GetMapping("/auth")
	public User getSessionUser(HttpSession session) {
		return (User) session.getAttribute("user");
	}
	
	/**
	 * Method to logout a user.
	 * @param session 
	 */
	@GetMapping("/logout")
	public void logoutUser(HttpSession session) {
		session.removeAttribute("user");
	}
	
	/**
	 * Method uses a put request to update a user.
	 * @param u - user
	 * @param session - user session
	 * @return user 
	 */
	@PutMapping
	public ResponseEntity<User> update(@RequestBody User u, HttpSession session) {
	    User currentUser = (User) session.getAttribute("user");

	    if (currentUser == null) {
	        throw new UserNotFoundException();
        }

	    u.setId(currentUser.getId());
		return ResponseEntity.ok(userService.update(u));
	}
	
	/**
	 * A method uses a delete request that deletes a user. 
	 * @param session - user session
	 */
	@DeleteMapping
	public void deleteUser(HttpSession session) {
        User currentUser = (User) session.getAttribute("user");

        if (currentUser == null) {
            throw new UserNotFoundException();
        }

		userService.delete(currentUser.getId());
	}
}
