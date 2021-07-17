package com.revature.character;

import java.util.Set;

import javax.servlet.http.HttpSession;

import com.revature.user.User;

import com.revature.user.errors.ForbiddenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class defines the character controller. Responsible creating, updating, reading and deleting a character with HTTP requests.
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@CrossOrigin(allowCredentials="true", origins="http://localhost:3000")
@RestController
@RequestMapping("/character")
public class CharacterController {

	private final CharacterService charService;
	
	/**
	 * Constructor that injects the character service
	 * @param service
	 */
	@Autowired
	public CharacterController(CharacterService service) {
		this.charService = service;
	}
	
	/**
	 * Method that uses a get request to return a list of characters.
	 * @param session - session of user
	 * @return set of characters 
	 */
    @GetMapping
	public ResponseEntity<Set<Character>> list(HttpSession session){
        User user = (User) session.getAttribute("user");

        if (user == null) {
            throw new ForbiddenException();
        }

        return ResponseEntity.ok(charService.findByOwner(user));
	}
	
    /**
     * Method uses a post request to create a character.
     * @param character
     * @param session of user
     * @return created character
     */
	@PostMapping
	public ResponseEntity<Character> create(@RequestBody Character character, HttpSession session){
        User user = (User) session.getAttribute("user");

        if (user == null) {
            throw new ForbiddenException();
        }

        character.setOwner(user);

		return ResponseEntity.ok(charService.insert(character));
	}
	
	/**
	 * Method uses a get request to return a character by character id. 
	 * @param character id
	 * @return character
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Character> findByCharacterId(@PathVariable("id") int id) {
		return ResponseEntity.ok(charService.findByCharacterId(id));
	}
	
	/**
	 * Method uses a put request to update a character.
	 * @param character to update
	 * @param session of user
	 * @return updated character
	 */
	@PutMapping
	public ResponseEntity<Character> update(@RequestBody Character c, HttpSession session) {
        User user = (User) session.getAttribute("user");

        if (user == null) {
            throw new ForbiddenException();
        }

        Character character = charService.findByCharacterId(c.getId());
        if (character.getOwner().getId() != user.getId()) {
            throw new ForbiddenException();
        }

        c.setOwner(user);
		return ResponseEntity.ok(charService.update(c));
	}
	
	/**
	 * Method uses a delete request to delete a character.
	 * @param id - character id
	 * @param session - session of user
	 */
	@DeleteMapping("/{id}")
    public void deleteCharacter(@PathVariable("id") int id, HttpSession session) {
	    User user = (User) session.getAttribute("user");

	    if (user == null) {
            throw new ForbiddenException();
        }

	    Character character = charService.findByCharacterId(id);
	    if (character.getOwner().getId() != user.getId()) {
	        throw new ForbiddenException();
        }

        charService.delete(id);
	}
}
