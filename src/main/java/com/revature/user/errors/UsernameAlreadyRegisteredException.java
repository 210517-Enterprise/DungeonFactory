package com.revature.user.errors;

/**
 * Class defines username already registered exception.
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
public class UsernameAlreadyRegisteredException extends RuntimeException{

	public UsernameAlreadyRegisteredException() {
		super();
	}

	public UsernameAlreadyRegisteredException(String message, Throwable cause) {
		super(message, cause);
	}

	public UsernameAlreadyRegisteredException(String message) {
		super(message);
	}

	public UsernameAlreadyRegisteredException(Throwable cause) {
		super(cause);
	}

}
