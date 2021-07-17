package com.revature.user;


import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.revature.user.errors.InvalidLoginCredentials;
import com.revature.user.errors.UserNotFoundException;
import com.revature.user.errors.UsernameAlreadyRegisteredException;

/**
 * This class defines the user service which provides the implementations to the CRUD methods.
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@Service
public class UserService {
	
	private UserRepository userRepo;
	
	/**
	 * Constructor that injects the user repository.
	 * @param repo
	 */
	@Autowired
	public UserService(UserRepository repo) {
		this.userRepo = repo;
	}
	
	/**
	 * Method that inserts a user. 
	 * @param newUser
	 * @return user
	 */
	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public User insert(User newUser) {
        String hashed = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
        newUser.setPassword(hashed);

		try {
			return userRepo.save(newUser);
		} catch(Exception e) {
			throw new UsernameAlreadyRegisteredException("Username is already registered");
		}
	}
	
	/**
	 * Method finds a user by username
	 * @param username
	 * @return user
	 */
	public User findByUsername(String username) {
		return userRepo.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException("No user found with username " + username));
	}
	
	/**
	 * Method finds a user by Id.
	 * @param id
	 * @return user
	 */
	public User findById(int id) {
		return userRepo.findById(id)
				.orElseThrow(() -> new UserNotFoundException("No user found with id " + id));
	}
	
	/**
	 * Method finds all users
	 * @return list of users
	 */
	public List<User> findAll() {
		return userRepo.findAll();
	}
	
	/**
	 * Method validates a users credentials
	 * @param username 
	 * @param password
	 * @return user
	 */
	public User validateCredentials(String username, String password) {
		Optional<User> loggedInUser = userRepo.findByUsername(username);
		if(!loggedInUser.isPresent()) {
			throw new UserNotFoundException("No user found with username: " + username);
		}

        if (!BCrypt.checkpw(password, loggedInUser.get().getPassword())) {
            throw new InvalidLoginCredentials("Invalid password");
        }

		return loggedInUser.get();
	}
	
	/**
	 * Method updates a user
	 * @param u
	 * @return user
	 */
	public User update(User u) {
		Optional<User> existingUser = userRepo.findById(u.getId());

		if (existingUser.isPresent()) {
			return userRepo.save(u);
		} else {
			throw new UserNotFoundException("No user was found!");
		}
	}
	
	/**
	 * Method deletes a user
	 * @param id
	 */
	public void delete(int id) {
		Optional<User> existingUser = userRepo.findById(id);
		if(existingUser.isPresent()) {
			userRepo.deleteById(id);
		} else {
			throw new UserNotFoundException("No user found");
		}
	}
}
