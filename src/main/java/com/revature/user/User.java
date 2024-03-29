package com.revature.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class defines a user class that can be mapped to database table called Users.
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@Entity
@Table(name="users")
@Data @NoArgsConstructor @AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", nullable =false, unique=true, updatable = false)
	private int id;
	
	@Length(min=2)
	@Pattern(regexp="[a-zA-Z][a-zA-Z0-9]*")
	@Column(name="username", nullable=false, unique=true)
	private String username;
	
	@NotEmpty
    @JsonIgnore
	private String password;
	
	public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
}
