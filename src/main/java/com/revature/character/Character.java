package com.revature.character;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.revature.user.User;

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
	
	@Column(name="class", nullable=false)
	private String characterClass;
	
	@Column(name="strength", nullable=false)
	private int strength;
	
	@Column(name="constitution", nullable=false)
	private int constitution;
	
	@Column(name="intelligence", nullable=false)
	private int intelligence;
	
	@Column(name="wisdom", nullable=false)
	private int wisdom;
	
	@Column(name="dexterity", nullable=false)
	private int dexterity;
	
	@Column(name="charisma", nullable=false)
	private int charisma;
	
	@Column(name="name", nullable=false)
	private String characterName;
	
	@Column(name="background", nullable=false)
	private String background;
	
	@Column(name="alignment", nullable=false)
	private String alignment;
	
	@Column(name="personality", nullable=false)
	private String personality;
	
	@Column(name="ideals", nullable=false)
	private String ideals;
	
	@Column(name="bonds", nullable=false)
	private String bonds;
	
	@Column(name="flaws", nullable=false)
	private String flaws;
	
	@Column(name="featAndTraits", nullable=false)
	private String featAndTraits;

	@ManyToOne
	@JoinColumn(name="user_id", nullable=false)
	private User owner;
}