package com.revature.character;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/character")
public class CharacterController {

	private CharacterService charService;
	
	@Autowired
	public CharacterController(CharacterService service) {
		this.charService = service;
	}
	
	//find by character id mapping
	@GetMapping("/{id}")
	public ResponseEntity<Character> findByCharacterId(@PathVariable("id") int id) {
		return ResponseEntity.ok(charService.findByCharacterId(id));
	}
	
	//find all mapping
	@GetMapping
	public ResponseEntity<List<Character>> findAll() {
		return ResponseEntity.ok(charService.findAll());
	}
	
	//insert character post mapping
	@PostMapping
	public ResponseEntity<Character> insert(@RequestBody Character c) {
		return ResponseEntity.ok(charService.insert(c));
	}
	
	//update character
	@PutMapping
	public ResponseEntity<Character> update(@RequestBody Character c) {
		return ResponseEntity.ok(charService.update(c));
	}
	
	//delete character 
	@DeleteMapping("/{id}")
	public void deleteCharacter(@PathVariable("id") int id) {
		charService.delete(id);
	}
}
