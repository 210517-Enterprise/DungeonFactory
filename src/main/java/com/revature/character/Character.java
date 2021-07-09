package com.revature.character;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="characters")
@Data @NoArgsConstructor @AllArgsConstructor
public class Character {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", nullable = false, unique=true, updatable=false)
	private int id;
	
	@Column(name="race", nullable=false)
	private String race;
	
	
	//TO DO add class specifics if needed
	
}