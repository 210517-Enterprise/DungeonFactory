package com.revature.character;



import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.revature.user.User;

/**
 * Class defines the character service which provides the CRUD method implementations for character.
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@Service
public class CharacterService {

	private CharacterRepository charRepo;
	
	/**
	 * Constructor that injects the character repository
	 * @param repo
	 */
	@Autowired
	public CharacterService(CharacterRepository repo) {
		this.charRepo = repo;
	}
	
	/**
	 * Method to insert a character
	 * @param newCharacter
	 * @return inserted character
	 */
	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public Character insert(Character newCharacter) {
		return charRepo.save(newCharacter);
	}
	
	//find all character by a user's id
	/**
	 * Method that finds all characters by owner (user)
	 * @param owner (user)
	 * @return set of characters owned by user
	 */
	public Set<Character> findByOwner(User owner){
		return charRepo.findByOwner(owner);
	}
	
	/**
	 * Method finds a character by character id
	 * @param id of character
	 * @return character
	 */
	public Character findByCharacterId(int id) {
		return charRepo.findById(id)
				.orElseThrow(() -> new CharacterNotFoundException("No character found with specified ID: "+ id));
	}
	
	/**
	 * Method to findall characters
	 * @return list of characters
	 */
	public List<Character> findAll() {
		return charRepo.findAll();
	}
	
	/**
	 * Method to update a character
	 * @param character
	 * @return updated character
	 */
	public Character update(Character c) {
        Optional<Character> existingCharacter = charRepo.findById(c.getId());

        if (existingCharacter.isPresent()) {
            return charRepo.save(c);
        } else {
            throw new CharacterNotFoundException("No character was found!");
        }

    }
	
	/**
	 * Method to delete a character by id
	 * @param character id
	 */
	public void delete(int id) {
        Optional<Character> existingCharacter= charRepo.findById(id);
        if(existingCharacter.isPresent()) {
            charRepo.deleteById(id);
            
        } else {
            throw new CharacterNotFoundException("No user found");
        }
    }
	
}
