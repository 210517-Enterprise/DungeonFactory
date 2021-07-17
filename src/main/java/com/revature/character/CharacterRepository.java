package com.revature.character;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.user.User;
/**
 * Interface that defines the character repository, which extends the JpaRepository.
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer>{
	
	/**
	 * Method to find a character by id.
	 * @param id of character
	 * @return character
	 */
	public Optional<Character> findById(int id);
	
	/**
	 * Method to find owner of the character
	 * @param owner - owner of character (user)
	 * @return set of characters owned by user
	 */
	public Set<Character> findByOwner(User owner);

}
