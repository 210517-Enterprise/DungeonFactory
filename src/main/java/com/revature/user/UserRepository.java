package com.revature.user;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This interface defines the user repository which extends the JpaRepository.
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@Repository 
public interface UserRepository extends JpaRepository<User, Integer> {
	
	/**
	 * Method that finds a user by user name.
	 * @param username
	 * @return user
	 */
	public Optional<User> findByUsername(String username);
	
}
