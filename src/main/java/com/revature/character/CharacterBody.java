package com.revature.character;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class CharacterBody {

	@NotNull
	private String race;
	
	
}
