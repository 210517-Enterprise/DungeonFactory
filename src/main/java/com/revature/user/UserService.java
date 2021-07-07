package com.revature.user;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.revature.exceptions.UserNotFoundException;

@Service
public class UserService {
	
	private UserRepository userRepo;
	
	@Autowired
	public UserService(UserRepository repo) {
		this.userRepo = repo;
	}
	
	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public User insert(User newUser) {
		
		return userRepo.save(newUser);
		
	}

	public User findByUsername(String username) {
		return userRepo.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException("No user found with username " + username));
	}
	
	public User findById(int id) {
		return userRepo.findById(id)
				.orElseThrow(() -> new UserNotFoundException("No user found with id " + id));
	}
	
	public List<User> findAll() {
		return userRepo.findAll();
						
	}
	
	public User validateCredentials(String username, String password) {
		Optional<User> loggedInUser = userRepo.findByUsername(username);
		if(loggedInUser.isPresent() && loggedInUser.get().getPassword().equals(password)) {
			return loggedInUser.get();
		} else {
			throw new UserNotFoundException("No user found with username: " + username + " passoword: " + password);
		}
	}

}
