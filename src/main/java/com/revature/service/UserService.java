package com.revature.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.revature.exceptions.UserNotFoundException;
import com.revature.models.User;
import com.revature.repository.UserRepository;

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
				.orElseThrow(() -> new UserNotFoundException("No use found with id " + id));
	}
	
	public List<User> findAll() {
		return userRepo.findAll();
						
	}
	
	
	
	
	
	
	
	
	

}
