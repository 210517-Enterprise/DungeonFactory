package com.revature.character;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.user.User;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer>{
	
	public Optional<Character> findById(int id);

	public Set<Character> findByOwner(User owner);

}
