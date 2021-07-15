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

@CrossOrigin(allowCredentials="true", origins="http://localhost:3000")
@RestController
@RequestMapping("/character")
public class CharacterController {

	private final CharacterService charService;
	
	@Autowired
	public CharacterController(CharacterService service) {
		this.charService = service;
	}

    @GetMapping
	public ResponseEntity<Set<Character>> list(HttpSession session){
        User user = (User) session.getAttribute("user");

        if (user == null) {
            throw new ForbiddenException();
        }

        return ResponseEntity.ok(charService.findByOwner(user));
	}
	
	@PostMapping
	public ResponseEntity<Character> create(@RequestBody Character character, HttpSession session){
        User user = (User) session.getAttribute("user");

        if (user == null) {
            throw new ForbiddenException();
        }

        character.setOwner(user);

		return ResponseEntity.ok(charService.insert(character));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Character> findByCharacterId(@PathVariable("id") int id) {
		return ResponseEntity.ok(charService.findByCharacterId(id));
	}
	
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
