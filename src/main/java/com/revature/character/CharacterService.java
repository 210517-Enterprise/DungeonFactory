package com.revature.character;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CharacterService {

	private CharacterRepository charRepo;
	
	@Autowired
	public CharacterService(CharacterRepository repo) {
		this.charRepo = repo;
	}
	
	//inserting a new character
	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public Character insert(Character newCharacter) {
		return charRepo.save(newCharacter);
	}
	
	//find by id
	public Character findByCharacterId(int id) {
		return charRepo.findByCharacterId(id)
				.orElseThrow(() -> new CharacterNotFoundException("No character found with specified ID: "+ id));
	}
	
	//find all
	public List<Character> findAll() {
		return charRepo.findAll();
	}
	
	//update character
	
	public Character update(Character c) {
        Optional<Character> existingCharacter = charRepo.findById(c.getId());

        if (existingCharacter.isPresent()) {
            return charRepo.save(c);
        } else {
            throw new CharacterNotFoundException("No character was found!");
        }

    }
	
	//delete character
	public void delete(int id) {
        Optional<Character> existingCharacter= charRepo.findById(id);
        if(existingCharacter.isPresent()) {
            charRepo.deleteById(id);
            
        } else {
            throw new CharacterNotFoundException("No user found");
        }
    }
	
}