package com.revature.user;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.revature.user.errors.InvalidLoginCredentials;
import com.revature.user.errors.UserNotFoundException;
import com.revature.user.errors.UsernameAlreadyRegisteredException;

@Service
public class UserService {
	
	private UserRepository userRepo;
	
	@Autowired
	public UserService(UserRepository repo) {
		this.userRepo = repo;
	}
	
	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public User insert(User newUser) {
		
		try {
			return userRepo.save(newUser);
		} catch(Exception e) {
			throw new UsernameAlreadyRegisteredException("Username is already registered");
		}
		
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
		if(!loggedInUser.isPresent()) {
			throw new UserNotFoundException("No user found with username: " + username);
		}
		if(!loggedInUser.get().getPassword().equals(password)) {
			throw new InvalidLoginCredentials("Invalid password");
		}
		
		return loggedInUser.get();
	}
	
	public User update(User u) {
		Optional<User> existingUser = userRepo.findById(u.getId());

		if (existingUser.isPresent()) {
			return userRepo.save(u);
		} else {
			throw new UserNotFoundException("No user was found!");
		}

	}
	
	public void delete(int id) {
		Optional<User> existingUser = userRepo.findById(id);
		if(existingUser.isPresent()) {
			userRepo.deleteById(id);
		} else {
			throw new UserNotFoundException("No user found");
		}
	}

}
