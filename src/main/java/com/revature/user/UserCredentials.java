package com.revature.user;

import com.sun.istack.NotNull;

import lombok.Data;

/**
 * Class provides user credentials
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@Data
public class UserCredentials {
	
	@NotNull
	private String username;
	
	@NotNull
	private String password;
	
}
