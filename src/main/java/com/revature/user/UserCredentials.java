package com.revature.user;

import com.sun.istack.NotNull;

import lombok.Data;

@Data
public class UserCredentials {
	
	@NotNull
	private String username;
	
	@NotNull
	private String password;
	
}
