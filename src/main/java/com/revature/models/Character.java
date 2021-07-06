package com.revature.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="character")
@Data @NoArgsConstructor @AllArgsConstructor
public class Character {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="c_name")
	private String name;
	
	private String description;
	
	private int level;
	
	private String race;
	
	private int strength;
	private int dexterity;
	private int constitution;
	private int intellegecne;
	private int wisdom;
	private int charisma;
	
	private List<String> equipment;
	
	@ManyToOne
	@JoinColumn(name="c_owner", nullable=false)
	private User owner;
	
	private boolean isPublic;
}
