package com.revature.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="users")
@Data @NoArgsConstructor @AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="u_id", nullable =false, unique=true, updatable = false)
	private int id;
	
	@Length(min=1)
	@Pattern(regexp="[a-zA-Z][a-zA-Z0-9]*")
	private String username;
	
	@NotEmpty
	private String password;
	
//	@OneToMany(mappedBy="owner")
//private List<Character> characters;
	
	
	
}
